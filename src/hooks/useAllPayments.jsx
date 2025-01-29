import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllPayments = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allPayments = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });
  return [allPayments, loading, refetch];
};

export default useAllPayments;
