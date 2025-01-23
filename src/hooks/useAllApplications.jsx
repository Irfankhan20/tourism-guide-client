import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";

const useAllApplications = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allApplications = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });
  return [allApplications, loading, refetch];
};

export default useAllApplications;
