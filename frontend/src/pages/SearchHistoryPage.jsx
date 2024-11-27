import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { TMDB_IMG_SMALL } from "../utils/constants";
import { Trash } from "lucide-react";

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  function formatDateToDDMMYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/search/history/${id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== id));
    } catch (error) {
      toast.error("Failed to delete search item");
    }
  };

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get("/api/v1/search/history");
        setSearchHistory(res.data);
      } catch (error) {
        setSearchHistory([]);
      }
    };

    getSearchHistory();
  }, []);

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen ">
        <div className="max-w-7xl mx-auto text-white">
          <Navbar />
          <p className=" text-xl font-bold  text-center ">Search History</p>
          <p className="text-center capitalize"> no search history found </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <p className=" text-xl font-bold text-white text-center ">
          Search History
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10 ">
          {searchHistory?.length > 0 &&
            searchHistory.map((searchHistoryItem) => (
              <div
                key={searchHistoryItem?.id}
                className="rounded-lg flex justify-between gap-4 bg-slate-800 p-2  items-start"
              >
                <img
                  src={TMDB_IMG_SMALL + searchHistoryItem?.image}
                  alt="History-image"
                  className="w-14 h-14 object-cover rounded-full"
                />

                <div className="flex flex-col gap-1">
                  {" "}
                  <p className="text-white text-sm">
                    {searchHistoryItem?.title}
                  </p>
                  <p className=" text-xs text-slate-500">
                    {formatDateToDDMMYY(searchHistoryItem?.createdAt)}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-lg text-white text-xs  ${
                    searchHistoryItem?.searchType === "movie"
                      ? "bg-green-700"
                      : searchHistoryItem?.searchType === "tv"
                      ? "bg-red-700"
                      : "bg-blue-700"
                  } `}
                >
                  {searchHistoryItem?.searchType.slice(0, 1).toUpperCase() +
                    searchHistoryItem?.searchType.slice(1)}
                </span>
                <button onClick={() => handleDelete(searchHistoryItem.id)}>
                  <Trash color="white" size={20} />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
