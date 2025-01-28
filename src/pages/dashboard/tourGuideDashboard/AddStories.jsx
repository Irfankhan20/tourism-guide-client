import { useState } from "react";

import { FiUpload } from "react-icons/fi";
// import { MdOutlineAddAPhoto } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { imageUpload } from "../../../imageUpload/imageUpload";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import useUserByEmail from "../../../hooks/useUserByEmail";
import { useNavigate } from "react-router-dom";
import SectionTitleForMain from "../../../sharedComponents/sectionTitleForMain/SectionTitleForMain";
import profileBg from "../../../assets/profileBg.jpg";
import Button from "../../../sharedComponents/button/Button";

const AddStories = () => {
  const [aUser] = useUserByEmail();
  const [title, setTitle] = useState("");
  const axiosPublic = useAxiosPublic();
  const [excerpt, setExcerpt] = useState("");
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);

  const reset = () => {
    setTitle("");
    setExcerpt("");
    setImages("");
    setImageLinks("");
  };

  // Handle selecting image
  const handleImageChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);

    const newImageLinks = filesArray.map((file) => URL.createObjectURL(file));

    setImages([...images, ...filesArray]);
    setImageLinks([...imageLinks, ...newImageLinks]);
  };

  // Handle deleting an image
  const handleImageDelete = (index) => {
    const newImages = [...images];
    const newImageLinks = [...imageLinks];
    newImages.splice(index, 1);
    newImageLinks.splice(index, 1);

    setImages(newImages);
    setImageLinks(newImageLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrls = await Promise.all(
      images.map((image) => imageUpload(image))
    );

    const storyData = {
      name: aUser?.name,
      email: aUser?.email,
      title,
      excerpt,
      photo: imageUrls,
    };

    console.log(storyData);
    const storyPost = await axiosPublic.post("/addStory", storyData);
    if (storyPost.data.insertedId) {
      reset();
      navigate("/dashboard/manageStories");
      toast.success(`${storyData.title} is added to the stories.`);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${profileBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="lg:pb-20 lg:pt-10"
    >
      {/* Title and Subtitle */}
      <div className="text-center animate__animated animate__bounceInDown">
        <SectionTitleForMain
          heading={"ADD YOUR EXCLUSIVE STORY"}
          subHeading={
            "Discover amazing experiences shared by story from around the world."
          }
        ></SectionTitleForMain>
      </div>
      <div className="max-w-2xl animate__animated animate__bounceInRight bg-white mx-auto  px-10 py-4 border rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit}>
          {/* title  */}
          <div className="mb-2">
            <label className="block font-semibold mb-1">Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-300 border rounded-xl outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
              placeholder="Enter story title"
              required
            />
          </div>

          {/* description  */}
          <div className="mb-2">
            <label className="block font-semibold mb-1">Description*</label>
            <textarea
              value={excerpt}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setExcerpt(e.target.value);
                }
              }}
              className="border-gray-300 border rounded-xl outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
              rows="4"
              placeholder="Write your story description here (Max 100 characters)"
              required
            ></textarea>
            <p className="text-sm text-gray-500">
              {excerpt.length}/100 characters
            </p>
          </div>

          {/* photos */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Upload Images</label>
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
              multiple // Allow multiple image selection
            />
            <div
              className="w-[90%] flex items-center justify-center flex-col gap-4 border-[#e5eaf2] border rounded-md py-6 cursor-pointer"
              onClick={() => document.getElementById("image").click()}
            >
              <FiUpload className="text-[2rem] text-[#777777]" />
              <p className="text-[#777777]">Browse to upload your file</p>
            </div>
          </div>

          {/* Displaying the uploaded image previews */}
          {imageLinks.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {imageLinks.map((imageLink, index) => (
                <div key={index} className="relative w-[100px] h-[100px]">
                  <img
                    src={imageLink}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <MdDelete
                    className="text-[1.5rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                    onClick={() => handleImageDelete(index)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* submit button  */}
          <div className="mt-4">
            <Button btnText={"Add Your Story"}></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStories;
