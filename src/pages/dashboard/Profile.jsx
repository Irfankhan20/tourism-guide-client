import { useState } from "react";
import { Link } from "react-router-dom";

import useUserByEmail from "../../hooks/useUserByEmail";
import { imageUpload } from "../../imageUpload/imageUpload";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const Profile = () => {
  const [aUser, , refetch] = useUserByEmail();
  // console.log(aUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableName, setEditableName] = useState("");
  const [photo, setPhoto] = useState(null);
  const axiosPublic = useAxiosPublic();

  const handleUpdate = async () => {
    let uploadedPhotoUrl = aUser?.photoURL;
    if (photo) {
      uploadedPhotoUrl = await imageUpload(photo);

      const updateInfo = {
        name: editableName,
        photoURL: uploadedPhotoUrl,
      };
      console.log(updateInfo);

      const { data } = await axiosPublic.patch(
        `/update-profile/${aUser._id}`,
        updateInfo
      );
      if (data.modifiedCount > 0) {
        refetch();
        setIsModalOpen(false);
        toast.success("Profile updated successfully");
      }
    }
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="font-semibold text-xl md:text-4xl mb-2">
          Welcome, <span className="text-primary">{aUser?.name}!</span>
        </h2>
        <p className="text-gray-500 text-xl tracking-wider">
          Below, you can view and update your profile information.
        </p>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-8 p-16 bg-primaryBg">
        <div className="flex flex-col justify-center">
          <p className="text-gray-600 text-lg">Email: {aUser?.email}</p>
          <p className="text-gray-600 text-lg mb-4">
            Role: {aUser?.userType || "User"}
          </p>

          <Link onClick={() => setIsModalOpen(true)}>
            <button className="btn">Edit Profile</button>
          </Link>

          {aUser?.userType === "tourist" && (
            <Link className="mt-4" to="/joinAsGuide">
              <button className="btn">Apply For Tour Guide</button>
            </Link>
          )}
        </div>
        <div className="md:w-1/2 flex justify-end">
          <figure className="border p-4 rounded-xl">
            <img
              className="w-56 h-56 object-cover rounded-xl"
              src={aUser?.photoURL}
              alt="Profile"
            />
          </figure>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[30%]">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <label className="block mb-2 text-gray-700">Name</label>
            <input
              type="text"
              defaultValue={aUser?.name}
              onChange={(e) => setEditableName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <label className="block mt-4 mb-2 text-gray-700">
              Upload New Photo
            </label>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="file-input file-input-bordered w-full"
            />

            <div className="flex justify-end gap-6 mt-6">
              <button
                className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-800 rounded-lg shadow-sm"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg shadow-sm"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
