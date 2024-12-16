import { Movie } from "../interfaces/Movie";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  set,
  remove,
  setIsModalShow,
  setCustomMovie,
} from "../features/watchListSlice";
import { foundMovie } from "../utils/foundMovie";
import { convertDateToDotFormat } from "../utils/convertDateToDotFormat";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import sprite from "../../public/sprite.svg";
import "../styles/components/MovieCard.scss";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const dispatch = useAppDispatch();
  const { watchList } = useAppSelector((state) => state.watchList);

  return (
    <div className="card-container">
      <Card
        as={Link}
        to={`/movies/${movie.id}`}
        className="text-decoration-none"
      >
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={
              movie.poster_path?.includes("cloudinary")
                ? movie.poster_path
                : movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "images/empty-poster.png"
            }
            alt="movie poster"
          />

          {movie.user_create && (
            <Button
              variant="primary"
              className="position-absolute top-0 end-0 mt-2 me-2"
              onClick={(event) => {
                event.preventDefault();
                dispatch(setIsModalShow(true));
                dispatch(
                  setCustomMovie({
                    id: movie.id,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date,
                    title: movie.title,
                    overview: movie.overview,
                    genres: movie.genres,
                    vote_average: movie.vote_average,
                    user_create: movie.user_create,
                    custom_file_name: movie.custom_file_name,
                  })
                );
              }}
            >
              <svg width="20" height="20">
                <use fill="white" xlinkHref={`${sprite}#pen`} />
              </svg>
            </Button>
          )}
        </div>
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text className="d-flex justify-content-between">
            <span>Release date:</span>
            {movie.release_date
              ? convertDateToDotFormat(movie.release_date)
              : "unknown"}
          </Card.Text>

          <Card.Body className="d-flex justify-content-between align-items-center p-0">
            <Card.Text className="d-flex align-items-center gap-2 mb-0">
              <svg width="20" height="20">
                <use fill="white" xlinkHref={`${sprite}#rate`} />
              </svg>
              {movie.vote_average}/10
            </Card.Text>

            <Button
              variant="primary"
              onClick={(event) => {
                event.preventDefault();
                if (foundMovie(watchList, movie)) {
                  dispatch(remove(movie));
                } else {
                  dispatch(set(movie));
                }
              }}
            >
              {movie.user_create ? (
                "Remove"
              ) : (
                <svg width="20" height="20">
                  <use
                    fill={foundMovie(watchList, movie) ? "#f45656" : "white"}
                    xlinkHref={`${sprite}#heart`}
                  />
                </svg>
              )}
            </Button>
          </Card.Body>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MovieCard;
