import ReactPaginate from "react-paginate";
import { useWindowSize } from "react-use";
import { useAppSelector } from "../app/hooks";
import sprite from "../../public/sprite.svg";
import "../styles/components/Pagination.scss";

const Pagination = ({
  currentPage,
  setCurrentPage,
  isWatchList,
  watchListTotalPages = 0,
}: {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  isWatchList?: boolean;
  watchListTotalPages?: number;
}) => {
  const { width } = useWindowSize();
  const { totalPages } = useAppSelector((state) => state.allMovies);

  return (
    <ReactPaginate
      pageCount={isWatchList ? watchListTotalPages : totalPages}
      forcePage={currentPage - 1}
      onPageChange={(page) => {
        setCurrentPage(page.selected + 1);
        window.scrollTo(0, 0);
      }}
      pageRangeDisplayed={width < 1048 ? 1 : 3}
      marginPagesDisplayed={width < 1048 ? 1 : 3}
      previousLabel={
        <svg width="20" height="20">
          <use fill="white" xlinkHref={`${sprite}#arrow-prev`} />
        </svg>
      }
      nextLabel={
        <svg width="20" height="20">
          <use fill="white" xlinkHref={`${sprite}#arrow-next`} />
        </svg>
      }
      breakLabel={
        <svg width="20" height="20">
          <use stroke="white" xlinkHref={`${sprite}#dots`} />
        </svg>
      }
      className="pagination"
      pageClassName="page"
      activeClassName="active-page"
      disabledClassName="disabled-page"
    />
  );
};

export default Pagination;
