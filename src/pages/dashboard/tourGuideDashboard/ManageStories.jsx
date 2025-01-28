import useStoriesByEmail from "../../../hooks/useStoriesByEmail";
import { FacebookShareButton } from "react-share";
import { Link, useNavigate } from "react-router-dom";
import profileBg from "../../../assets/profileBg.jpg";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { AuthContext } from "../../../provider/AuthProvider";
import StorySlider from "../../../components/homeComponents/touristStory/StorySlider";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitleForMain from "../../../sharedComponents/sectionTitleForMain/SectionTitleForMain";

const ManageStories = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stories, , refetch] = useStoriesByEmail();
  console.log(stories);
  const axiosSecure = useAxiosSecure();

  const handleShare = () => {
    if (!user) {
      navigate("/login");
    } else {
      alert("You need to set up a shareable link to enable sharing!");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/story/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `Your story has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${profileBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "65vh",
      }}
      className="w-full mx-auto lg:pb-32 lg:pt-10"
    >
      {/* Title and Subtitle */}
      <div className="text-center  animate__animated animate__bounceInDown">
        <SectionTitleForMain
          heading={"Explore Tourist Stories"}
          subHeading={
            "Discover amazing experiences shared by travelers from around the world."
          }
        ></SectionTitleForMain>
      </div>
      <div className="grid grid-cols-1  animate__animated animate__bounceInRight md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {stories?.map((story) => {
          const images = story?.photo || [];

          return (
            <div
              key={story?._id}
              className="relative bg-white shadow-lg overflow-hidden"
            >
              {/* Story Slider Component */}
              <StorySlider images={images} />

              <div className="flex">
                {/* Share Icon */}
                <div className="absolute top-4 right-4 flex justify-center items-center p-2 text-white hover:text-xl bg-[#07332F]  duration-300 rounded-full">
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
                {/* delete icon  */}
                <div className="absolute top-4 right-[55px] flex justify-center items-center p-2 text-white hover:text-xl bg-[#07332F]  duration-300 rounded-full cursor-pointer">
                  <button onClick={() => handleDelete(story?._id)}>
                    <MdDelete></MdDelete>
                  </button>
                </div>
                {/* edit icon  */}
                <div>
                  <Link
                    to={`/dashboard/updateStory/${story?._id}`}
                    className="absolute top-4 right-[95px] flex justify-center items-center p-2 text-white hover:text-xl bg-[#07332F]  duration-300 rounded-full cursor-pointer"
                  >
                    <button>
                      <FiEdit></FiEdit>
                    </button>
                  </Link>
                </div>
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
