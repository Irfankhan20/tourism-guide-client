import { useState } from "react";
import { Link } from "react-router-dom";
import profileBg from "../../assets/profileBackImg.png";
import useUserByEmail from "../../hooks/useUserByEmail";
import { imageUpload } from "../../imageUpload/imageUpload";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { Camera } from "lucide-react";

const Profile = () => {
  const [aUser, , refetch] = useUserByEmail();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableName, setEditableName] = useState("");
  const [photo, setPhoto] = useState(null);
  const axiosPublic = useAxiosPublic();

  const handleUpdate = async () => {
    let uploadedPhotoUrl = aUser?.photoURL;
    if (photo) {
      uploadedPhotoUrl = await imageUpload(photo);
    }
    const updateInfo = {
      name: editableName,
      photoURL: uploadedPhotoUrl,
    };

    const { data } = await axiosPublic.patch(
      `/update-profile/${aUser._id}`,
      updateInfo
    );
    if (data.modifiedCount > 0) {
      refetch();
      setIsModalOpen(false);
      toast.success("Profile updated successfully");
    }
  };

  return (
    <div className="lg:my-10 lg:py-12 bg-gray-100 flex flex-col items-center p-6">
      {/* Profile Cover */}
      <div
        className="w-full max-w-4xl h-60 bg-cover bg-center rounded-lg shadow-lg relative"
        style={{ backgroundImage: `url(${profileBg})` }}
      >
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
      </div>

      {/* Profile Card */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg md:-mt-1 -mt-20 p-6 flex flex-col md:flex-row items-center text-center md:text-left">
        {/* Profile Image */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 border-4 border-[#07332F] rounded-full overflow-hidden shadow-md">
          <img
            className="w-full h-full object-cover"
            src={aUser?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
          />
          <button
            className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition"
            onClick={() => setIsModalOpen(true)}
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="mt-4 md:mt-0 md:ml-6 flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            {aUser?.name || "Tourist"}
          </h2>
          <p className="text-gray-500">{aUser?.email}</p>
          <p className="text-gray-700 font-semibold mt-1">
            Role: {aUser?.userType || "Tourist"}
          </p>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-sm"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </button>

            {aUser?.userType === "tourist" && (
              <Link to="/dashboard/joinAsTourGuide">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-sm">
                  Apply For Tour Guide
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[30%] shadow-lg">
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
                className="px-4 py-2 bg-[#F5A481] border border-[#07332F] text-[#07332F] hover:bg-[#fa966b] rounded-lg shadow-sm"
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
