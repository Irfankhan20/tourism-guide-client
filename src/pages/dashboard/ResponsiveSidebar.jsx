import { useContext, useState } from "react";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { FiBarChart, FiPieChart } from "react-icons/fi";
// import { RiAccountCircleLine } from "react-icons/ri";
import { GoHome, GoProjectSymlink, GoSidebarCollapse } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
// import { BsThreeDots } from "react-icons/bs";
import { AuthContext } from "../../provider/AuthProvider";

const ResponsiveSidebar = () => {
  const { user } = useContext(AuthContext);
  const [isCollapse, setIsCollapse] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  return (
    <aside
      className={`bg-white border-r-2 border-[#F5A481] shadow-2xl boxShadow rounded-md transition-all duration-300 ease`}
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
            <img
              src="https://i.ibb.co/ZHYQ04D/footer-logo.png"
              alt="logo"
              className="w-[130px] cursor-pointer"
            />
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
            src="https://i.ibb.co/0BZfPq6/darklogo.png"
            alt="logo"
            className="w-[50px] mx-auto cursor-pointer"
            onClick={() => setIsCollapse(!isCollapse)}
          />
        )}

        {/* search bar */}
        {isCollapse ? (
          <div className="relative mt-5">
            <input
              className="px-4 py-2 border border-border rounded-md w-full pl-[40px] outline-none focus:border-primary"
              placeholder="Search..."
            />
            <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
          </div>
        ) : (
          <div className="w-full relative group">
            <IoIosSearch className="text-[2rem] mx-auto text-gray-500 mt-2 p-[5px] rounded-md hover:bg-gray-100 cursor-pointer w-full" />

            {/* tooltip */}
            <div
              className={`${
                isCollapse ? "hidden" : "inline"
              } absolute top-0 right-[-85px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
            >
              <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                Search
              </p>
            </div>
          </div>
        )}
      </div>

      {/* general section  ============================================== */}
      <div
        className={`mt-6 ${
          isCollapse ? "px-[20px]" : "px-[10px]"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="mt-3 flex flex-col gap-[5px]">
          {/* home  */}
          <div
            className={`${
              isCollapse ? "justify-between" : "justify-center"
            } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
          >
            <div className="flex items-center gap-[8px]">
              <GoHome className="text-[1.3rem] text-gray-500" />
              <p
                className={`${
                  isCollapse ? "inline" : "hidden"
                } text-[1rem] font-[400] text-gray-500`}
              >
                Home
              </p>
            </div>

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
          </div>
          {/* Calendar */}
          <div
            className={`${
              isCollapse ? "justify-between" : "justify-center"
            } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
          >
            <div className="flex items-center gap-[8px]">
              <CiCalendar className="text-[1.3rem] text-gray-500" />
              <p
                className={`${
                  isCollapse ? "inline" : "hidden"
                } text-[1rem] font-[400] text-gray-500`}
              >
                Calendar
              </p>
            </div>

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
          </div>
          {/* Projects */}
          <div
            className={`${isCollapse && "justify-center"} ${
              isDropdownOpen && "bg-gray-50"
            }  flex w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group flex-col`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div
              className={`${
                isCollapse ? " justify-between" : "justify-center"
              } flex items-center gap-[8px  w-full`}
            >
              <div className="flex items-center gap-[8px]">
                <GoProjectSymlink className="text-[1.3rem] text-gray-500" />
                <p
                  className={`${
                    isCollapse ? "inline" : "hidden"
                  } text-[1rem] font-[400] text-gray-500`}
                >
                  Projects
                </p>
              </div>

              <IoIosArrowDown
                className={`${
                  isDropdownOpen ? "rotate-[180deg]" : "rotate-0"
                } ${
                  isCollapse ? "inline" : "hidden"
                } transition-all duration-300 text-[1rem] text-gray-500`}
              />
            </div>

            {!isCollapse && (
              <>
                {/* hover projects dropdown */}
                <ul className="translate-y-[20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-30 absolute top-0 left-[70px] bg-white boxShadow transition-all duration-300 p-[8px] rounded-md flex flex-col gap-[3px] text-[1rem] text-gray-500">
                  <li className="hover:bg-gray-50 px-[20px] py-[5px] rounded-md">
                    Google
                  </li>
                  <li className="hover:bg-gray-50 px-[20px] py-[5px] rounded-md">
                    Facebook
                  </li>
                  <li className="hover:bg-gray-50 px-[20px] py-[5px] rounded-md">
                    Twitter
                  </li>
                  <li className="hover:bg-gray-50 px-[20px] py-[5px] rounded-md">
                    Linkedin
                  </li>
                </ul>
              </>
            )}
          </div>
          {/* active projects dropdown */}
          <ul
            className={`${
              isDropdownOpen
                ? "h-auto my-3 opacity-100 z-[1]"
                : "opacity-0 z-[-1] h-0"
            } ${
              isCollapse ? "inline" : "hidden"
            } transition-all duration-300 list-disc marker:text-blue-400 ml-[35px] flex flex-col gap-[3px] text-[1rem] text-gray-500`}
          >
            <li className="hover:bg-gray-50 px-[10px] py-[5px] rounded-md">
              Google
            </li>
            <li className="hover:bg-gray-50 px-[10px] py-[5px] rounded-md">
              Facebook
            </li>
            <li className="hover:bg-gray-50 px-[10px] py-[5px] rounded-md">
              Twitter
            </li>
            <li className="hover:bg-gray-50 px-[10px] py-[5px] rounded-md">
              Linkedin
            </li>
          </ul>
          {/* Progress */}
          <div
            className={`${
              isCollapse ? "justify-between" : "justify-center"
            } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
          >
            <div className="flex items-center gap-[8px]">
              <FiBarChart className="text-[1.3rem] text-gray-500" />
              <p
                className={`${
                  isCollapse ? "inline" : "hidden"
                } text-[1rem] font-[400] text-gray-500`}
              >
                Progress
              </p>
            </div>

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
          </div>
          {/* Goals */}
          <div
            className={`${
              isCollapse ? "justify-between" : "justify-center"
            } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
          >
            <div className="flex items-center gap-[8px]">
              <FiPieChart className="text-[1.3rem] text-gray-500" />
              <p
                className={`${
                  isCollapse ? "inline" : "hidden"
                } text-[1rem] font-[400] text-gray-500`}
              >
                Goals
              </p>
            </div>

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
          </div>
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

      {/* profile section  ============================================== */}
      <div
        className={`${
          isCollapse ? "justify-between" : "justify-center"
        } bg-gray-100 py-3 px-[20px] flex items-center mt-10`}
      >
        <div className="flex items-center gap-[10px]">
          <img
            src={user?.photoURL}
            alt="avatar"
            className="w-[30px] h-[30px] cursor-pointer rounded-full object-cover"
          />
          <h3
            className={`${
              isCollapse ? "inline" : "hidden"
            } text-[0.9rem] text-gray-800 font-[500]`}
          >
            {user?.displayName}
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
    </aside>
  );
};

export default ResponsiveSidebar;
