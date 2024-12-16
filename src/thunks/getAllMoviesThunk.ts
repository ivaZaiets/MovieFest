import { createAsyncThunk } from "@reduxjs/toolkit";
import { DEFAULT_URL } from "../utils/default_url";

export const getAllMoviesThunk = createAsyncThunk(
  "allMovies/fetch",
  async ({ page, query }: { page: number; query?: string }) => {
    const url = query
      ? `${DEFAULT_URL}search/movie?page=${page}&query=${query}&api_key=${import.meta.env.VITE_API_KEY}`
      : `${DEFAULT_URL}discover/movie?page=${page}&api_key=${import.meta.env.VITE_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    if (data.total_pages > 500) {
      return {
        ...data,
        total_pages: 500,
      };
    }

    return data;
  }
);
