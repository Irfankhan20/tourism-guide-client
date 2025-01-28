import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaShareAlt } from "react-icons/fa";
import { FacebookShareButton } from "react-share";

import useAllStories from "../../hooks/useAllStories";
import { AuthContext } from "../../provider/AuthProvider";
import StorySlider from "../../components/homeComponents/touristStory/StorySlider";
import SectionTitleForMain from "../../sharedComponents/sectionTitleForMain/SectionTitleForMain";

const Community = () => {
  const { user } = useContext(AuthContext);
  const [allStories] = useAllStories();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 10 items per page

  // Calculate total pages
  const totalPages = Math.ceil(allStories.length / itemsPerPage);

  // Get current page data
  const currentData = allStories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShare = () => {
    if (!user) {
      navigate("/login");
    } else {
      toast.error("You need to set up a shareable link to enable sharing!");
    }
  };
  return (
    <div className="w-10/12 mx-auto mt-28 md:mt-32 md:mb-24 mb-20">
      {/* Title and Subtitle */}
      <div>
        <SectionTitleForMain
          heading={"Explore Tourist Stories"}
          subHeading={
            "Discover amazing experiences shared by travelers from around the world"
          }
        ></SectionTitleForMain>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentData.map((story) => {
          const images = story.photo || [];

          return (
            <div
              key={story._id}
              className="relative bg-white shadow-lg overflow-hidden"
            >
              {/* Story Slider Component */}
              <StorySlider images={images} />

              {/* Share Icon */}
              <div className="absolute top-4 right-4 flex justify-center items-center p-2 text-white border border-[#07332F] bg-[#07332F] duration-300 rounded-full hover:shadow-2xl hover:shadow-[#8ad8d1] ">
                {user ? (
                  <FacebookShareButton
                    url={`https://EliteExplore.com/stories/${story._id}`}
                    quote={story.title}
                    hashtag="#TouristStory"
                  >
                    <FaShareAlt />
                  </FacebookShareButton>
                ) : (
                  <button onClick={handleShare}>
                    <FaShareAlt className="text-white" />
                  </button>
                )}
              </div>

              {/* Persistent Overlay */}
              <div className="absolute inset-0 top-56 bg-black/20 px-2 text-white">
                <h3 className="text-lg font-semibold ">{story.title}</h3>
                <p className="leading-tight">{story.excerpt}</p>
              </div>
            </div>
          );
        })}
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

export default Community;
