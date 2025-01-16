import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useStoriesByEmail = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const {
    data: stories = [],
    isPending: storiesLoading,
    refetch,
  } = useQuery({
    queryKey: ["stories"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/stories/${user?.email}`);
      return res.data;
    },
  });
  return [stories, storiesLoading, refetch];
};

export default useStoriesByEmail;
