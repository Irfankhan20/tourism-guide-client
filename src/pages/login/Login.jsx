import loginBg from "../../assets/login.jpg";
import animationData from "../../assets/login.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Lottie from "lottie-react";
import SocialLogin from "./SocialLogin";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser, setEmailForForgot } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signInUser(email, password)
      .then(() => {
        setError("");
        toast.success("Login Successful!");
        navigate(location.state ? location.state : "/");
      })
      .catch(() => {
        setError("Invalid Username or Password..!");
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8"
    >
      {/* Left Section */}
      <div className="lg:w-1/2 mx-auto">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Right Section */}
      <div className="w-full mb-10 md:mb-20 lg:mb-0 lg:w-1/3 mx-auto backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 bg-white/70">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
          Welcome to Elite Explore!
        </h2>

        <form onSubmit={handleLogin} className="mt-4">
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmailForForgot(e.target.value)}
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A481]"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A481]"
              required
            />
            <span className="relative w-[30px] text-xl flex justify-end -top-8 left-[90%] ">
              {showPassword ? (
                <FaEye
                  className="hover:cursor-pointer"
                  onClick={handleShowPassword}
                ></FaEye>
              ) : (
                <FaEyeSlash
                  className="hover:cursor-pointer"
                  onClick={handleShowPassword}
                ></FaEyeSlash>
              )}
            </span>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between mb-3 text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
              <span className="ml-2">Remember Me</span>
            </label>
            <Link
              to="/forgotPassword"
              className="hover:underline text-[#F5A481]"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            className="w-full bg-[#F5A481] text-white py-2 px-4 rounded-lg  transition duration-300"
          >
            Sign In
          </button>
          {error && <p className="mt-2 text-red-600 text-center">{error}</p>}
        </form>

        <div className="divider">or</div>

        {/* Social Login Buttons */}
        <div className="flex justify-center items-center gap-2">
          <SocialLogin />
          <button>
            <img
              src="https://i.ibb.co/CWkQgF5/icons8-github-48.png"
              alt="GitHub"
              className="w-10 h-10 hover:scale-105"
            />
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="mt-3 text-sm text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#F5A481] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
