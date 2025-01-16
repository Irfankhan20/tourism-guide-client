import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin = [], isPending: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${user?.email}`);
      console.log(res.data);
      return res.data?.admin;
    },
  });

  const { data: isTourGuide = [], isPending: isTourGuideLoading } = useQuery({
    queryKey: ["isTourGuide", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/tourGuide/${user?.email}`);
      //   console.log(res.data);
      return res.data?.tourGuide;
    },
  });

  return [isAdmin, isTourGuide, isAdminLoading, isTourGuideLoading];
};

export default useAdmin;
