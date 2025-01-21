import { useState, useMemo, useEffect, useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import SectionTitle from "../../../sharedComponents/sectionTitle/SectionTitle";

import useAllUsers from "../../../hooks/useAllUsers";

const ManageUsers = () => {
  const [allUsers, , refetch] = useAllUsers();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const tableRef = useRef(null);

  // Sort allUsers
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedallUsers = useMemo(() => {
    if (!sortConfig.key) return allUsers;

    return [...allUsers].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [allUsers, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedallUsers.length / pageSize);
  const paginatedallUsers = sortedallUsers.slice(
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
    <div className="w-full overflow-x-auto max-w-7xl mx-auto p-4">
      <SectionTitle
        title={"Manage Users"}
        subtitle={"View and manage users."}
      ></SectionTitle>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
        className="overflow-x-auto rounded-md border border-gray-200"
        ref={tableRef}
      >
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-medium text-gray-700">
                Users Photo
              </th>
              <th className="p-3 text-left font-medium text-gray-700">
                Users Name
              </th>
              <th className="p-3 text-left font-medium text-gray-700">
                Users Email
              </th>
              <th className="p-3 text-left font-medium text-gray-700">
                Users Role
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedallUsers.map((booking) => (
              <tr
                key={booking._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="pl-5 py-2">
                  <img
                    className="rounded-full h-12 w-12"
                    src={booking?.photoURL}
                    alt=""
                  />
                </td>
                <td className="p-3">{booking?.name || "N/A"}</td>
                <td className="p-3">{booking?.email}</td>
                <td className="p-3">{booking?.userType}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {!paginatedallUsers?.length && (
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
          {Math.min(currentPage * pageSize, sortedallUsers.length)} of{" "}
          {sortedallUsers.length} results
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
  );
};

export default ManageUsers;
