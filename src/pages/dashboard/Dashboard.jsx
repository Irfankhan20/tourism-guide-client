import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import ResponsiveSidebar from "./ResponsiveSidebar";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="flex gap-4 mt-[75px]">
      <div>
        <ResponsiveSidebar></ResponsiveSidebar>
      </div>
      <div className="mt-8">ami</div>
    </div>
  );
};

export default Dashboard;
