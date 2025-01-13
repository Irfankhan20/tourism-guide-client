import { useEffect, useState } from "react";
import logo from "../../assets/nav-logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const user = false;
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleMouseEnterPhoto = () => {
    setIsModalOpen(true);
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

  const handleMouseLeaveContainer = (e) => {
    // If the mouse leaves both the photo and the modal container, close the modal
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsModalOpen(false);
    }
  };

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
              : `px-4 py-2 rounded hover:text-primary no-underline ${
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
              : `px-4 py-2 rounded hover:text-primary no-underline ${
                  scrolled ? "text-black" : pathname === "/" && "text-white"
                }`
          }
        >
          Community
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
              : `px-4 py-2 rounded hover:text-primary no-underline ${
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
              : `px-4 py-2 rounded hover:text-primary no-underline ${
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

          <p className="font-bold text-white">
            <span className="text-[#F5A481]">Unique</span> Travel
          </p>
        </Link>
      </div>

      <div className="navbar-end">
        <ul className=" hidden lg:flex gap-5 items-center menu menu-horizontal px-1">
          {navlinks}

          {user ? (
            <div
              className="flex relative items-center"
              onMouseLeave={handleMouseLeaveContainer}
            >
              <div
                onMouseEnter={handleMouseEnterPhoto}
                className="flex items-center md:gap-5"
              >
                <img
                  className="rounded-full w-8 h-8 mr-3"
                  src={user.photoURL}
                  alt={user.email}
                />
              </div>

              <button
                // onClick={logOut}
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
              className={`h-5 w-5 ${scrolled ? "text-black" : "text-white"}`}
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
            <li className=" justify-center font-bold">
              {" "}
              {user ? (
                <button
                  //   onClick={logOut}
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
          onMouseEnter={handleMouseEnterPhoto}
          onMouseLeave={handleMouseLeaveContainer}
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
