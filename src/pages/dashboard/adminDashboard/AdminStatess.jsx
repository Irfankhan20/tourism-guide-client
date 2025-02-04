import useAdminStats from "../../../hooks/useAdminStats";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdManageHistory, MdOutlineTour } from "react-icons/md";
import { LuPackageSearch } from "react-icons/lu";
import { FaUsersGear } from "react-icons/fa6";
import profileBg from "../../../assets/profileBg.jpg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SectionTitleForMain from "../../../sharedComponents/sectionTitleForMain/SectionTitleForMain";

const AdminStatess = () => {
  const [adminStats] = useAdminStats();

  const data = [
    { name: "Tour Guides", value: adminStats?.totalTourGuides || 0 },
    { name: "Packages", value: adminStats?.totalPackages || 0 },
    { name: "Clients", value: adminStats?.totalTourists || 0 },
    { name: "Stories", value: adminStats?.totalStories || 0 },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${profileBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="lg:pb-20 lg:pt-8"
    >
      <div className="text-center animate__animated animate__bounceInDown">
        <SectionTitleForMain
          heading={`Welcome, To Admin States!`}
          subHeading={"Below, you can view all information."}
        ></SectionTitleForMain>
      </div>
      <div className="w-11/12 mx-auto mt-12 mb-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:gap-10 gap-5">
        {/* total payment  */}
        <div className="border border-[#07332F] shadow-lg rounded-lg p-4 flex items-center lg:gap-10 justify-center">
          <div>
            <div className="stat-title">Total Payment</div>
            <div className="stat-value">{adminStats?.totalPayment}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>
          <div className=" text-secondary text-3xl">
            <RiSecurePaymentLine />
          </div>
        </div>

        {/* total guide  */}
        <div className="border border-[#07332F] shadow-lg rounded-lg p-4 flex items-center lg:gap-10 justify-center">
          <div>
            <div className="stat-title">Total Tour Guides</div>
            <div className="stat-value">{adminStats?.totalTourGuides}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
          <div className=" text-secondary text-3xl">
            <MdOutlineTour />
          </div>
        </div>

        {/* total package  */}
        <div className="border border-[#07332F] shadow-lg rounded-lg p-4 flex items-center lg:gap-10 justify-center">
          <div>
            <div className="stat-title">Total Packages</div>
            <div className="stat-value">{adminStats?.totalPackages}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
          <div className=" text-secondary text-3xl">
            <LuPackageSearch />
          </div>
        </div>

        {/* total clients  */}
        <div className="border border-[#07332F] shadow-lg rounded-lg p-4 flex items-center lg:gap-10 justify-center">
          <div>
            <div className="stat-title">Total Clients</div>
            <div className="stat-value">{adminStats?.totalTourists}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
          <div className=" text-secondary text-3xl">
            <FaUsersGear />
          </div>
        </div>

        {/* total stories  */}
        <div className="border border-[#07332F] shadow-lg rounded-lg p-4 flex items-center lg:gap-10 justify-center">
          <div>
            <div className="stat-title">Total Stories</div>
            <div className="stat-value">{adminStats?.totalStories}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
          <div className="text-secondary text-3xl">
            <MdManageHistory />
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 shadow-md rounded-lg md:w-11/12 mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">Statistics Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4A90E2" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStatess;
