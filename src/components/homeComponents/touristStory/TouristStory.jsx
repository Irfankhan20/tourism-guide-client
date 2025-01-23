import { FacebookShareButton } from "react-share";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";

import { FaShareAlt } from "react-icons/fa";
import { AuthContext } from "../../../provider/AuthProvider";
import useTouristStories from "../../../hooks/useTouristStories";
import StorySlider from "./StorySlider";
import SectionTitleForMain from "../../../sharedComponents/sectionTitleForMain/SectionTitleForMain";
import Button from "../../../sharedComponents/button/Button";

const TouristStory = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stories] = useTouristStories();
  // console.log(stories);

  const handleShare = () => {
    if (!user) {
      navigate("/login");
    } else {
      alert("You need to set up a shareable link to enable sharing!");
    }
  };

  return (
    <div className="w-10/12 mx-auto md:mt-28 mt-10">
      {/* Title and Subtitle */}
      <div className="text-center">
        <SectionTitleForMain
          heading={"Explore Tourist Stories"}
          subHeading={
            " Discover amazing experiences shared by travelers from around the world"
          }
        ></SectionTitleForMain>
      </div>
      <div className="md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stories.map((story) => {
          const images = story.photo || [];

          return (
            <div
              key={story._id}
              className="relative bg-white shadow-lg overflow-hidden"
            >
              {/* Story Slider Component */}
              <StorySlider images={images} />

              {/* Share Icon */}
              <div className="absolute top-4 right-4 flex justify-center items-center p-2 text-[#F5A481] border border-[#07332F] bg-[#07332F] duration-300 rounded-full hover:shadow-2xl hover:shadow-[#8ad8d1]">
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

      {/* see more button  */}
      <div className="flex justify-center">
        <Link to="/community">
          <Button btnText={"See More Stories"}></Button>
        </Link>
      </div>
    </div>
  );
};

export default TouristStory;
