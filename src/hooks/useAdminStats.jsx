import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAdminStats = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: adminStats = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/admin-stats");
      return res.data;
    },
  });
  return [adminStats, loading, refetch];
};

export default useAdminStats;
