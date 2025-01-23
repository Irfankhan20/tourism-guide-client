import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useBookingsByEmail = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: bookings = [],
    isPending: bookingsLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user?.email}`);
      return res.data;
    },
  });
  return [bookings, bookingsLoading, refetch];
};

export default useBookingsByEmail;
