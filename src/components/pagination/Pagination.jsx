"use client"
import React,{ useState } from "react";

const Pagination = ({listOfItems,currentPage,setCurrentPage,pageSize}) => {
 

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };
    
      const totalPages = listOfItems?.meta?.total
        ? Math.ceil(listOfItems.meta.total / pageSize)
        : 0;

  const getPaginationRange = (currentPage, totalPages) => {
    const range = [];
    const maxVisiblePages = 6; // Number of pages to show on each side
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    // Always show first page
    range.push(1);

    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if total pages are less than max visible + 2 (for ellipsis)
      for (let i = 2; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Determine when to show left ellipsis
      if (currentPage > halfVisiblePages + 2) {
        range.push("...");
      }

      // Calculate start and end of middle range
      let start = Math.max(2, currentPage - halfVisiblePages);
      let end = Math.min(totalPages - 1, currentPage + halfVisiblePages);

      // Adjust if we're near the beginning
      if (currentPage <= halfVisiblePages + 1) {
        end = maxVisiblePages;
      }
      // Adjust if we're near the end
      else if (currentPage >= totalPages - halfVisiblePages) {
        start = totalPages - maxVisiblePages + 1;
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          range.push(i);
        }
      }

      // Determine when to show right ellipsis
      if (currentPage < totalPages - halfVisiblePages - 1) {
        range.push("...");
      }
    }

    // Always show last page if there's more than 1 page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex justify-between items-center w-full flex-col md:flex-row ">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * pageSize + 1}
              </span>{" "}
              -{" "}
              <span className="font-medium">
                {Math.min(
                  currentPage * pageSize,
                  listOfItems?.meta?.total || 0
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {Number(listOfItems?.meta?.total || 0).toLocaleString()}
              </span>{" "}
              results
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md hidden md:block ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <span>←</span>
              </button>

              <div className="flex space-x-1">
                {getPaginationRange(currentPage, totalPages).map(
                  (page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <span className="px-2 py-1 text-gray-500 cursor-default">
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 rounded-md min-w-[32px] ${
                            currentPage === page
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  )
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md hidden md:block ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
