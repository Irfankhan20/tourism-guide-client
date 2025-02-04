import { useEffect, useState } from "react";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitleForMain from "../../sharedComponents/sectionTitleForMain/SectionTitleForMain";
import { Helmet } from "react-helmet";

const AllTourGuides = () => {
  // fetch tour guides data
  const [guides, setGuides] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Calculate total pages
  const totalPages = Math.ceil(guides.length / itemsPerPage);
  // Get current page data
  const currentData = guides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("allGuides").then((res) => setGuides(res.data));
  }, [axiosPublic]);
  return (
    <div className="w-10/12 mx-auto md:mt-32 mt-28 md:mb-24 mb-20">
      <Helmet>
        <title>Unique Travel | TourGuides</title>
      </Helmet>
      {/* Title and Subtitle */}
      <div className="animate__animated animate__bounceInDown">
        <SectionTitleForMain
          heading={"Explore All Tour Guides"}
          subHeading={
            "Discover amazing experiences by travel with us from around the world"
          }
        ></SectionTitleForMain>
      </div>
      <div className="grid md:grid-cols-4 gap-7 md:gap-16 animate__animated animate__bounceInRight">
        {currentData.map((guide) => (
          <div
            key={guide._id}
            className="w-full shadow-md hover:shadow-none z-0 bg-white rounded-md relative cursor-pointer group before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] before:w-full before:h-full before:rounded-md before:bg-[#c0e6ed] before:transition-all before:duration-300 before:z-[-1] after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] after:rounded-md after:bg-[#d4f2f7] after:z-[-2] after:transition-all after:duration-500"
          >
            {/*  image  */}
            <img
              src={guide?.photo}
              alt="animated_card"
              className="w-full h-[250px] rounded-t-md object-cover"
            />

            {/*  contents  */}
            <div className="p-[18px] pt-2.5 bg-white rounded-b-md">
              <h3 className="text-[1.5rem] font-bold text-[#0FABCA]">
                Name: {guide?.name}
              </h3>
              <h3 className="text-lg font-bold text-[#0FABCA]">
                speciality: {guide?.specialty}
              </h3>
              <p className="text-[1rem] font-[600] text-gray-600">
                contact: {guide?.contact}
              </p>

              <button className="w-full py-2 px-4 hover:bg-[#c0e6ed] hover:text-black text-[1rem] transition-all duration-300 bg-[#0FABCA] text-white rounded-md mt-5">
                Explore
              </button>
            </div>
          </div>
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
                  : "bg-[#F5A481] text-[#07332F] border border-[#07332F] hover:bg-primary-dark"
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
                    ? "bg-[#F5A481] text-[#07332F] border border-[#07332F] hover:bg-primary-dark"
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
                  : "bg-[#F5A481] text-[#07332F] border border-[#07332F] hover:bg-primary-dark"
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

export default AllTourGuides;
