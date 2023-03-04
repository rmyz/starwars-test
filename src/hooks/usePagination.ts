import type { TStore } from "../store/store";

export const usePagination = ({
  setCurrentPage,
  pageCount,
  currentPage,
}: {
  setCurrentPage: TStore["setCurrentPage"];
  pageCount: number;
  currentPage: TStore["currentPage"];
}) => {
  const canGoPreviousPage = currentPage > 0;
  const canGoNextPage = currentPage + 1 < pageCount;

  const goNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const gotoPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return {
    canGoNextPage,
    canGoPreviousPage,
    goNextPage,
    goPreviousPage,
    gotoPage,
  };
};
