import { createAsyncThunk } from "@reduxjs/toolkit";
import { DEFAULT_URL } from "../utils/default_url";
import { RootState } from "../app/store";
import { Movie } from "../interfaces/Movie";
import { Credits } from "../interfaces/Credits";

export const getMovieThunk = createAsyncThunk<
  { movie: Movie; credits: Credits },
  number,
  { state: RootState }
>("movie/fetch", async (movieId, { getState }) => {
  const state = getState();
  const { watchList } = state.watchList;

  const customMovie = watchList.find(
    (movie) => movie.user_create && movie.id === movieId
  );

  if (customMovie) {
    return { movie: customMovie, credits: { id: 0, cast: [], crew: [] } };
  }

  const movieUrl = `${DEFAULT_URL}movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}`;
  const creditsUrl = `${DEFAULT_URL}movie/${movieId}/credits?api_key=${import.meta.env.VITE_API_KEY}`;

  const [movieResponse, creditsResponse] = await Promise.all([
    fetch(movieUrl),
    fetch(creditsUrl),
  ]);

  if (!movieResponse.ok || !creditsResponse.ok) {
    throw new Error("Failed to fetch movie details or credits");
  }

  const movieData = await movieResponse.json();
  const creditsData = await creditsResponse.json();

  return {
    movie: movieData,
    credits: creditsData,
  };
});
