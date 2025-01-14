import loginBg from "../../assets/login.jpg";
import animationData from "../../assets/login.json";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import SocialLogin from "./SocialLogin";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signInUser(email, password)
      .then(() => {
        setError("");
        toast.success("Login Successfull!");
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
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8"
    >
      {/* Left Section */}
      <div className="lg:w-1/2 mx-auto">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 mx-auto backdrop-blur-md shadow-lg rounded-xl p-6 sm:p-8 bg-white/70">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Welcome to Elite Explore!
        </h2>

        <form onSubmit={handleLogin} className="mt-6">
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
              <span className="ml-2">Remember Me</span>
            </label>
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition duration-300"
          >
            Sign In
          </button>
          {error && <p className="mt-2 text-red-600 text-center">{error}</p>}
        </form>

        <div className="divider">or</div>

        {/* Social Login Buttons */}
        <div className="flex justify-center items-center gap-3">
          <SocialLogin></SocialLogin>
          <button>
            <img
              src="https://i.ibb.co/CWkQgF5/icons8-github-48.png"
              alt="GitHub"
              className="w-12 h-12 hover:scale-105"
            />
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="mt-4 text-md text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
