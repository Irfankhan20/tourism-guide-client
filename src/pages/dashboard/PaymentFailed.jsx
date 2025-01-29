import { useRef, useState } from "react";
import animationData from "../../assets/paymentFailed.json";
import { Link } from "react-router-dom";
import Button from "../../sharedComponents/button/Button";
import Lottie from "lottie-react";

const PaymentFailed = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };
  return (
    <div className="lg:mb-20 lg:mt-24">
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        ref={cardRef}
        className="w-8/12 mx-auto border relative overflow-hidden border-gray-200 rounded-lg p-[25px] cursor-pointer shadow-2xl"
      >
        <h2 className="text-[1.5rem] font-bold text-[#DB06F9]">
          Payment Failed ❌
        </h2>
        <p className="text-gray-600 text-[1rem] mt-2">
          Oops! Something went wrong, and your payment was not processed.
        </p>
        <p className="text-gray-600 text-[1rem] mt-2">
          ⚠️ Transaction Unsuccessful: Your booking has not been confirmed.
        </p>
        <p className="text-gray-600 text-[1rem] mt-2">
          📩 Check Your Details: Please verify your payment information and try
          again.
        </p>
        <p className="text-gray-600 text-[1rem] mt-2">
          🔄 Try Again: You can attempt the payment again or use a different
          payment method.
        </p>
        <p className="text-gray-600 text-[1rem] mt-2">
          If the issue persists, please contact our support team for assistance.
        </p>
        <p className="text-gray-600 text-[1rem] mt-2">
          🌍 We’re here to help you book your dream tour! ✨
        </p>

        <Link to="/dashboard/myBookings">
          <Button btnText={"Go To Your Bookings"}></Button>
        </Link>

        <div className="w-[200px] mt-3 float-right">
          <Lottie animationData={animationData} loop={true} />
        </div>

        {isHovering && (
          <div
            className="absolute inset-0 pointer-events-none blur-[50px]"
            style={{
              background: `radial-gradient(circle 50px at ${mousePosition.x}px ${mousePosition.y}px, #DB06F9, transparent)`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentFailed;
