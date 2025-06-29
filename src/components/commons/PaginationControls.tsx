import React from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  loading: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onNextPage,
  onPreviousPage,
  loading,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      {/* <p className="text-gray-700 text-sm">
        Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
      </p> */}
      <p className="hidden sm:block text-gray-700 text-sm">
        Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
      </p>
      <div className="flex space-x-2 mx-auto sm:mx-0">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1 || loading}
          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md p-0"
        >
          <MdNavigateBefore />
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages || loading}
          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md p-0"
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
