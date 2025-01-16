import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useUserByEmail = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const {
    data: aUser = [],
    isPending: aUserLoading,
    refetch,
  } = useQuery({
    queryKey: ["aUser"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/${user?.email}`);
      return res.data;
    },
  });
  return [aUser, aUserLoading, refetch];
};

export default useUserByEmail;
