import { Button } from "@chakra-ui/react";
import { useMemo } from "react";
import useAppStore from "../../hooks/useAppStore";
import { usePagination } from "../../hooks/usePagination";
import { PLANETS_PER_PAGE } from "../../pages";

const Pagination = () => {
  const { planets, currentPage, setCurrentPage } = useAppStore();

  const pageCount = Math.ceil(planets.length / PLANETS_PER_PAGE);

  const {
    canGoNextPage,
    canGoPreviousPage,
    gotoPage,
    goNextPage,
    goPreviousPage,
  } = usePagination({ setCurrentPage, pageCount, currentPage });

  const pages = useMemo(() => Array.from({ length: pageCount }), [pageCount]);

  return (
    <div className="flex justify-center gap-1 mt-10 lg:gap-4">
      <Button
        isDisabled={!canGoPreviousPage}
        colorScheme="facebook"
        onClick={goPreviousPage}
      >
        {"<"}
      </Button>
      {pages.map((_, idx) => {
        const pageNum = idx + 1;
        const isActive = pageNum === currentPage + 1;

        return (
          <Button
            colorScheme={isActive ? "yellow" : "facebook"}
            key={pageNum}
            onClick={() => gotoPage(idx)}
          >
            {pageNum}
          </Button>
        );
      })}
      <Button
        isDisabled={!canGoNextPage}
        colorScheme="facebook"
        onClick={goNextPage}
      >
        {">"}
      </Button>
    </div>
  );
};

export default Pagination;
