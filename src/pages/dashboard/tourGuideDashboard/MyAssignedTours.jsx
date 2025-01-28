import { useQuery } from "@tanstack/react-query";
// import moment from "moment";
import profileBg from "../../../assets/profileBg.jpg";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitleForMain from "../../../sharedComponents/sectionTitleForMain/SectionTitleForMain";
// import { Link } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const MyAssignedTours = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedGuide, setSelectedGuide] = useState("");
  const tableRef = useRef(null);

  const { data: tours = [], refetch } = useQuery({
    queryKey: ["tours"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/guides-asigned-tours/${user?.email}`);
      return res.data;
    },
  });

  // Extract unique guide names for the filter
  const guideNames = useMemo(() => {
    const names = tours.map((booking) => booking?.status);
    return [...new Set(names)].filter(Boolean); // Remove duplicates and empty values
  }, [tours]);

  // Filter tours by selected guide and search
  const filteredBookings = useMemo(() => {
    return tours.filter((booking) => {
      console.log(booking);
      const matchesSearch = Object.values(booking).some((value) =>
        value?.toString().toLowerCase().includes(search.toLowerCase())
      );
      const matchesGuide = selectedGuide
        ? booking?.status === selectedGuide
        : true;

      return matchesSearch && matchesGuide;
    });
  }, [tours, search, selectedGuide]);

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
  }, [tours]);

  const handleAccept = async (id) => {
    const { data } = await axiosSecure.patch(`/bookings-accept/${id}`);
    if (data.modifiedCount > 0) {
      refetch();
      toast.success("You have Accepted the booking");
    } else {
      toast.error("Failed to Accept booking");
    }
  };

  const handleReject = async (id) => {
    console.log(id);
    const { data } = await axiosSecure.patch(`/bookings-reject/${id}`);
    console.log(data);
    if (data.modifiedCount > 0) {
      refetch();
      toast.success("You have rejected the booking");
    } else {
      toast.error("Failed to reject booking");
    }
  };

  const confirmReject = (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex items-center justify-between gap-2 p-2">
          <p className="text-sm text-gray-700 flex-1">
            Are you sure want to reject the tour?
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              onClick={() => {
                handleReject(id);
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
          heading={"My Assigned Tours"}
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
            <option value="">Filter By status</option>
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
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-medium text-gray-700">
                  Package Name
                </th>
                <th className="p-3 text-left font-medium text-gray-700">
                  Tourist Name
                </th>
                <th className="p-3 text-left font-medium text-gray-700">
                  Tour Date
                </th>
                <th className="p-3 text-left font-medium text-gray-700">
                  Tour Price
                </th>
                <th className="p-3 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="p-3 text-left font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((tour) => (
                <tr
                  key={tour._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td>{tour?.packageName}</td>
                  <td>{tour?.user?.name}</td>
                  <td>{new Date(tour?.tourDate).toLocaleDateString()}</td>
                  <td>{`${tour?.price}`}</td>
                  <td>
                    <span
                      className={`badge ${
                        tour.status === "Pending"
                          ? "badge-warning"
                          : tour.status === "in review"
                          ? "badge-info"
                          : tour.status === "accepted"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {tour.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAccept(tour._id)}
                      disabled={tour.status !== "In Review"}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => confirmReject(tour._id)}
                      disabled={
                        tour.status === "rejected" || tour.status === "Accepted"
                      }
                    >
                      Reject
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
                My Assigned Tours Not Found
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

export default MyAssignedTours;
