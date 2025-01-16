import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import ResponsiveSidebar from "./ResponsiveSidebar";
import useAdmin from "../../hooks/useAdmin";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [isAdmin, isTourGuide] = useAdmin();
  console.log(isAdmin, isTourGuide);

  console.log(user);
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
