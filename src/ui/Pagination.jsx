import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchedParams, setSearchedParams] = useSearchParams();
  const currentPage = !searchedParams.get("page")
    ? 1
    : Number(searchedParams.get("page"));

  const pageCount = Math.ceil(count / import.meta.env.VITE_PAGE_SIZE);
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchedParams.set("page", next);
    setSearchedParams(searchedParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchedParams.set("page", prev);
    setSearchedParams(searchedParams);
  }

  if (pageCount <= 1) return null;
  return (
    <StyledPagination>
      <p>
        Showing{" "}
        <span>{(currentPage - 1) * import.meta.env.VITE_PAGE_SIZE + 1} </span>to{" "}
        <span>
          {currentPage === pageCount
            ? count
            : currentPage * import.meta.env.VITE_PAGE_SIZE}
        </span>
        of <span>{count} </span>
        results
      </p>
      <Buttons>
        <PaginationButton disabled={currentPage === 1} onClick={prevPage}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          disabled={currentPage === pageCount}
          onClick={nextPage}
        >
          <HiChevronRight />
          <span>Next</span>
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
