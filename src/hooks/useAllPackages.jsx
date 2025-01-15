import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllPackages = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allPackages = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["allPackages"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages");
      return res.data;
    },
  });
  return [allPackages, loading, refetch];
};

export default useAllPackages;
