import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllCupons = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: cupons = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["cupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allCupons");
      return res.data;
    },
  });
  return [cupons, loading, refetch];
};

export default useAllCupons;
