import React from "react";

interface PaginationProps {
  index: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  index,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(index - 1)} 
        disabled={index <= 1}
      >
        Previous
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button 
          key={i} 
          onClick={() => onPageChange(i + 1)}
          className={index === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}
      
      <button 
        onClick={() => onPageChange(index + 1)} 
        disabled={index >= totalPages}
      >
        Next
      </button>
      
      <select 
        value={pageSize} 
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={25}>25 per page</option>
      </select>
    </div>
  );
};

export default Pagination;