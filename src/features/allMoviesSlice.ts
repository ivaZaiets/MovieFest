import { createSlice } from "@reduxjs/toolkit";
import { getAllMoviesThunk } from "../thunks/getAllMoviesThunk";
import { Movie } from "../interfaces/Movie";

interface State {
  allMovies: Movie[];
  totalPages: number;
  loading: boolean;
  error: string;
}

const initialState: State = {
  allMovies: [],
  totalPages: 0,
  loading: true,
  error: "",
};

export const allMoviesSlice = createSlice({
  name: "allMoviesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMoviesThunk.pending, (state) => {
      state.loading = true;
      state.allMovies = [];
      state.totalPages = 0;
    });

    builder.addCase(getAllMoviesThunk.fulfilled, (state, action) => {
      state.allMovies = action.payload.results;
      state.totalPages = action.payload.total_pages;
      state.loading = false;
    });

    builder.addCase(getAllMoviesThunk.rejected, (state) => {
      state.loading = false;
      state.error = "Something went wrong";
    });
  },
});

export const actions = allMoviesSlice.actions;

export default allMoviesSlice.reducer;
