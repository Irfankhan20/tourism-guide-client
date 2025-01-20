import ResponsiveSidebar from "./ResponsiveSidebar";

import { Outlet } from "react-router-dom";
const Dashboard = () => {
  // console.log(isAdmin, isTourGuide);

  // console.log(user);
  return (
    <div className="flex gap-4 mt-[75px]">
      <div>
        <ResponsiveSidebar></ResponsiveSidebar>
      </div>
      <div className=" w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
