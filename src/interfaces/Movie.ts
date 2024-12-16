export interface Movie {
  id: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  adult?: boolean;
  backdrop_path?: string | null;
  genre_ids?: number[];
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  video?: boolean;
  vote_count?: number;
  user_create?: boolean;
  custom_file_name?: string;
}
