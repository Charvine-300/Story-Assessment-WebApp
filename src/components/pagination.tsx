import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/state/store";
import { fetchPosts, pageCalc, perPageCalc } from "@/lib/state/features/postsSlice";

interface PaginationProps {
  currentPage: number;
  totalPosts: number;
  perPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPosts, perPage }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const totalPages = Math.ceil(totalPosts / perPage);

  const handlePageChange = (page: number) => {
    // Updating page number
    dispatch(pageCalc(page));

    // Updating posts view
    dispatch(fetchPosts({ per_page: perPage, page }));
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(event.target.value, 10);
    // Updating perPage and page number
    dispatch(perPageCalc(newPerPage));
    dispatch(pageCalc(1));

    dispatch(fetchPosts({ per_page: newPerPage, page: 1 })); // Reset to page 1 on perPage change
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0 sm:space-x-2">
      {/* Per Page Dropdown */}
      <div className="flex items-center">
        <label htmlFor="perPage" className="mr-2 text-black">
          Posts per page:
        </label>
        <select
          id="perPage"
          value={perPage}
          onChange={handlePerPageChange}
          className="px-3 py-1 border border-black rounded text-black"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-black text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-black text-white" : "bg-white text-black"}`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-black text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
