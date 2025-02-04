import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://unique-travel-server.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
