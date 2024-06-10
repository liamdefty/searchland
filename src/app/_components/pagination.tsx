import { useMemo } from 'react';

export type PaginationProps = {
  onPageChange: (index: number) => void;
  totalPages: number;
  currentPage: number;
  pageRange?: number;
  marginRange?: number;
}

type PaginationParams = {
  currentPage: number;
  totalPages: number;
  pageRange: number;
  marginRange: number;
};

export const isNumber = (val: unknown) => typeof val === "number" && val === val;

export const createPagination = ({
  currentPage,
  totalPages,
  pageRange,
  marginRange,
}: PaginationParams) => {
  const left = Math.floor(currentPage - (pageRange - 1) / 2);
  const right = Math.ceil(currentPage + (pageRange - 1) / 2);
  const range: number[] = [];
  const rangeWithBreak: Array<string | number> = [];
  let last;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i <= marginRange ||
      i > totalPages - marginRange ||
      (i >= left && i <= right)
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (last) {
      if (i - last === 2) {
        rangeWithBreak.push(last + 1);
      } else if (i - last !== 1) {
        rangeWithBreak.push('...');
      }
    }
    rangeWithBreak.push(i);
    last = i;
  }
  return rangeWithBreak;
};

export const Pagination = ({
  currentPage,
  totalPages,
  pageRange = 4,
  marginRange = 1,
  onPageChange
 }: PaginationProps) => {
  const paginate = useMemo<Array<number | string>>(
    () => createPagination({
      currentPage,
      totalPages,
      pageRange,
      marginRange,
    }),
    [currentPage, totalPages, pageRange, marginRange]
  );

  return (
    <footer className="m-4">
      <ul className="flex justify-center gap-4">
        {currentPage > 1 && (
          <li>
            <button onClick={() => onPageChange(currentPage - 1)}>
              {'<'}
            </button>
          </li>
        )}
        {paginate.map((item, index) => (
          <li key={index}>
            {!isNumber(item) ? (
              <span>{item}</span>
            ) : (
              <button
                onClick={() => onPageChange(item as number)}
                disabled={item === currentPage}
              >
                {item}
              </button>
            )}
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
             <button onClick={() => onPageChange(currentPage + 1)}>
              {'>'}
            </button>
          </li>
        )}
      </ul>
    </footer>
  )
}
