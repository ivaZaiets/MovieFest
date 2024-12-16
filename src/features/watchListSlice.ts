import { createSlice } from "@reduxjs/toolkit";
import { Movie } from "../interfaces/Movie";
import { foundMovie } from "../utils/foundMovie";
import { convertDateToDateString } from "../utils/convertDateToDateString";

interface State {
  watchList: Movie[];
  isModalShow: boolean;
  customMovie: Movie;
}

const initialState: State = {
  watchList: JSON.parse(localStorage.getItem("watchList") || "[]"),
  isModalShow: false,
  customMovie: {
    id: 0,
    poster_path: "",
    release_date: convertDateToDateString(new Date()),
    title: "",
    overview: "",
    genres: [],
    vote_average: 0,
    user_create: true,
    custom_file_name: "No file chosen",
  },
};

export const watchListSlice = createSlice({
  name: "watchListSlice",
  initialState,
  reducers: {
    set: (state, action) => {
      if (!foundMovie(state.watchList, action.payload)) {
        state.watchList.push(action.payload);
        localStorage.setItem("watchList", JSON.stringify(state.watchList));
      }
    },
    update: (state, action) => {
      const movieToUpdate = foundMovie(state.watchList, action.payload);
      if (movieToUpdate) {
        Object.assign(movieToUpdate, action.payload);
        localStorage.setItem("watchList", JSON.stringify(state.watchList));
      }
    },
    remove: (state, action) => {
      state.watchList = state.watchList.filter(
        (movie) => movie.id !== action.payload.id
      );
      localStorage.setItem("watchList", JSON.stringify(state.watchList));
    },
    setIsModalShow: (state, action) => {
      state.isModalShow = action.payload;
    },
    setCustomMovie: (state, action) => {
      state.customMovie = action.payload;
    },
    removeCustomMovie: (state) => {
      state.customMovie = initialState.customMovie;
    },
  },
});

export const {
  set,
  update,
  remove,
  setIsModalShow,
  setCustomMovie,
  removeCustomMovie,
} = watchListSlice.actions;

export default watchListSlice.reducer;
