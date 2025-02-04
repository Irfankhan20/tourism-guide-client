import { Navigate } from "react-router-dom";

import useUserByEmail from "../../hooks/useUserByEmail";

const Redirect = () => {
  const [aUser] = useUserByEmail();

  return aUser?.userType === "admin" ? (
    <Navigate to="/dashboard/admin" />
  ) : (
    <Navigate to="/dashboard/profile" />
  );
};

export default Redirect;
