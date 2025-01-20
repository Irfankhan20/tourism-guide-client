import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useBookingsByEmail = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const {
    data: bookings = [],
    isPending: bookingsLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookings/${user?.email}`);
      return res.data;
    },
  });
  return [bookings, bookingsLoading, refetch];
};

export default useBookingsByEmail;
