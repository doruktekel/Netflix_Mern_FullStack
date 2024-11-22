import { useEffect, useRef, useState } from "react";
import { contentStore } from "../store/contentStore";
import axios from "axios";
import { Link } from "react-router-dom";
import { TMDB_IMG_SMALL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ContentSlider = ({ contentList }) => {
  //movie types or tv types
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const { contentType } = contentStore(); // movie or tv

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const getScrollList = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${contentList}`);
      setContent(res.data.content);
    };

    getScrollList();
  }, [contentType, contentList]);

  return (
    <div className="flex flex-col gap-2 ">
      <p className=" font-semibold text-lg capitalize">
        {contentList.replaceAll("_", " ")}
      </p>

      <div
        className="flex gap-2 overflow-x-scroll relative"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
        ref={sliderRef}
      >
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="flex flex-col gap-1"
            key={item.id}
          >
            <div className="overflow-hidden">
              <img
                src={`${TMDB_IMG_SMALL}/${item.backdrop_path}`}
                alt="Image"
                className="min-w-60 rounded-lg transition-all duration-200 hover:scale-125  "
              />
            </div>
            <p className="text-center">{item.title || item.name}</p>
          </Link>
        ))}

        {showArrows && (
          <>
            <button
              className="absolute left-2 bottom-1/2 -translate-y-1/2 bg-slate-400 hover:bg-slate-600  rounded-full transition-all duration-200 "
              onClick={scrollLeft}
            >
              <ChevronLeft className="text-white" size={30} />
            </button>
            <button
              className="absolute right-2 bottom-1/2 -translate-y-1/2 bg-slate-400 hover:bg-slate-600  rounded-full transition-all duration-200 "
              onClick={scrollRight}
            >
              <ChevronRight className="text-white" size={30} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentSlider;
