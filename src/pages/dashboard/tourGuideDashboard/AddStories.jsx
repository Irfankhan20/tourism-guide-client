import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { FiUpload } from "react-icons/fi";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { imageUpload } from "../../../imageUpload/imageUpload";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const AddStories = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const axiosPublic = useAxiosPublic();
  const [excerpt, setExcerpt] = useState("");

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
      name: user?.displayName,
      email: user?.email,
      title,
      excerpt,
      photo: imageUrls,
    };

    console.log(storyData);
    const storyPost = await axiosPublic.post("/addStory", storyData);
    if (storyPost.data.insertedId) {
      reset();
      toast.success(`${storyData.title} is added to the stories.`);
    }
  };

  return (
    <section className="w-full border-2 lg:px-10 lg:mx-10">
      {/* title */}
      <div className="w-full px-3 pt-5 md:pt-0 lg:pt-0 md:px-0  flex flex-col items-center justify-center">
        <h1 className="flex gap-2 text-[2rem] font-bold text-primary leading-[36px]">
          <MdOutlineAddAPhoto /> <span>Add Story</span>
        </h1>
        <p className="text-[1rem] text-text">Share Your Exciting Story</p>
      </div>

      {/* form area */}
      <form onSubmit={handleSubmit} className="w-full mt-[50px]">
        <div className="flex flex-col sm:flex-row items-center gap-[20px]">
          {/* name */}
          <div className="lg:w-[50%] w-full px-3 md:px-0 lg:px-0">
            <label htmlFor="name" className="text-[15px] font-[400]">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              name="name"
              id="name"
              placeholder="Your name"
              className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
            />
          </div>

          {/* email */}
          <div className="w-full lg:w-[50%] px-3 md:px-0 lg:px-0">
            <label htmlFor="title" className="text-[15px] font-[400]">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={user?.email}
              readOnly
              type="text"
              name="email"
              id="email"
              placeholder="Your Email"
              className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
            />
          </div>
        </div>

        {/* title */}
        <div className="w-full  px-3 md:px-0 lg:px-0">
          <label htmlFor="title" className="text-[15px] font-[400]">
            Story Title <span className="text-red-500">*</span>
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            name="title"
            id="title"
            placeholder="Your Story Title"
            className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
          />
        </div>

        {/* description */}
        <div className="w-full px-3 md:px-0 lg:px-0">
          <label htmlFor="description" className="font-[400] text-[15px]">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            id="description"
            placeholder="Write something about your story (max 90 characters)"
            maxLength={90}
            className="border-[#e5eaf2] border rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[200px] focus:border-[#3B9DF8] transition-colors duration-300"
          />
          <p className="text-right text-[13px] text-gray-500 mt-1">
            {excerpt.length}/90 characters
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

        <button
          type="submit"
          className="py-3 px-4 border border-blue-500 rounded-md outline-none mt-[10px]"
        >
          Add Story
        </button>
      </form>
    </section>
  );
};

export default AddStories;
