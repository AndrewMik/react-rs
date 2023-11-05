import { useEffect, useState } from 'react';
import './style.css';

type PaginationProps = {
  count: number | null;
  itemsLimit: number;
  currentPage: number;
  changePage: (page: number) => Promise<void>;
};

const Pagination: React.FC<PaginationProps> = ({
  count,
  itemsLimit,
  currentPage,
  changePage,
}) => {
  const [allPages, setAllPages] = useState<number[] | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  useEffect(() => {
    let maxPages: number | undefined;

    if (count) {
      maxPages = Math.ceil(count / itemsLimit);
    }

    if (maxPages) {
      setTotalPages(maxPages);
      setAllPages(
        (new Array(maxPages) as number[]).fill(0).map((_, index) => index + 1)
      );
    }
  }, [count, itemsLimit]);

  return (
    <div className="pagination-container">
      {currentPage > 1 ? (
        <button
          className="pagination-button pagination-control"
          onClick={() => {
            changePage(currentPage - 1);
          }}
        >
          &#60;
        </button>
      ) : (
        <button className="pagination-button pagination-control pagination-button_disabled">
          &#60;
        </button>
      )}
      {allPages &&
        allPages.map((page) => {
          return currentPage === page ? (
            <button
              className="pagination-button pagination-button-active"
              disabled={true}
              key={`page-${page}`}
            >
              {page}
            </button>
          ) : page === 1 ||
            page === totalPages ||
            (currentPage < page + 2 && currentPage > page - 2) ||
            (page === currentPage + 2 && page - 2 === 1) ||
            (page === currentPage - 2 && page + 2 === totalPages) ? (
            <button
              className="pagination-button"
              key={`page-${page}`}
              onClick={() => {
                changePage(page);
              }}
            >
              {page}
            </button>
          ) : page - 1 === 1 || page + 1 === totalPages ? (
            <button className="pagination-button pagination-button_out-of-range-pages">
              ...
            </button>
          ) : null;
        })}
      {totalPages && currentPage < totalPages ? (
        <button
          className="pagination-button pagination-control"
          onClick={() => {
            changePage(currentPage + 1);
          }}
        >
          &#62;
        </button>
      ) : (
        <button className="pagination-button pagination-control pagination-button_disabled">
          &#62;
        </button>
      )}
    </div>
  );
};

export default Pagination;
