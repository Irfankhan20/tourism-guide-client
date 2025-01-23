import { useQuery } from "@tanstack/react-query";

import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUserByEmail = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: aUser = [],
    isPending: aUserLoading,
    refetch,
  } = useQuery({
    queryKey: ["aUser", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });
  return [aUser, aUserLoading, refetch];
};

export default useUserByEmail;
