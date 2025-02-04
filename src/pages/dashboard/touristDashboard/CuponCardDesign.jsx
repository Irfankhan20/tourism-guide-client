import { useState } from "react";
import { ClipboardCopy, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../sharedComponents/button/Button";

export default function CouponShow({ couponCode, discount, expiryDate }) {
  const isExpired = new Date(expiryDate) < new Date();
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl border p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Special Discount!
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          Get {discount}% off on your booked
        </p>
        <div className="bg-gray-200 text-xl font-semibold py-3 px-6 rounded-lg mb-4 flex justify-between items-center">
          <span>{couponCode}</span>
          <button onClick={handleCopy} className="focus:outline-none">
            {copied ? (
              <CheckCircle className="text-green-500 w-6 h-6" />
            ) : (
              <ClipboardCopy className="text-gray-700 w-6 h-6" />
            )}
          </button>
        </div>
        <p
          className={`text-sm font-semibold ${
            isExpired ? " text-red-500" : " text-green-500"
          }`}
        >
          Expires on: {expiryDate}
        </p>
        <Link to="/dashboard/myBookings">
          <Button isExpired={isExpired} btnText={"Apply Coupon"}></Button>
        </Link>
      </div>
    </div>
  );
}
