import React, { useState } from "react";

import Navbar from "../../components/Navbar";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import {
  TMDB_IMG_ORIGINAL,
  TMDB_MOVIE_CATEGORY,
  TMDB_TV_CATEGORY,
} from "../../utils/constants";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";
import { contentStore } from "../../store/contentStore";
import ContentSlider from "../../components/ContentSlider";

const HomeScreen = () => {
  const [imgLoading, setImgLoading] = useState(true);
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = contentStore();

  if (!trendingContent) {
    return (
      <div className="h-screen text-white relative ">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* HERO SECTION  */}
      <div className="h-screen text-white relative ">
        <Navbar />

        {/* HERO IMAGE SECTION */}

        <div className="absolute top-0 left-0 w-full h-full -z-10">
          {imgLoading && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10" />
          )}
          <img
            src={`${TMDB_IMG_ORIGINAL}${trendingContent?.backdrop_path}`}
            alt="HeroImage"
            className="absolute left-0 top-0 h-screen w-full object-cover -z-10 "
            onLoad={() => setImgLoading(false)}
          />
          <div className="absolute  inset-0 bg-black bg-opacity-50 bg-[radial-gradient(circle, rgba(0,0,0,0.8), transparent)]"></div>
        </div>

        {/* HERO TEXT SECTION */}
        <div className="absolute top-0 left-0 w-full h-full ">
          {" "}
          <div className=" max-w-7xl mx-auto h-screen flex">
            <div className="flex-1  justify-center  flex gap-2 flex-col p-10 ">
              <p className="text-4xl font-semibold ">
                {trendingContent?.title || trendingContent?.name}
              </p>
              <p className="text-xl  ">
                {trendingContent?.release_date?.split("-")[0] ||
                  trendingContent?.first_air_date?.split("-")[0]}{" "}
                | {trendingContent?.adult ? "18+" : "PG-13"}
              </p>
              <p className="text-xl">
                {trendingContent?.overview.length > 200
                  ? trendingContent?.overview.slice(0, 200) + "..."
                  : trendingContent?.overview}
              </p>
              <div className="flex gap-4">
                <Link
                  to={`/watch/${trendingContent?.id}`}
                  className="flex gap-2 px-4 py-2 bg-white text-black justify-center items-center rounded-md"
                >
                  <Play className="fill-black" /> Play
                </Link>
                <Link
                  to={`/watch/${trendingContent?.id}`}
                  className="flex gap-2 px-4 py-2 bg-gray-500 justify-center items-center rounded-md"
                >
                  <Info /> More Info
                </Link>
              </div>
            </div>
            <div className=" sm:flex-1"></div>
          </div>
        </div>
      </div>

      {/* SLIDER SECTION */}
      <div className="bg-black  text-white  ">
        <div className="flex flex-col max-w-7xl  mx-auto p-10 gap-4">
          {contentType === "movie"
            ? TMDB_MOVIE_CATEGORY.map((contentList, index) => (
                <ContentSlider key={index} contentList={contentList} />
              ))
            : TMDB_TV_CATEGORY.map((contentList, index) => (
                <ContentSlider key={index} contentList={contentList} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
