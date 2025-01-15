import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTouristStories = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: stories = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/stories");
      return res.data;
    },
  });
  return [stories, loading, refetch];
};

export default useTouristStories;
