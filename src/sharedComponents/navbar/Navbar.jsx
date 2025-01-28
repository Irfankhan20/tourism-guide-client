import { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/nav-logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useUserByEmail from "../../hooks/useUserByEmail";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [aUser] = useUserByEmail();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const modalRef = useRef(null);
  const profileRef = useRef(null);

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the modal if clicked outside of it or the profile photo
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navlinks = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? `font-black px-4 py-2 rounded no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
              : ` px-4 py-2 rounded hover:text-[#F5A481] no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/community"}
          className={({ isActive }) =>
            isActive
              ? `font-black px-4 py-2 rounded no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
              : `px-4 py-2 rounded hover:text-[#F5A481] no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
          }
        >
          Community
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/allGuides"}
          className={({ isActive }) =>
            isActive
              ? `font-black px-4 py-2 rounded no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
              : `px-4 py-2 rounded hover:text-[#F5A481] no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
          }
        >
          All Guides
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/aboutus"}
          className={({ isActive }) =>
            isActive
              ? `font-black px-4 py-2 rounded no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
              : `px-4 py-2 rounded hover:text-[#F5A481] no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/trips"}
          className={({ isActive }) =>
            isActive
              ? `font-black px-4 py-2 rounded no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
              : `px-4 py-2 rounded hover:text-[#F5A481] no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
          }
        >
          Trips
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`navbar px-4 mx-auto fixed z-50 top-0 w-full flex justify-center transition-all ${
        scrolled && "backdrop-blur-md"
      }`}
    >
      {/* navbar start  */}
      <div className="navbar-start">
        <Link to={"/"} className=" flex gap-2 items-center">
          <img className="w-auto h-7" src={logo} alt="" />

          <p
            className={`font-bold ${
              scrolled ? "text-[#F5A481]" : pathname === "/" && "text-white"
            }`}
          >
            <span
              className={`${scrolled ? "text-[#F5A481]" : "text-[#F5A481]"}`}
            >
              Unique
            </span>{" "}
            Travel
          </p>
        </Link>
      </div>

      <div className="navbar-end">
        <ul className=" hidden lg:flex gap-5 md:gap-4 items-center menu menu-horizontal px-1">
          {navlinks}

          {user ? (
            <div
              className="flex relative items-center"

              // onMouseLeave={handleMouseLeaveContainer}
            >
              <div
                ref={profileRef}
                onClick={handleOpenModal}
                className="flex items-center md:gap-5"
              >
                <img
                  className="rounded-full w-8 h-8 mr-3"
                  src={aUser?.photoURL}
                  alt={aUser?.email}
                />
              </div>

              <button
                onClick={logOut}
                className="btn hidden border-none lg:flex text-text bg-button  font-bold"
              >
                SignOut
              </button>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="btn hidden border-none lg:flex text-text bg-button  font-bold"
            >
              Sign In
            </Link>
          )}
        </ul>

        {/* Dropdown for mobile */}
        <div className="dropdown z-50">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                scrolled ? "text-black" : pathname === "/" && "text-white"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
            {/* [#db9d82] */}
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content right-0 mt-3 z-[1] p-2 shadow ${
              scrolled ? "bg-[#db9d82]" : "bg-[#3b3b3aea]"
            } text-white rounded-box w-52`}
          >
            {navlinks}
            <li>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                  isActive
                    ? `font-black px-4 py-2 rounded no-underline ${
                        scrolled
                          ? "text-black"
                          : pathname === "/" && "text-white"
                      }`
                    : `px-4 py-2 rounded hover:text-[#F5A481] no-underline ${
                        scrolled
                          ? "text-black"
                          : pathname === "/" && "text-white"
                      }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className=" justify-center font-bold">
              {" "}
              {user ? (
                <button
                  onClick={logOut}
                  className=" btn py-3 bg-button text-text"
                >
                  SignOut
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="btn  border-none lg:flex bg-button py-3 mt-3  font-bold text-text"
                >
                  Log In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Modal (conditionally rendered when hovering over the profile photo) */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute right-[110px] rounded-lg border top-[55px] flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white flex flex-col gap-3 p-6 rounded-lg shadow-lg max-w-xs w-full">
            <Link to="/profile">
              <button className="btn w-32">Profile</button>
            </Link>
            <Link to="/dashboard">
              <button className="btn w-32">Dashboard</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
