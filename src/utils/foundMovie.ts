import { Movie } from "../interfaces/Movie";

export const foundMovie = (movies: Movie[], movie: Movie) => {
  return movies.find((m) => m.id === movie.id);
};
