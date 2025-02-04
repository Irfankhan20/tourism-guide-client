import { useMemo, useState, useEffect, useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import useBookingsByEmail from "../../../hooks/useBookingsByEmail";
// import SectionTitle from "../../../sharedComponents/sectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDelete, MdPayment } from "react-icons/md";
import profileBg from "../../../assets/profileBg.jpg";
import SectionTitleForMain from "../../../sharedComponents/sectionTitleForMain/SectionTitleForMain";

const MyBookings = () => {
  const [bookings, , refetch] = useBookingsByEmail();
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedGuide, setSelectedGuide] = useState(""); // New state for selected guide
  const tableRef = useRef(null);

  // Extract unique guide names for the filter
  const guideNames = useMemo(() => {
    const names = bookings.map((booking) => booking.guide?.name);
    return [...new Set(names)].filter(Boolean); // Remove duplicates and empty values
  }, [bookings]);

  // Filter bookings by selected guide and search
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch = Object.values(booking).some((value) =>
        value?.toString().toLowerCase().includes(search.toLowerCase())
      );
      const matchesGuide = selectedGuide
        ? booking.guide?.name === selectedGuide
        : true;

      return matchesSearch && matchesGuide;
    });
  }, [bookings, search, selectedGuide]);

  // Sort bookings
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  // console.log(handleSort);

  const sortedBookings = useMemo(() => {
    if (!sortConfig.key) return filteredBookings;

    return [...filteredBookings].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredBookings, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedBookings.length / pageSize);
  const paginatedBookings = sortedBookings.slice(
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
  }, [bookings]);

  const confirmCancel = (booking) => {
    toast(
      ({ closeToast }) => (
        <div className="flex items-center justify-between gap-2 p-2">
          <p className="text-sm text-gray-700 flex-1">
            Are you sure cancel your
            <span className="text-green-600"> {booking.packageName} </span>
            booking?
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              onClick={() => {
                handleCancel(booking);
                closeToast();
              }}
            >
              Yes
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
  };
  const handleCancel = async (booking) => {
    const { data } = await axiosSecure.delete(`/booking/${booking?._id}`);
    if (data.deletedCount > 0) {
      refetch();
      toast.success(`${booking.packageName}'s application has been deleted`);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${profileBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="lg:pt-8 lg:pb-20"
    >
      <div className=" animate__animated animate__bounceInDown">
        <SectionTitleForMain
          heading={"My Bookings"}
          subHeading={
            "View and manage your upcoming tours and reservations with ease."
          }
        ></SectionTitleForMain>
      </div>

      <div className="w-full bg-white overflow-x-auto  animate__animated animate__bounceInRight max-w-7xl mx-auto p-10 ">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search Input */}
          <input
            placeholder="Search by package name or price or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-sm py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
          />

          {/* Guide Filter Selector */}
          <select
            value={selectedGuide}
            onChange={(e) => setSelectedGuide(e.target.value)}
            className="w-full sm:w-auto py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
          >
            <option value="">Filter By Guide</option>
            {guideNames.map((guideName, index) => (
              <option key={index} value={guideName}>
                {guideName}
              </option>
            ))}
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
          className="overflow-x-auto rounded-md border border-gray-200"
          ref={tableRef}
        >
          <table className="w-full text-sm ">
            <thead className="bg-[#07332F] ">
              <tr>
                <th className="font-semibold text-[17px] p-3 text-left text-[#F5A481]">
                  Package Name
                </th>
                <th className="font-semibold text-[17px] p-3 text-left text-[#F5A481]">
                  Tour Guide
                </th>
                <th className="font-semibold text-[17px] p-3 text-left text-[#F5A481]">
                  Tour Date
                </th>
                <th className="font-semibold text-[17px] p-3 text-left text-[#F5A481]">
                  Price
                </th>
                <th className="font-semibold text-[17px] p-3 text-left text-[#F5A481]">
                  Status
                </th>
                <th className="font-semibold text-[17px] p-3 text-left text-[#F5A481]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">{booking.packageName}</td>
                  <td className="p-3">{booking.guide?.name || "N/A"}</td>
                  <td className="p-3">
                    {new Date(booking.tourDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">৳{booking.price}</td>
                  <td className="p-3 capitalize">{booking.status}</td>
                  <td className="p-3 flex items-center gap-2">
                    <Link to={`/dashboard/payment/${booking._id}`}>
                      <button
                        className="btn bg-blue-500 px-6 text-white hover:bg-red-700"
                        disabled={booking.status !== "pending"}
                      >
                        <MdPayment></MdPayment>
                        Pay
                      </button>
                    </Link>
                    <button
                      onClick={() => confirmCancel(booking)}
                      className="btn bg-red-500 text-white hover:bg-red-700"
                      disabled={booking.status !== "pending"}
                    >
                      <MdDelete></MdDelete>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!paginatedBookings?.length && (
            <div className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
              <img
                src="https://i.ibb.co/cgfgxGH/Illustrations.png"
                alt="empty/image"
                className="w-full sm:w-[200px]"
              />
              <h1 className="text-[1.4rem] mt-6 font-[500] text-black">
                No Bookings Found
              </h1>
              <p className="text-[0.9rem] text-gray-500">
                You haven&apos;t made any room bookings yet. Explore our
                available rooms and make your first booking today!
              </p>
              <div className="mt-6 w-1/3 mx-auto">
                <Link to="/trips">
                  <button className="btn btn-primary">Explore Tours</button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, sortedBookings.length)} of{" "}
            {sortedBookings.length} results
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

export default MyBookings;
