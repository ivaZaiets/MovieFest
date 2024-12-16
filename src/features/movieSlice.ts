import { createSlice } from "@reduxjs/toolkit";
import { getMovieThunk } from "../thunks/getMovieThunk";
import { Movie } from "../interfaces/Movie";
import { Credits } from "../interfaces/Credits";

interface State {
  movie: Movie | null;
  credits: Credits | null;
  loading: boolean;
  error: string;
}

const initialState: State = {
  movie: null,
  credits: null,
  loading: true,
  error: "",
};

export const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieThunk.pending, (state) => {
      state.loading = true;
      state.movie = null;
      state.credits = null;
    });

    builder.addCase(getMovieThunk.fulfilled, (state, action) => {
      state.movie = action.payload.movie;
      state.credits = action.payload.credits;
      state.loading = false;
    });

    builder.addCase(getMovieThunk.rejected, (state) => {
      state.loading = false;
      state.error = "Something went wrong";
    });
  },
});

export const actions = movieSlice.actions;

export default movieSlice.reducer;
