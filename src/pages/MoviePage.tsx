import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getMovieThunk } from "../thunks/getMovieThunk";
import { PacmanLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import Card from "react-bootstrap/Card";
import MovieCard from "../components/MovieCard";
import "../styles/pages/MoviePage.scss";

const MoviePage = () => {
  const { movieId } = useParams();

  const id = movieId ? +movieId : 0;

  const dispatch = useAppDispatch();
  const { customMovie } = useAppSelector((state) => state.watchList);
  const { movie, credits, loading } = useAppSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getMovieThunk(id));
  }, [dispatch, id, customMovie]);

  return (
    <>
      <Navbar isMoviePage={true} />

      <Modal />

      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-85vh">
          <PacmanLoader color="#b07fe0" />
        </div>
      ) : (
        movie &&
        credits && (
          <div className="d-flex justify-content-center mt-5 big-card-container">
            <Card
              data-bs-theme="dark"
              className="d-flex flex-md-row justify-content-center align-items-center 
              align-items-md-start gap-4 w-75 p-4 p-md-5 card--big"
            >
              <MovieCard movie={movie} />

              <Card.Body className="p-0">
                {[
                  {
                    title: "Description",
                    content: movie.overview,
                  },
                  {
                    title: "Genre",
                    content: movie.genres
                      .map((genre) => genre.name)
                      .join(" / "),
                  },
                  {
                    title: "Director",
                    content:
                      credits.crew.length !== 0
                        ? credits.crew
                            .filter((person) => person.job === "Director")
                            .map((person) => person.name)
                            .join(", ")
                        : "uknown",
                  },
                  {
                    title: "Actors",
                    content:
                      credits.cast.length !== 0
                        ? credits.cast.map((actor) => actor.name).join(", ")
                        : "uknown",
                  },
                ].map((section) => (
                  <div key={section.title} className="d-flex flex-column mb-4">
                    <Card.Title className="mb-2 card-title--big">
                      {section.title}
                    </Card.Title>

                    <div className="d-flex">
                      <Card.Text>{section.content}</Card.Text>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>
        )
      )}
    </>
  );
};

export default MoviePage;
