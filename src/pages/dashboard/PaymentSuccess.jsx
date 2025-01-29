import { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";
import SectionTitleForMain from "../../sharedComponents/sectionTitleForMain/SectionTitleForMain";
import Button from "../../sharedComponents/button/Button";
import { Link } from "react-router-dom";
import animationData from "../../assets/paymentSuccess.json";
import Lottie from "lottie-react";

const PaymentSuccess = () => {
  const [confettiActive, setConfettiActive] = useState(true);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="lg:mb-20">
      {confettiActive && <Confetti></Confetti>}

      {/* title part  */}
      <div className="animate__animated animate__bounceInDown">
        <SectionTitleForMain
          heading={"Payment Successfull"}
          subHeading={"Enjoy your life with us."}
        ></SectionTitleForMain>
      </div>

      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        ref={cardRef}
        className="w-8/12 mx-auto border relative overflow-hidden border-gray-200 rounded-lg p-[25px] cursor-pointer shadow-2xl"
      >
        <h2 className="text-[1.5rem] font-bold text-[#DB06F9]">
          Payment Successful! 🎉
        </h2>
        <p className="text-gray-600 text-[1rem] mt-2">
          Thank you for booking your tour with us! Your payment has been
          successfully processed.
        </p>
        <p className="text-gray-600 text-[1rem] mt-2">
          ✅ Tour Confirmed: Your booking is now secured.
        </p>
        <p className="text-gray-600 text-[1rem] mt-2">
          📩 Confirmation Email Sent: Check your email for your tour details and
          payment receipt.
        </p>
        <p className="text-gray-600 text-[1rem] mt-2">
          🧳 Get Ready for Your Journey! Our guide will contact you soon with
          further instructions.
        </p>
        <p className="text-gray-600 text-[1rem] mt-2">
          If you have any questions or need assistance, feel free to reach out
          to our support team.
        </p>
        <p className="text-gray-600 text-[1rem] mt-2">
          🌍 We look forward to making your trip unforgettable! ✨
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

export default PaymentSuccess;
