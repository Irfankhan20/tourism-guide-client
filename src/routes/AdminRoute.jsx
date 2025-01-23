import { useContext } from "react";

import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../provider/AuthProvider";

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading } = useContext(AuthContext);
  if (loading || isAdminLoading) {
    return (
      <div className=" h-screen justify-center flex">
        <span className="self-center text-9xl text-primary loading loading-bars loading-lg lg:w-14"></span>
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" replace></Navigate>;
};

export default AdminRoute;
