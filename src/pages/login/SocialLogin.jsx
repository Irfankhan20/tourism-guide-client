import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { googleSignIn } = useContext(AuthContext);
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        console.log(res.user);
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
          photoURL: res.user?.photoURL,
          userType: "tourist",
        };
        axiosPublic.post("/user", userInfo).then((res) => {
          console.log(res.data);
          navigate(from, { replace: true });
          if (res.data.insertedId) {
            toast.success("register successful!");
          }
        });
      })
      .catch(() => {});
  };

  return (
    <>
      <button onClick={handleGoogleLogin} className="">
        <img
          className="w-8 h-8 hover:scale-105"
          src="https://i.ibb.co/ftwyb00/Google-G-Logo-svg.png"
          alt=""
        />
      </button>
    </>
  );
};

export default SocialLogin;
