import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movieSlice";
import allMoviesReducer from "../features/allMoviesSlice";
import watchListReducer from "../features/watchListSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    allMovies: allMoviesReducer,
    watchList: watchListReducer,
  },
});

export default store;
