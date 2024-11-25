import { useEffect, useState } from "react";
import { contentStore } from "../store/contentStore";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = contentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/trending`);
        setTrendingContent(res.data.content);
      } catch (error) {
        console.error("Failed to fetch trending content:", error);
      }
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
