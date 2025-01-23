import { useContext } from "react";

import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useStoriesByEmail = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: stories = [],
    isPending: storiesLoading,
    refetch,
  } = useQuery({
    queryKey: ["stories"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories/${user?.email}`);
      return res.data;
    },
  });
  return [stories, storiesLoading, refetch];
};

export default useStoriesByEmail;
