import Profile from "../Profile";
import profileBg from "../../../assets/profileBg.jpg";
import useAdminStats from "../../../hooks/useAdminStats";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdManageHistory, MdOutlineTour } from "react-icons/md";
import { LuPackageSearch } from "react-icons/lu";
import { FaUsersGear } from "react-icons/fa6";
const ManageProfile = () => {
  const [adminStats] = useAdminStats();
  return (
    <div
      style={{
        backgroundImage: `url(${profileBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full overflow-x-auto max-w-7xl mx-auto pt-16 p-4">
        {/* stats  */}
        <div className="stats shadow">
          {/* total payment  */}
          <div className="stat">
            <div className="stat-figure text-secondary text-3xl">
              <RiSecurePaymentLine></RiSecurePaymentLine>
            </div>
            <div className="stat-title">Total Payment</div>
            <div className="stat-value">{adminStats?.totalPayment}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          {/* total guide  */}
          <div className="stat">
            <div className="stat-figure text-secondary text-3xl">
              <MdOutlineTour />
            </div>
            <div className="stat-title">Total Tour Guides</div>
            <div className="stat-value">{adminStats?.totalTourGuides}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          {/* total package  */}
          <div className="stat">
            <div className="stat-figure text-secondary text-3xl">
              <LuPackageSearch />
            </div>
            <div className="stat-title">Total Packages</div>
            <div className="stat-value">{adminStats?.totalPackages}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>

          {/* total clients  */}
          <div className="stat">
            <div className="stat-figure text-secondary text-3xl">
              <FaUsersGear />
            </div>
            <div className="stat-title">Total Clients</div>
            <div className="stat-value">{adminStats?.totalTourists}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>

          {/* total stories  */}
          <div className="stat">
            <div className="stat-figure text-secondary text-3xl">
              <MdManageHistory />
            </div>
            <div className="stat-title">Total Stories</div>
            <div className="stat-value">{adminStats?.totalStories}</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>

        {/* profile  */}
        <div className="lg:pt-16">
          <Profile></Profile>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
