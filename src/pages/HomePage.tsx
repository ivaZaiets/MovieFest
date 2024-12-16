import { useState, useEffect, useMemo } from "react";
import { getAllMoviesThunk } from "../thunks/getAllMoviesThunk";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { debounce } from "lodash";
import { PacmanLoader } from "react-spinners";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { allMovies, loading } = useAppSelector((state) => state.allMovies);

  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const debouncedFetchData = useMemo(
    () =>
      debounce((query: string) => {
        dispatch(getAllMoviesThunk({ page: currentPage, query }));
      }, 500),
    [dispatch, currentPage]
  );

  useEffect(() => {
    if (query) {
      debouncedFetchData(query);

      return () => {
        debouncedFetchData.cancel();
      };
    } else {
      dispatch(getAllMoviesThunk({ page: currentPage }));
    }
  }, [debouncedFetchData, query, dispatch, currentPage]);

  useEffect(() => {
    if (query) setCurrentPage(1);
  }, [query]);

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />

      {loading && allMovies.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-85vh">
          <PacmanLoader color="#b07fe0" />
        </div>
      ) : !loading && allMovies.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-85vh">
          <h2 style={{ color: "#b07fe0" }}>Movie not found</h2>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center mt-5 px-5">
          <div className="d-flex justify-content-center flex-wrap gap-4">
            {allMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default HomePage;
