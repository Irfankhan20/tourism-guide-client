import useAllPayments from "../../../hooks/useAllPayments";
import SectionTitleForMain from "../../../sharedComponents/sectionTitleForMain/SectionTitleForMain";
import profileBg from "../../../assets/profileBg.jpg";
import { useEffect, useMemo, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const PaymentHistory = () => {
  const [allPayments] = useAllPayments();
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
    return allPayments
      .filter((user) => {
        const matchesSearch =
          user?.name?.toLowerCase().includes(search.toLowerCase()) ||
          user?.email?.toLowerCase().includes(search.toLowerCase()) ||
          user?.phone?.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
          selectedUserType === "" || user?.status === selectedUserType;
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
  }, [
    allPayments,
    search,
    selectedUserType,
    sortConfig.direction,
    sortConfig.key,
  ]);

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
  }, []);

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
      {/* title part  */}
      <div className="animate__animated animate__bounceInDown">
        <SectionTitleForMain
          heading={"Payment History"}
          subHeading={"Manage payment history."}
        ></SectionTitleForMain>
      </div>

      {/* search, filter, page  */}
      <div className="mb-4 flex w-11/12 mx-auto flex-col animate__animated animate__bounceInRight sm:flex-row sm:items-center justify-between gap-4">
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
          <option value="">Filter By Payment Status</option>
          <option value="success">success</option>
          <option value="pending">pending</option>
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

      {/* table and data not found  */}
      <div
        className="overflow-x-auto animate__animated animate__bounceInRight bg-white rounded-md w-11/12 mx-auto border border-gray-200"
        ref={tableRef}
      >
        <table className="w-full text-sm">
          <thead className="bg-[#F5A481] ">
            <tr>
              <th className="p-3 text-left text-[17px] font-semibold text-[#07332F]">
                Tourist Name
              </th>
              <th className="p-3 text-left text-[17px] font-semibold text-[#07332F]">
                Tourist Email
              </th>
              <th className="p-3 text-left text-[17px] font-semibold text-[#07332F]">
                Tourist Phone
              </th>
              <th className="p-3 text-left text-[17px] font-semibold text-[#07332F]">
                Package Name
              </th>
              <th className="p-3 text-left text-[17px] font-semibold text-[#07332F]">
                Tour Date
              </th>
              <th className="p-3 text-left text-[17px] font-semibold text-[#07332F]">
                Transaction Id
              </th>

              <th className="p-3 text-left text-[17px] font-semibold text-[#07332F]">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3">{user?.name || "N/A"}</td>
                <td className="p-3">{user?.email || "N/A"} </td>
                <td className="p-3">{user?.phone || "N/A"}</td>
                <td className="p-3">{user?.packageName || "N/A"}</td>
                <td className="p-3">
                  {new Date(user?.tourDate).toLocaleDateString() || "N/A"}
                </td>
                <td className="p-3">{user?.trxId || "N/A"}</td>
                <td className="p-3">{user?.status || "N/A"}</td>
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

      {/* pagination part  */}
      <div className="mt-4 w-11/12 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, filteredAndSearchedUsers.length)} of{" "}
          {filteredAndSearchedUsers.length} results
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

export default PaymentHistory;
