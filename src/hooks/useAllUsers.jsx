import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllUsers = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allUsers = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allUsers");
      return res.data;
    },
  });
  return [allUsers, loading, refetch];
};

export default useAllUsers;
