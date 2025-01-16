import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";

const GuideManageProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-11/12 mx-auto  lg:mt-[67px] md:mt-[60px] mt-[62px] ">
      <h1 className="text-center font-semibold text-green-600 text-xl pt-3 lg:pb-8 md:pb-5 pb-7 underline">
        {user?.displayName}, welcome to{" "}
        <span className="text-2xl font-semibold text-button">
          Your Profile !!!
        </span>
      </h1>
      <div className="md:flex items-center md:gap-12">
        {/* image  */}
        <div className="shadow-2xl lg:w-[300px] lg:h-[300px] md:w-[260px] md:h-[260px] w-44 h-44 ml-28 md:ml-0 lg:ml-0 shadow-button p-5 rounded-full border-2 border-blue-600 backdrop-blur-xl bg-gradient-to-r from-green-400 to-blue-500 ">
          <img
            className="lg:w-[250px] w-[250px] h-[130px] md:w-[250px] md:h-[220px] rounded-full lg:h-[260px]"
            src={user?.photoURL}
            alt=""
          />
        </div>
        {/* info  */}
        <div className=" border-l-2  my-16 border-button  pl-12 ">
          <h1 className="border-b-2 border-button border-dashed text-3xl pb-4 font-semibold text-button">
            My Profile
          </h1>

          {/* name */}
          <div className="mt-5 mb-5">
            <h1 className="text-2xl text-primary font-semibold">Full Name</h1>
            <h1 className="text-xl pt-1 font-medium">{user?.displayName}</h1>
          </div>
          {/* email */}
          <div>
            <h1 className="text-2xl text-primary font-semibold">Email </h1>
            <h1 className="text-xl pt-1">{user?.email}</h1>
          </div>
          {/* button  */}
          <Link to="/updateProfile">
            <button className="px-5 mt-8 py-3 text-text bg-button font-bold rounded-xl shadow-xl">
              Update Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuideManageProfile;
