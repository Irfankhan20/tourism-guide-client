import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllApplications = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allApplications = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const res = await axiosPublic.get("/applications");
      return res.data;
    },
  });
  return [allApplications, loading, refetch];
};

export default useAllApplications;
