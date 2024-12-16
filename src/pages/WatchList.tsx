import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setIsModalShow } from "../features/watchListSlice";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Button from "react-bootstrap/Button";
import sprite from "../../public/sprite.svg";
import Modal from "../components/Modal";

const WatchList = () => {
  const dispatch = useAppDispatch();
  const { watchList } = useAppSelector((state) => state.watchList);

  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const normalizedQuery = query.toLowerCase().trim();
  const filteredWatchList = watchList.filter((movie) =>
    movie.title.toLowerCase().trim().includes(normalizedQuery)
  );

  const moviesPerPage = 20;
  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;

  const paginateWatchList = filteredWatchList.slice(
    firstMovieIndex,
    lastMovieIndex
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    if (paginateWatchList.length === 0) {
      setCurrentPage(1);
    }
  }, [paginateWatchList]);

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />

      <Modal />

      <div className="d-flex justify-content-end me-5 mt-5">
        <Button
          variant="primary"
          className="d-flex align-items-center"
          onClick={() => dispatch(setIsModalShow(true))}
        >
          Create movie
          <svg width="28" height="28" className="ps-2">
            <use stroke="white" xlinkHref={`${sprite}#plus`} />
          </svg>
        </Button>
      </div>

      {watchList.length === 0 && filteredWatchList.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-85vh px-5 text-center">
          <h2
            className="d-flex flex-column align-items-center lh-base"
            style={{ color: "#b07fe0" }}
          >
            <span>Your watchlist is empty.</span>
            <span>
              Start adding your favorite movies or create own collection!
            </span>
          </h2>
        </div>
      ) : watchList.length > 0 && filteredWatchList.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-85vh">
          <h2 style={{ color: "#b07fe0" }}>Movie not found</h2>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center mt-5 px-5">
          <div className="d-flex justify-content-center flex-wrap gap-4">
            {paginateWatchList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isWatchList={true}
            watchListTotalPages={Math.ceil(
              filteredWatchList.length / moviesPerPage
            )}
          />
        </div>
      )}
    </>
  );
};

export default WatchList;
