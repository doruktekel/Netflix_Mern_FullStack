import { fetchDataFromTmdb } from "../services/tmdb.service.js";

export const getTrendingTv = async (req, res) => {
  try {
    const tvs = await fetchDataFromTmdb(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );

    const randomTvs =
      tvs.results[Math.floor(Math.random() * tvs.results?.length)];

    res.status(200).json({
      success: true,
      content: randomTvs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server  error",
    });
  }
};

export const getTvTrailers = async (req, res) => {
  const { id } = req.params;

  try {
    const trailerData = await fetchDataFromTmdb(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );

    res.status(200).json({
      success: true,
      content: trailerData.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

export const getTvDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const detailsData = await fetchDataFromTmdb(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    res.status(200).json({
      success: true,
      content: detailsData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

export const getSimilarTvs = async (req, res) => {
  const { id } = req.params;
  try {
    const similarTvData = await fetchDataFromTmdb(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      content: similarTvData.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

export const getTvsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const tvsData = await fetchDataFromTmdb(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      content: tvsData.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};
