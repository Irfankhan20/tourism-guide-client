{
  isCollapse ? (
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
  );
}

{
  {
    /* manage profile */
  }
  <li
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
      <Link className="flex items-center gap-[8px]">
        <GoProjectSymlink className="text-[1.3rem] text-gray-500" />
        <p
          className={`${
            isCollapse ? "inline" : "hidden"
          } text-[1rem] font-[400] text-gray-500`}
        >
          Manage Profile
        </p>
      </Link>

      <IoIosArrowDown
        className={`${isDropdownOpen ? "rotate-[180deg]" : "rotate-0"} ${
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
  </li>;
  {
    /* active projects dropdown */
  }
  {
    /* <ul
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
                </ul> */
  }
}
