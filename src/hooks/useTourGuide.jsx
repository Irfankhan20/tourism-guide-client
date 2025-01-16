import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useTourGuide = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isTourGuide = [], isPending: isAdminLoading } = useQuery({
    queryKey: ["isTourGuide", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/tourGuide/${user?.email}`);
      //   console.log(res.data);
      return res.data?.tourGuide;
    },
  });

  return [isTourGuide, isAdminLoading];
};

export default useTourGuide;
