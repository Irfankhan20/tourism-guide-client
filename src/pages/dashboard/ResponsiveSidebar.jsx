import { useState } from "react";
import {
  MdManageAccounts,
  MdOutlineAddAPhoto,
  MdOutlineTour,
} from "react-icons/md";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { FiBarChart, FiPieChart } from "react-icons/fi";
// import { RiAccountCircleLine } from "react-icons/ri";
import { GoHome, GoSidebarCollapse } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
// import { BsThreeDots } from "react-icons/bs";

import useAdmin from "../../hooks/useAdmin";
import siteLogo from "../../assets/nav-logo.png";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import useUserByEmail from "../../hooks/useUserByEmail";

const ResponsiveSidebar = () => {
  // const { user } = useContext(AuthContext);
  const [isCollapse, setIsCollapse] = useState(true);
  const [aUser] = useUserByEmail();
  const [isAdmin, isTourGuide] = useAdmin();
  // console.log(isAdmin, isTourGuide);

  return (
    <aside
      className={`bg-white border-r-2 border-[#F5A481] shadow-2xl boxShadow rounded-md transition-all duration-300 ease  h-full`}
    >
      {/* website logo  ==============================================*/}
      <div
        className={`mt-5 ${
          isCollapse ? "px-[20px]" : "px-[10px]"
        } transition-all duration-300 ease-in-out`}
      >
        {/* logo */}
        {isCollapse ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={siteLogo}
                alt="logo"
                className="w-[50px] h-[38px] cursor-pointer"
              />
              <h1 className="text-[#F5A481] font-bold">
                Unique <span className="text-black">Travel</span>
              </h1>
            </div>
            <div className="relative group">
              <GoSidebarCollapse
                className="text-[1.5rem] text-gray-600 cursor-pointer"
                onClick={() => setIsCollapse(false)}
              />

              {/* tooltip */}
              <div
                className={`absolute -top-1 right-[-115px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                  Collapse
                </p>
              </div>
            </div>
          </div>
        ) : (
          <img
            src={siteLogo}
            alt="logo"
            className="w-[50px] mx-auto cursor-pointer"
            onClick={() => setIsCollapse(!isCollapse)}
          />
        )}
      </div>

      {/* profile section  ============================================== */}
      <div
        className={`${
          isCollapse ? "justify-between" : "justify-center"
        } bg-gray-100 py-3 px-[20px] flex items-center mt-6`}
      >
        <div className="flex flex-col items-center gap-[10px]">
          <div className="flex items-center gap-2">
            <img
              src={aUser?.photoURL}
              alt="avatar"
              className="w-[30px] h-[30px] cursor-pointer rounded-full object-cover"
            />
            <h3
              className={`${
                isCollapse ? "inline" : "hidden"
              } text-[0.9rem] text-gray-800  font-[600]`}
            >
              {aUser?.name}
            </h3>
          </div>
          <h3
            className={`${
              isCollapse ? "inline" : "hidden"
            } text-[0.9rem] text-gray-800 font-[500]`}
          >
            {aUser.userType === "admin" ? (
              <span className="bg-green-600 text-white font-semibold text-xs px-2 py-1 rounded-full">
                Admin
              </span>
            ) : aUser.userType === "tourGuide" ? (
              <span className="bg-blue-600 text-white font-semibold text-xs px-2 py-1 rounded-full">
                TourGuide
              </span>
            ) : (
              <span className="bg-purple-700 text-white font-semibold text-xs px-2 py-1 rounded-full">
                Tourist
              </span>
            )}
          </h3>
        </div>

        {/* <div className={`${isCollapse ? "inline" : "hidden"} relative group`}>
          <BsThreeDots className="text-[1.2rem] text-gray-500 cursor-pointer" />

          <ul className="translate-y-[20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-30 absolute top-0 left-[30px] bg-white boxShadow transition-all duration-300 p-[8px] rounded-md flex flex-col gap-[3px]">
            <li className="flex items-center gap-[7px] text-[0.9rem] text-gray-600 hover:bg-gray-50 px-[8px] py-[4px] rounded-md cursor-pointer">
              <RiAccountCircleLine />
              Profile
            </li>
          </ul>
        </div> */}
      </div>

      <hr className="border mt-6 border-[#F5A481]" />

      {/* general section  ============================================== */}
      <div
        className={`mt-6 ${
          isCollapse ? "px-[10px]" : "px-[10px]"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="mt-3 flex flex-col gap-[5px]">
          {isAdmin && (
            <>
              {/* admin home  */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/adminHome"
                  className="flex items-center gap-[8px]"
                >
                  <GoHome className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Admin Home
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Admin Home
                  </p>
                </div>
              </li>
              {/* add packages */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/addPakcage"
                  className="flex items-center gap-[8px]"
                >
                  <CiCalendar className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Add Package
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-99px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Calendar
                  </p>
                </div>
              </li>

              {/* manage profile */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/adminManageProfile"
                  className="flex items-center gap-[8px]"
                >
                  <FiBarChart className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Manage Profile
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-100px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Progress
                  </p>
                </div>
              </li>
              {/* manage candidates */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/manageCandidates"
                  className="flex items-center gap-[8px]"
                >
                  <FiPieChart className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Manage Candidates
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-76px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Goals
                  </p>
                </div>
              </li>
              {/* manage users */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/manageUsers"
                  className="flex items-center gap-[8px]"
                >
                  <FiPieChart className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Manage Users
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-76px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Goals
                  </p>
                </div>
              </li>
            </>
          )}
          {isTourGuide && (
            <>
              {/* tourguide home  */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/tourGuideHome"
                  className="flex items-center gap-[8px]"
                >
                  <GoHome className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    TourGuide Home
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    TourGuide Home
                  </p>
                </div>
              </li>

              {/* add stories  */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/addStories"
                  className="flex items-center gap-[8px]"
                >
                  <MdOutlineAddAPhoto className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Add Stories
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Add Stories
                  </p>
                </div>
              </li>
              {/* manage profile  */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/guideManageProfile"
                  className="flex items-center gap-[8px]"
                >
                  <CgProfile className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Manage Profile
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Manage Profile
                  </p>
                </div>
              </li>
              {/* manage stories  */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/manageStories"
                  className="flex items-center gap-[8px]"
                >
                  <MdManageAccounts className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Manage Stories
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Manage Stories
                  </p>
                </div>
              </li>
              {/* my assigned tours  */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/myAssignedTours"
                  className="flex items-center gap-[8px]"
                >
                  <MdOutlineTour className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Assigned Tours
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    My Assigned Tours
                  </p>
                </div>
              </li>
            </>
          )}
          {!isAdmin && !isTourGuide && (
            <>
              {/* tourist home  */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/touristHome"
                  className="flex items-center gap-[8px]"
                >
                  <GoHome className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Tourist Home
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Home
                  </p>
                </div>
              </li>

              {/* join as tourguide  */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/joinAsTourGuide"
                  className="flex items-center gap-[8px]"
                >
                  <GoHome className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Join As TourGuide
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Home
                  </p>
                </div>
              </li>
              {/* my bookings  */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/myBookings"
                  className="flex items-center gap-[8px]"
                >
                  <GoHome className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    My Bookings
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Home
                  </p>
                </div>
              </li>
              {/* add stories  */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/touristAddStories"
                  className="flex items-center gap-[8px]"
                >
                  <GoHome className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Add Stories
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Home
                  </p>
                </div>
              </li>
              {/* manage stories  */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/manageStories"
                  className="flex items-center gap-[8px]"
                >
                  <GoHome className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Manage Stories
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Home
                  </p>
                </div>
              </li>

              {/* manage profile  */}
              <li
                className={`${
                  isCollapse ? "justify-between" : "justify-center"
                } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <Link
                  to="/dashboard/touristManageProfile"
                  className="flex items-center gap-[8px]"
                >
                  <GoHome className="text-[1.3rem] text-gray-500" />
                  <p
                    className={`${
                      isCollapse ? "inline" : "hidden"
                    } text-[1rem] font-[400] text-gray-500`}
                  >
                    Manage Profile
                  </p>
                </Link>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse ? "hidden" : "inline"
                  } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Home
                  </p>
                </div>
              </li>
            </>
          )}
        </div>
      </div>

      {/* setting section  ============================================== */}
      <div
        className={`${
          isCollapse ? "px-[20px]" : "px-[10px]"
        } mt-6 border-t border-gray-200  transition-all duration-300 ease-in-out`}
      >
        <div className="mt-3 flex flex-col gap-[5px]">
          {/* Notification */}
          <div
            className={`${
              isCollapse ? "justify-between" : "justify-center"
            } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
          >
            <div className="flex items-center gap-[8px]">
              <IoNotificationsOutline className="text-[1.3rem] text-gray-500" />
              <p
                className={`${
                  isCollapse ? "inline" : "hidden"
                } text-[1rem] font-[400] text-gray-500`}
              >
                Notification
              </p>
            </div>

            {/* tooltip */}
            <div
              className={`${
                isCollapse ? "hidden" : "inline"
              } absolute top-0 right-[-98px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
            >
              <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                Activity
              </p>
            </div>
          </div>
          {/* Setting */}
          <div
            className={`${
              isCollapse ? "justify-between" : "justify-center"
            } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
          >
            <div className="flex items-center gap-[8px]">
              <IoSettingsOutline className="text-[1.3rem] text-gray-500" />
              <p
                className={`${
                  isCollapse ? "inline" : "hidden"
                } text-[1rem] font-[400] text-gray-500`}
              >
                Setting
              </p>
            </div>

            {/* tooltip */}
            <div
              className={`${
                isCollapse ? "hidden" : "inline"
              } absolute top-0 right-[-96px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
            >
              <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                Setting
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ResponsiveSidebar;
