import useStoriesByEmail from "../../../hooks/useStoriesByEmail";
import { FacebookShareButton } from "react-share";
import { useNavigate } from "react-router-dom";
import profileBg from "../../../assets/profileBg.jpg";
import { useContext } from "react";

import { FaShareAlt } from "react-icons/fa";
import { AuthContext } from "../../../provider/AuthProvider";
import StorySlider from "../../../components/homeComponents/touristStory/StorySlider";

const ManageStories = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stories] = useStoriesByEmail();
  console.log(stories);

  const handleShare = () => {
    if (!user) {
      navigate("/login");
    } else {
      alert("You need to set up a shareable link to enable sharing!");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${profileBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
      className="w-full mx-auto my-28"
    >
      {/* Title and Subtitle */}
      <div className="text-center">
        <h2 className="text-5xl font-bold text-center mb-4">
          Explore Tourist Stories
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Discover amazing experiences shared by travelers from around the
          world.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stories?.map((story) => {
          const images = story?.photo || [];

          return (
            <div
              key={story?._id}
              className="relative bg-white shadow-lg overflow-hidden"
            >
              {/* Story Slider Component */}
              <StorySlider images={images} />

              {/* Share Icon */}
              <div className="absolute top-4 right-4 flex justify-center items-center p-2 text-white hover:text-black bg-primary hover:bg-white duration-300 rounded-full">
                {user ? (
                  <FacebookShareButton
                    url={`https://EliteExplore.com/stories/${story?._id}`}
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
                <h3 className="text-lg font-semibold ">{story?.title}</h3>
                <p className="leading-tight">{story?.excerpt}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageStories;
