import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserByEmail from "../../../hooks/useUserByEmail";
import profileBg from "../../../assets/profileBg.jpg";
import SectionTitleForMain from "../../../sharedComponents/sectionTitleForMain/SectionTitleForMain";
import Button from "../../../sharedComponents/button/Button";

const JoinAsTourGuide = () => {
  const axiosSecure = useAxiosSecure();
  const [aUser] = useUserByEmail();
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDestination] = useState("");
  const [whyTourGuide, setWhyTourGuide] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationInfo = {
      userId: aUser?._id,
      email: aUser?.email,
      name: aUser?.name,
      photo: aUser?.photoURL,
      userType: aUser?.userType,
      title,
      contact: phone,
      specialty: designation,
      whyTourGuide,
      cvLink,
    };
    const { data } = await axiosSecure.post("/application", applicationInfo);
    if (data.insertedId) {
      setShowModal(true);
      setTitle("");
      setPhone("");
      setDestination("");
      setWhyTourGuide("");
      setCvLink("");
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
      <div className="text-center  animate__animated animate__bounceInDown">
        <SectionTitleForMain
          heading={"APPLY FOR TO BE TOURGUIDE"}
          subHeading={
            "Discover amazing experiences by our unique travel tourguide."
          }
        ></SectionTitleForMain>
      </div>
      <div className="flex justify-center items-center  animate__animated animate__bounceInRight">
        <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3 w-full">
              <div className="w-1/2">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Application Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                  placeholder="Enter your application title"
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Phone*
                </label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-3 w-full">
              <div className="w-1/2">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <select
                  value={designation}
                  onChange={(e) => setDestination(e.target.value)}
                  className="border-gray-300 border rounded-lg outline-none px-3 w-full py-2 focus:border-primary transition-colors duration-300 "
                  required
                >
                  <option value="">Select Your Speciality</option>
                  <option value="Cultural Tour Guide">
                    Cultural Tour Guide
                  </option>
                  <option value="Nature and Eco-tourism Guide">
                    Nature and Eco-tourism Guide
                  </option>
                  <option value="Adventure and Trekking Guide">
                    Adventure and Trekking Guide
                  </option>
                  <option value="Heritage and Historical Sites Guide">
                    Heritage and Historical Guide
                  </option>
                  <option value="Adventure Sports Guide">
                    Adventure Sports Guide
                  </option>
                  <option value="Cultural Immersion and Cuisine Guide">
                    Cultural and Cuisine Guide
                  </option>
                  {/* Add more tour types as needed */}
                </select>
              </div>

              <div className="w-1/2">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  CV Link
                </label>
                <input
                  type="url"
                  value={cvLink}
                  onChange={(e) => setCvLink(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                  placeholder="Paste your CV link here"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Why do you want to be a Tour Guide?
              </label>
              <textarea
                value={whyTourGuide}
                onChange={(e) => setWhyTourGuide(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                placeholder="Write a brief description"
                required
              />
            </div>

            <div className="text-center">
              <button type="submit">
                <Button btnText={"Submit Application"}></Button>
              </button>
            </div>
          </form>

          {/* Modal for Success Message */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-xl shadow-xl w-1/3 text-center">
                <h3 className="text-2xl font-semibold text-green-500">
                  Application Successful!
                </h3>
                <p className="mt-4 text-lg text-gray-600">
                  Your application has been submitted successfully. We&apos;ll
                  review your application and get back to you soon!
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinAsTourGuide;
