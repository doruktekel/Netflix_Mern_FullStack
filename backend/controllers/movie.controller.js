import { fetchDataFromTmdb } from "../services/tmdb.service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const movies = await fetchDataFromTmdb(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );

    const randomMovies =
      movies.results[Math.floor(Math.random() * movies.results?.length)];

    res.status(200).json({
      success: true,
      content: randomMovies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server  error",
    });
  }
};

export const getMovieTrailers = async (req, res) => {
  const { id } = req.params;

  try {
    const trailerData = await fetchDataFromTmdb(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
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

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const detailsData = await fetchDataFromTmdb(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
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

export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const similarMovieData = await fetchDataFromTmdb(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      content: similarMovieData.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

export const getMoviesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const moviesData = await fetchDataFromTmdb(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      content: moviesData.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};
