import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://tourism-website-server-livid.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
