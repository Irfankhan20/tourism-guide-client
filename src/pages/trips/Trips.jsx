import { useState } from "react";
import Package from "../../components/homeComponents/turismAndTravelGuide/Package";
import useAllPackages from "../../hooks/useAllPackages";

const Trips = () => {
  const [allPackages] = useAllPackages();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 10 items per page

  // Calculate total pages
  const totalPages = Math.ceil(allPackages.length / itemsPerPage);

  // Get current page data
  const currentData = allPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mb-24">
      <h1 className="text-3xl lg:mt-28 font-bold text-center mb-10">
        All Packages
      </h1>

      {/* Packages Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {currentData.map((tour) => (
          <Package key={tour._id} tour={tour} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <ul className="flex space-x-2">
          {/* Previous Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              Prev
            </button>
          </li>

          {/* Page Numbers */}
          {[...Array(totalPages).keys()].map((page) => (
            <li key={page}>
              <button
                onClick={() => handlePageChange(page + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page + 1}
              </button>
            </li>
          ))}

          {/* Next Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Trips;
