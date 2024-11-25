import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player/youtube";

import { contentStore } from "../store/contentStore";
import Navbar from "../components/Navbar";
import { TMDB_IMG_ORIGINAL, TMDB_IMG_SMALL } from "../utils/constants";
import WatchPageSkeletons from "../components/Skeletons/WatchPageSkeletons";

const WatchPage = () => {
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [similarContents, setSimilarContents] = useState([]);
  const { id } = useParams();
  const { contentType } = contentStore();

  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.content);
      } catch (error) {
        console.log("Error in getting trailers ", error);
        setTrailers([]);
      }
    };

    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setDetails(res.data.content);
      } catch (error) {
        console.log("Error in get details func", error);
        setDetails({});
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContents = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContents(res.data.content);
      } catch (error) {
        console.log("Error in getting similar movies", error);
        setSimilarContents([]);
      }
    };

    getSimilarContents();
  }, [contentType, id]);

  const handleLeft = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };
  const handleRight = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-20">
        <WatchPageSkeletons />
      </div>
    );
  }

  if (!details || Object.keys(details).length === 0) {
    return (
      <div className="bg-black min-h-lvh ">
        <Navbar />
        <div className="max-w-7xl mx-auto p-10 ">
          <p className="text-base sm:text-xl font-bold text-center  text-white">
            Content not found 😥
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-black">
      <Navbar />
      {trailers?.length > 0 && (
        <div className="max-w-7xl mx-auto mt-6 px-10">
          <div className="flex justify-between items-center">
            <button
              className={` px-2 py-1  rounded-md ${
                currentTrailerIdx === 0
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-600"
              }`}
              onClick={handleLeft}
              disabled={currentTrailerIdx === 0}
            >
              <ChevronLeft color="white" size={30} />
            </button>
            <button
              className={`px-2 py-1  rounded-md  ${
                currentTrailerIdx === trailers.length - 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-600"
              }  `}
              onClick={handleRight}
              disabled={currentTrailerIdx === trailers.length - 1}
            >
              <ChevronRight color="white" size={30} />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-5 px-10  aspect-auto ">
        {trailers?.length > 0 && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            controls={true}
            width={"100%"}
            height={"80vh"}
            className="rounded-xl overflow-hidden"
          />
        )}

        {trailers?.length === 0 && (
          <p className="text-center mt-5 text-white">
            No trailers available for{" "}
            <span className="font-bold text-red-600">
              {details?.title || details?.name}
            </span>{" "}
            😥
          </p>
        )}
      </div>

      {details && (
        <div className="max-w-7xl mx-auto mt-10  px-10 flex justify-between flex-col items-center sm:flex-row gap-10 text-white">
          <div className=" flex flex-col gap-4 text-center sm:text-left items-center sm:items-start  ">
            <p className="text-2xl font-semibold">
              {details?.title || details?.name}
            </p>

            <div className="flex gap-2">
              {details && (
                <p>{details?.release_date || details?.first_air_date}</p>
              )}

              {details?.adult ? (
                <p className="font-semibold italic text-red-700">"+18"</p>
              ) : (
                <p className="font-semibold italic text-green-700">"PG-13"</p>
              )}
            </div>

            {details?.overview && <p>{details?.overview}</p>}
          </div>
          {details?.poster_path && (
            <img
              src={TMDB_IMG_ORIGINAL + details?.poster_path}
              alt="Poster"
              className="max-h-[600px] max-w-[300px] rounded-lg "
            />
          )}
        </div>
      )}

      {similarContents && similarContents.length > 0 && (
        <div className="flex flex-col max-w-7xl  mx-auto p-10 gap-4 text-white  relative ">
          <p className="font-semibold text-xl"> {`Similar ${contentType}s`}</p>
          <div className="overflow-x-scroll  flex gap-1 group " ref={sliderRef}>
            {similarContents.map((similarContent) => {
              if (similarContent.poster_path === null) {
                return null;
              }

              return (
                <Link
                  className="flex flex-col gap-1  "
                  to={`/watch/${similarContent.id}`}
                >
                  <img
                    src={TMDB_IMG_SMALL + similarContent?.poster_path}
                    alt=""
                    className="min-w-[200px] h-80 object-cover"
                  />
                  <p className="text-center">
                    {similarContent.title || similarContent.name}
                  </p>
                </Link>
              );
            })}

            <ChevronLeft
              color="white"
              size={30}
              className="absolute left-12 top-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-300 cursor-pointer opacity-0 rounded-full
										 bg-red-600 text-white"
              onClick={scrollLeft}
            />

            <ChevronRight
              color="white"
              size={30}
              className="absolute right-12 top-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-300 cursor-pointer opacity-0 rounded-full
										 bg-red-600 text-white"
              onClick={scrollRight}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchPage;
