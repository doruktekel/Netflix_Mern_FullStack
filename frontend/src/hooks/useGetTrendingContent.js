import { useEffect, useState } from "react";
import { contentStore } from "../store/contentStore";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = contentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContent(res.data.content);
    };

    getTrendingContent();
  }, []);

  return { trendingContent };
};

export default useGetTrendingContent;
