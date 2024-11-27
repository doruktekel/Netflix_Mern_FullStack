import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { TMDB_IMG_SMALL } from "../utils/constants";
import { Link } from "react-router-dom";
import { contentStore } from "../store/contentStore";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const { setContentType } = contentStore();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setSearchResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found, make sure you are searching under the right category"
        );
      } else {
        toast.error("An error occurred, please try again later");
      }
    } finally {
      setSearchTerm("");
    }
  };

  return (
    <div className="bg-black min-h-screen ">
      <div className="max-w-7xl mx-auto text-white p-10">
        <Navbar />
        <div className="flex gap-4 justify-center ">
          <button
            className={`px-4 py-2 rounded-md  ${
              activeTab === "movie" ? "bg-red-700" : "bg-gray-800"
            }  `}
            onClick={() => setActiveTab("movie")}
          >
            Movie
          </button>
          <button
            className={`px-4 py-2 rounded-md  ${
              activeTab === "tv" ? "bg-red-700" : "bg-gray-800"
            }  `}
            onClick={() => setActiveTab("tv")}
          >
            Tv
          </button>
          <button
            className={`px-4 py-2 rounded-md  ${
              activeTab === "person" ? "bg-red-700" : "bg-gray-800"
            }  `}
            onClick={() => setActiveTab("person")}
          >
            Person
          </button>
        </div>
        <form
          className="flex gap-2 justify-center mt-10 items-center"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Searching in ${activeTab}`}
            className="px-4 py-2 rounded-md w-3/4 md:w-2/4 placeholder:text-center text-black "
          />
          <button type="submit">
            <Search className="bg-red-600 p-1 rounded-md" size={40} />
          </button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 ">
          {searchResults &&
            searchResults.map((result) => {
              if (!result.poster_path && !result.profile_path) return null;

              return (
                <>
                  {activeTab === "person" ? (
                    <div
                      key={result.id}
                      className=" flex flex-col text-center gap-2 bg-gray-700 p-2 rounded-md "
                    >
                      <img
                        className=" h-[350px] object-cover"
                        src={TMDB_IMG_SMALL + result?.profile_path}
                        alt="poster"
                      />
                      <p>{result?.name}</p>
                    </div>
                  ) : (
                    <Link
                      to={`/watch/${result.id}`}
                      key={result.id}
                      className=" flex flex-col text-center gap-2 bg-gray-700 p-2 rounded-md "
                      onClick={() => setContentType(activeTab)}
                    >
                      <img
                        src={TMDB_IMG_SMALL + result?.poster_path}
                        className=" h-[350px] object-cover"
                        alt="poster"
                      />
                      <p>{result?.title || result?.name}</p>
                    </Link>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
