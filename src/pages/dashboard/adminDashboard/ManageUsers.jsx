import { useState, useMemo, useEffect, useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import profileBg from "../../../assets/profileBg.jpg";
import useAllUsers from "../../../hooks/useAllUsers";
import SectionTitleForMain from "../../../sharedComponents/sectionTitleForMain/SectionTitleForMain";

const ManageUsers = () => {
  const [allUsers] = useAllUsers();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");
  const tableRef = useRef(null);

  // Sort allUsers
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter and Search allUsers
  const filteredAndSearchedUsers = useMemo(() => {
    return allUsers
      .filter((user) => {
        const matchesSearch =
          user.name?.toLowerCase().includes(search.toLowerCase()) ||
          user.email?.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
          selectedUserType === "" || user?.userType === selectedUserType;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
  }, [allUsers, search, selectedUserType, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSearchedUsers.length / pageSize);
  const paginatedUsers = filteredAndSearchedUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  // Scroll table to the end when the component is mounted
  useEffect(() => {
    if (window.innerWidth <= 768 && tableRef.current) {
      const tableWrapper = tableRef.current;
      tableWrapper.scrollLeft = tableWrapper.scrollWidth;
    }
  }, [allUsers]);

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
      <div className="w-full max-w-7xl mx-auto">
        <div className="animate__animated animate__bounceInDown">
          <SectionTitleForMain
            heading={"Manage Users"}
            subHeading={"View and manage users."}
          ></SectionTitleForMain>
        </div>

        <div className="mb-4 flex flex-col animate__animated animate__bounceInRight sm:flex-row sm:items-center justify-between gap-4">
          {/* Search Input */}
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-sm py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
          />

          {/* User Type Filter Selector */}
          <select
            value={selectedUserType}
            onChange={(e) => setSelectedUserType(e.target.value)}
            className="w-full sm:w-auto py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
          >
            <option value="">Filter By Role</option>
            <option value="admin">admin</option>
            <option value="tourist">tourist</option>
            <option value="tourGuide">tourGuide</option>
          </select>

          {/* Page Size Selector */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-full sm:w-auto py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
          </select>
        </div>

        <div
          className="overflow-x-auto animate__animated animate__bounceInRight bg-white rounded-md border border-gray-200"
          ref={tableRef}
        >
          <table className="w-full text-sm">
            <thead className="bg-[#07332F] ">
              <tr>
                <th className="p-3 text-left font-semibold text-[17px] text-[#F5A481]">
                  Users Photo
                </th>
                <th className="p-3 text-left font-semibold text-[17px] text-[#F5A481]">
                  Users Name
                </th>
                <th className="p-3 text-left font-semibold text-[17px] text-[#F5A481]">
                  Users Email
                </th>
                <th className="p-3 text-left font-semibold text-[17px] text-[#F5A481]">
                  Users Role
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="pl-5 py-2">
                    <img
                      className="rounded-full h-12 w-12"
                      src={user?.photoURL}
                      alt=""
                    />
                  </td>
                  <td className="p-3">{user?.name || "N/A"}</td>
                  <td className="p-3">{user?.email}</td>
                  <td className="p-3">{user?.userType}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!paginatedUsers.length && (
            <div className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
              <img
                src="https://i.ibb.co/cgfgxGH/Illustrations.png"
                alt="empty/image"
                className="w-full sm:w-[200px]"
              />
              <h1 className="text-[1.4rem] mt-6 font-[500] text-black">
                Users Not Found
              </h1>
              <p className="text-[0.9rem] text-gray-500">
                Whoops ... this information is not available for a moment
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, filteredAndSearchedUsers.length)}{" "}
            of {filteredAndSearchedUsers.length} results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border border-gray-200 hover:bg-gray-50 cursor-pointer px-[10px] text-[0.9rem] py-[5px] rounded-md"
            >
              <BsChevronLeft />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`${
                    i + 1 === currentPage ? "bg-black text-white" : ""
                  } border border-gray-200 px-[10px] text-[0.9rem] py-[1px] rounded-md`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border border-gray-200 px-[10px] cursor-pointer hover:bg-gray-50 text-[0.9rem] py-[5px] rounded-md"
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
