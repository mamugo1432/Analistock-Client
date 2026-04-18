// components/Pagination/Pagination.tsx
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  isLastPage: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, isLastPage, onPageChange }: PaginationProps) {
  return (
    <div className="pagination">

      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      <span className="page-number">{currentPage}</span>

      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={isLastPage}
      >
        Siguiente
      </button>

    </div>
  );
}