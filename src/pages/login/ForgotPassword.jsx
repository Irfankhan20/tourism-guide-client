import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { resetPassword, emailForForgot } = useContext(AuthContext);
  console.log(emailForForgot);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);
    resetPassword(emailForForgot || email)
      .then(() => {
        setMessage(
          `A password reset email has been sent to your ${
            emailForForgot || email
          }.`
        );
        toast.success(
          ` check your ${
            emailForForgot || email
          } address.Reset Password. Then go to login page`
        );
        setError("");
      })
      .catch(() => {
        setMessage("");
        setError(
          "Failed to send reset email. Please check your email address."
        );
        toast.error(
          "Failed to send reset email. Please check your email address."
        );
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[44vh] py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="my-4 px-4 md:px-0">
          <label className="font-medium text-lg">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={emailForForgot || ""}
            placeholder="Enter Your Email"
            className="input input-bordered input-info w-full"
            required
          />
        </div>
        {/* condition  */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="sameAsShipping"
            className="form-checkbox"
            required
          />
          <label htmlFor="sameAsShipping" className="text-md text-gray-600">
            Are you sure this is your email address?
          </label>
        </div>
        <div className="px-4 md:px-0">
          <button
            type="submit"
            className="btn w-full shadow-lg shadow-[#6a9995] hover:shadow-[#eeab8f] mt-4 border border-[#07332F] relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-mono  tracking-tighter text-[#07332F] bg-[#fdc4ac] rounded-lg group"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#07332F] rounded-full group-hover:w-full group-hover:h-full"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 "></span>
            <span className="relative text-text group-hover:text-white">
              Reset Password
            </span>
          </button>
        </div>

        <Link to="/login">
          <button className="btn w-full shadow-lg shadow-[#6a9995] hover:shadow-[#eeab8f] mt-10 border border-[#07332F] relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-mono  tracking-tighter text-[#07332F] bg-[#fdc4ac] rounded-lg group">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#07332F] rounded-full group-hover:w-full group-hover:h-full"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 "></span>
            <span className="relative text-text group-hover:text-white">
              Go To Login Page
            </span>
          </button>
        </Link>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
