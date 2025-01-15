import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllStories = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allStories = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["allStories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allStories");
      return res.data;
    },
  });
  return [allStories, loading, refetch];
};

export default useAllStories;
