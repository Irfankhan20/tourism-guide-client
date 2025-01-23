import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";

const useAdminStats = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: adminStats = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  return [adminStats, loading, refetch];
};

export default useAdminStats;
