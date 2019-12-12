import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { PaginationContainer, PageItem, Button } from "./Pagination.style";

interface Props {
  paginateFn: Function;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination: React.FC<Props> = ({
  paginateFn,
  totalItems,
  itemsPerPage
}) => {
  const pageVar: number[][] = [];
  const [totalPage, setTotalPage] = useState(0);
  const [pages, setPages] = useState(pageVar);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    setTotalPage(Math.ceil(totalItems / itemsPerPage));
    var pages = [],
      x = [];
    for (let i = 0; i < Math.ceil(totalPage); i++) {
      pages.push(i + 1);
    }
    for (var index = 0; index < pages.length; index += 4) {
      var myChunk = pages.slice(index, index + 4);
      x.push(myChunk);
    }
    setPages(x);
    paginateFn(0, itemsPerPage, currentPage);
  }, [totalPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    paginateFn((page - 1) * itemsPerPage, page * itemsPerPage, page);
  };

  const prev = () => {
    if (currentPage - 1 === 0) {
      return;
    }
    if (!pages[currentPageIndex].includes(currentPage - 1)) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
    setCurrentPage(currentPage - 1);
    paginateFn(
      (currentPage - 2) * itemsPerPage,
      (currentPage - 1) * itemsPerPage,
      currentPage - 1
    );
  };

  const next = () => {
    if (currentPage + 1 > totalPage) {
      return;
    }
    if (!pages[currentPageIndex].includes(currentPage + 1)) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
    setCurrentPage(currentPage + 1);
    paginateFn(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage,
      currentPage + 1
    );
  };

  const goToLast = (page: number) => {
    setCurrentPageIndex(pages.length - 1);
    setCurrentPage(page);
    paginateFn((page - 1) * itemsPerPage, page * itemsPerPage, page);
  };

  return (
    <PaginationContainer>
      {pages.length !== 0 ? (
        <>
          <PageItem
            className={
              currentPage === 1 && currentPageIndex === 0
                ? "item page_btn disabled"
                : "item page_btn"
            }
            id="prev"
            onClick={() => prev()}
          >
            <ChevronLeft /> Back
          </PageItem>

          <PageItem id="pagination-component" className="item">
            {pages[currentPageIndex].map((page: any, i: number) => {
              return (
                <Button
                  key={page}
                  className={currentPage === page ? "active item" : "item"}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </Button>
              );
            })}
            {currentPageIndex !== pages.length - 1 && (
              <>
                <Button className="item-ellipsis" key={"ellipsis"}>
                  {"..."}
                </Button>
                <Button
                  className="item"
                  key={"last"}
                  onClick={() => goToLast(totalPage)}
                >
                  {totalPage}
                </Button>
              </>
            )}
          </PageItem>

          <PageItem
            className={
              currentPage === totalPage
                ? "item page_btn disabled"
                : "item page_btn"
            }
            id="next"
            onClick={() => next()}
          >
            Next <ChevronRight />
          </PageItem>
        </>
      ) : null}
    </PaginationContainer>
  );
};

Pagination.defaultProps = {
  itemsPerPage: 0,
  totalItems: 0,
  paginateFn: () => {}
} as Partial<Props>;

export default Pagination;
