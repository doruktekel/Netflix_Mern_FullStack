import { UserModel } from "../models/auth.model.js";
import { fetchDataFromTmdb } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;

  try {
    const data = await fetchDataFromTmdb(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    const movieId = data.results[0].id;

    const alreadyExist = req.user.searchHistory.some(
      (entry) => entry.id === movieId
    );

    if (!alreadyExist) {
      await UserModel.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            title: data.results[0].name,
            image: data.results[0].profile_path,
            searchType: "person",
            createdAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

export const searchMovie = async (req, res) => {
  const { query } = req.params;

  try {
    const data = await fetchDataFromTmdb(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    const movieId = data.results[0].id;

    const alreadyExist = req.user.searchHistory.some(
      (entry) => entry.id === movieId
    );

    if (!alreadyExist) {
      await UserModel.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            title: data.results[0].title,
            image: data.results[0].poster_path,
            searchType: "movie",
            createdAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

export const searchTv = async (req, res) => {
  const { query } = req.params;

  try {
    const data = await fetchDataFromTmdb(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    const movieId = data.results[0].id;

    const alreadyExist = req.user.searchHistory.some(
      (entry) => entry.id === movieId
    );

    if (!alreadyExist) {
      await UserModel.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            title: data.results[0].name,
            image: data.results[0].poster_path,
            searchType: "tv",
            createdAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json(req.user.searchHistory);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

export const deleteSearchHistory = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  try {
    await UserModel.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: {
          id,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Item has been deleted from search history",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};
