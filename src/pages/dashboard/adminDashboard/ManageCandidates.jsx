import { useState, useMemo, useEffect, useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import useAllApplications from "../../../hooks/useAllApplications";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import profileBg from "../../../assets/profileBg.jpg";
import SectionTitleForMain from "../../../sharedComponents/sectionTitleForMain/SectionTitleForMain";

const ManageCandidates = () => {
  const [allApplications, , refetch] = useAllApplications();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef(null);

  // Sort allApplications
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedallApplications = useMemo(() => {
    if (!sortConfig.key) return allApplications;

    return [...allApplications].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [allApplications, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedallApplications.length / pageSize);
  const paginatedallApplications = sortedallApplications.slice(
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
  }, [allApplications]);

  // Open modal with full text
  const handleOpenModal = (id) => {
    setExpandedRow(id);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setExpandedRow(null);
  };

  //reject
  const handleReject = (applicaiton) => {
    toast(
      ({ closeToast }) => (
        <div className="flex items-center justify-between gap-2 p-2">
          <p className="text-sm text-gray-700 flex-1">
            Are you sure cancel your
            <span className="text-green-600"> {applicaiton?.packageName} </span>
            booking?
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              onClick={() => {
                handleCancel(applicaiton);
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
    const { data } = await axiosSecure.delete(`/application/${booking?._id}`);
    if (data.deletedCount > 0) {
      refetch();
      toast.success(`${booking?.name}'s application has been deleted`);
    }
  };

  //accept
  const handleAccept = async (application) => {
    try {
      console.log(application);
      const { data } = await axiosSecure.patch(
        `/application-update/${application?._id}`
      );
      console.log(data);
      if (data.userUpdateResult.modifiedCount > 0) {
        toast.success(`${application?.name}'s application has been accepted`);
        handleCancel(application);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to accept the application.");
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
    >
      <div className="w-full overflow-x-auto max-w-7xl mx-auto p-4">
        <div className="animate__animated animate__bounceInDown">
          <SectionTitleForMain
            heading={"Manage Candidates"}
            subHeading={"Manage candidates effectively for tour guide roles."}
          ></SectionTitleForMain>
        </div>
        {/* data per page  */}
        <div className="mb-4 flex animate__animated animate__bounceInRight flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                <th className="font-semibold text-[17px] p-3 text-left text-[#F5A481]">
                  Users Photo
                </th>
                <th className="p-3 text-left font-semibold text-[17px] text-[#F5A481]">
                  Users Name
                </th>
                <th className="p-3 text-left font-semibold text-[17px] text-[#F5A481]">
                  Users Email
                </th>
                <th className="p-3 text-left font-semibold text-[17px] text-[#F5A481]">
                  Curriculm Vita
                </th>
                <th className="p-3 text-left font-semibold text-[17px] text-[#F5A481]">
                  Why wants to be Guide
                </th>
                <th className="p-3 text-left font-semibold text-[17px] text-[#F5A481]">
                  Users Role
                </th>
                <th className="p-3 text-left font-semibold text-[17px] text-[#F5A481]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedallApplications.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="pl-5 py-2">
                    <img
                      className="rounded-full h-12 w-12"
                      src={booking?.photo}
                      alt=""
                    />
                  </td>
                  <td className="p-3">{booking?.name || "N/A"}</td>
                  <td className="p-3">{booking?.email}</td>
                  <td className="p-3">
                    <Link
                      className="text-blue-600 underline"
                      to={`${booking?.cvLink}`}
                    >
                      CV Link
                    </Link>
                  </td>
                  <td className="p-3">
                    {booking._id === expandedRow
                      ? booking?.whyTourGuide
                      : `${booking?.whyTourGuide?.slice(0, 25)}...`}
                    {booking?.whyTourGuide?.length > 25 &&
                      booking._id !== expandedRow && (
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() => handleOpenModal(booking._id)}
                        >
                          ...more
                        </button>
                      )}
                  </td>
                  <td className="p-3">{booking?.userType}</td>
                  <td className="p-3 flex items-center gap-2">
                    <>
                      <button
                        onClick={() => handleAccept(booking)}
                        className="btn bg-green-600 px-6 text-white hover:bg-blue-500"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleReject(booking)}
                        className="btn bg-red-500 text-white hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!paginatedallApplications?.length && (
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
            {Math.min(currentPage * pageSize, sortedallApplications.length)} of{" "}
            {sortedallApplications.length} results
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

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-lg font-semibold mb-4">
                Why wants to be Guide
              </h3>
              <p>
                {
                  allApplications.find((booking) => booking._id === expandedRow)
                    ?.whyTourGuide
                }
              </p>
              <button
                onClick={handleCloseModal}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCandidates;
