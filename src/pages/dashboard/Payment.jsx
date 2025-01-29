import { useParams } from "react-router-dom";
// import { AiOutlinePlus } from "react-icons/ai";
import paymentImg from "../../assets/Payment.png";
import SectionTitleForMain from "../../sharedComponents/sectionTitleForMain/SectionTitleForMain";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAllCupons from "../../hooks/useAllCupons";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const [bookingData, setbookingData] = useState({});
  console.log(bookingData);
  useEffect(() => {
    axiosSecure.get(`/booking/${id}`).then((res) => {
      setbookingData(res.data);
    });
  }, [axiosSecure, id]);

  // console.log(bookingData?._id);
  const [cupons] = useAllCupons();
  console.log(bookingData, cupons);
  // state for form
  const [countryCode, setCountryCode] = useState("+880");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAdress] = useState("");
  const [city, setCity] = useState("");

  const [paymentType, setPaymentType] = useState("full");
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [usedCoupons, setUsedCoupons] = useState(new Set());
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleApplyDiscount = () => {
    if (discountApplied) {
      toast.error(
        "You have already applied a discount code. You can use only one coupon code per day.Thank you,sir/mam!!"
      );
      setDiscountCode("");
      return;
    }

    const matchedCoupon = cupons.find(
      (coupon) => coupon.couponText === discountCode
    );

    if (!matchedCoupon) {
      toast.error("Invalid discount code. Please try again.Thank you,sir/mam!");
      setDiscountCode("");
      return;
    }

    if (usedCoupons.has(matchedCoupon.couponText)) {
      toast.error(
        "You have already applied the discount code.Thank you,sir/mam!"
      );
      setDiscountCode("");
      return;
    }

    const currentDate = new Date();
    const expiryDate = new Date(matchedCoupon.expireDate);

    if (expiryDate < currentDate) {
      toast.error("Your code is expired now. Thank you,sir/mam!");
      setDiscountCode("");
      return;
    }

    const discount = (bookingData?.price * matchedCoupon.discountPercent) / 100;
    setDiscountAmount(discount);
    setDiscountApplied(true);
    setUsedCoupons((prev) => new Set(prev).add(matchedCoupon.couponText));
    toast.success(
      `Discount code applied successfully. You got ${matchedCoupon.discountPercent}% discount.Thank you,sir/mam!`
    );
  };

  const totalCost = (bookingData?.price - discountAmount).toFixed(2);
  const amountToPay =
    paymentType === "full" ? totalCost : (totalCost / 2).toFixed(2);

  const paymentFormSubmit = (e) => {
    e.preventDefault();
    const email = bookingData?.user?.email;
    const phone = `${countryCode}${phoneNumber}`;
    const name = bookingData?.user?.name;
    const packageName = bookingData?.packageName;
    const bookId = bookingData?._id;
    const tourDate = bookingData?.tourDate;

    const totalAmount = parseInt(totalCost);
    const payAmount = parseInt(amountToPay);

    const paymentInfo = {
      bookId,
      tourDate,
      email,
      name,
      phone,
      address,
      city,
      payAmount,
      packageName,
      totalAmount,
    };
    console.log(paymentInfo);

    axiosSecure.post("/create-payment", paymentInfo).then((res) => {
      console.log(res);
      const redirectUrl = res.data.paymentUrl;
      if (redirectUrl) {
        toast.success("Welcome sir/mam, to Payment Method Form");
        window.location.replace(redirectUrl);
      }
    });
  };
  return (
    <div className="w-10/12 mx-auto md:mt-10 md:mb-24 mb-20">
      <SectionTitleForMain
        heading={"Payment Form"}
        subHeading={"Join with us and fillup your travelling dream"}
      ></SectionTitleForMain>
      <div className="md:pt-3 flex flex-col gap-8 lg:gap-0 lg:flex-row">
        {/* Left Column - Order Summary */}
        <div className="bg-gray-50 rounded-md shadow-xl p-4 md:p-8  flex-1">
          <img className="" src={paymentImg} alt="" />
          {/* Order Summary */}
          <div className="">
            <h2 className="text-[1.2rem] text-gray-700 font-semibold mb-2 mt-5">
              Your Booking
            </h2>

            {/* Booking Details */}
            <div className="border border-gray-200 rounded-md">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                <div className="flex-1">
                  <h3 className="font-medium">{bookingData?.packageName}</h3>
                  <div className="flex items-center gap-[30px] mt-2">
                    <p className="text-sm text-gray-500">
                      TourGuide:{" "}
                      <b className="text-gray-800">
                        {bookingData?.guide?.name}
                      </b>
                    </p>
                    <p className="text-sm text-gray-500">
                      TourDate:{" "}
                      <b className="text-gray-800">
                        {new Date(bookingData?.tourDate).toLocaleDateString()}
                      </b>
                    </p>
                  </div>
                </div>
                <span className="font-medium">{bookingData?.price}৳</span>
              </div>
            </div>

            {/* Discount Field */}
            <div className="mt-6">
              <h3 className="font-medium mb-2 text-[1rem] text-gray-800">
                Discount Code
              </h3>
              <div className="flex gap-2 relative">
                <img
                  alt="discount/png"
                  src="https://i.ibb.co/r7rF8xK/ticket-discount.png"
                  className="w-[25px] absolute transform top-[50%] translate-y-[-50%] left-2"
                />
                <input
                  type="text"
                  placeholder="Coupon code..."
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="border w-full border-gray-200 bg-transparent outline-none focus:border-[#F5A481] rounded pl-10 pr-3 py-2"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  className="absolute top-[50%] transform translate-y-[-50%] right-5 text-[0.9rem] text-[#0FABCA]"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Total Amount Count */}
            <div className="mt-8 space-y-2 border-t border-gray-200 pt-6">
              {/* Initial Cost */}
              <div className="flex justify-between">
                <span className="text-[1rem] text-gray-500">Subtotal</span>
                <span className="text-[1rem] font-medium text-gray-800">
                  {bookingData?.price}৳
                </span>
              </div>
              {/* Discount Money */}
              <div className="flex justify-between pb-3">
                <span className="text-[1rem] text-gray-500">Discount</span>
                <span className="text-[1rem] font-medium text-gray-800">
                  {discountAmount.toFixed(2)}৳
                </span>
              </div>
              {/* Total Cost */}
              <div className="flex justify-between border-t border-gray-200 pt-5 font-medium">
                <span>Total</span>
                <span className="text-[1rem] font-medium text-gray-800">
                  {totalCost}৳
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Checkout Form */}
        <div className="flex-1 shadow-xl lg:px-8">
          <form onSubmit={paymentFormSubmit} className="space-y-6">
            {/* email  */}
            <div>
              <label
                htmlFor="email"
                className="text-[1rem] font-medium text-gray-800 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue={bookingData?.user?.email}
                className="w-full border rounded px-3 py-2 border-gray-200 outline-none focus:border-[#F5A481] mt-0.5"
              />
            </div>

            {/* phone  */}
            <div>
              <label
                htmlFor="phone"
                className="text-[1rem] font-medium text-gray-800 mb-1"
              >
                Phone number
              </label>
              <div className="flex gap-2">
                <select
                  className="border rounded px-3 py-2 border-gray-200 outline-none focus:border-[#F5A481] mt-0.5 w-[130px]"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="bd">🇧🇩 +880</option>
                </select>
                <input
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="tel"
                  id="phone"
                  placeholder="(201) 830-8210"
                  className="w-full border rounded px-3 py-2 border-gray-200 outline-none focus:border-[#F5A481] mt-0.5"
                />
              </div>
            </div>

            {/* payment method  */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[1rem] font-medium text-gray-800">
                  Payment method
                </label>
              </div>
              <div className="flex flex-col lg:flex-row w-full gap-4">
                {/* payment full  */}
                <label className="flex-1 flex items-center justify-between gap-2 border-gray-200 border rounded-lg p-4">
                  <div>
                    <div>
                      <input
                        type="radio"
                        name="payment"
                        value="full"
                        className="form-radio"
                        checked={paymentType === "full"}
                        onChange={() => setPaymentType("full")}
                      />
                      <span className="pl-3">Payment Full</span>
                    </div>
                  </div>
                  <FaBangladeshiTakaSign></FaBangladeshiTakaSign>
                </label>

                {/* payment half  */}
                <label className="flex-1 flex items-center justify-between border-gray-200 gap-2 border rounded-lg p-4">
                  <div>
                    <div>
                      <input
                        type="radio"
                        name="payment"
                        value="half"
                        className="form-radio"
                        checked={paymentType === "half"}
                        onChange={() => setPaymentType("half")}
                      />
                      <span className="pl-3">Payment Half</span>
                    </div>
                  </div>
                  <FaBangladeshiTakaSign></FaBangladeshiTakaSign>
                </label>
              </div>
              {paymentType === "half" && (
                <p className="text-green-500">
                  The remaining amount should be paid on the day of travel
                </p>
              )}
            </div>

            {/* card holder name  */}
            <div>
              <label
                htmlFor="cardHolder"
                className="text-[1rem] font-medium text-gray-800 mb-1"
              >
                Card holder name
              </label>
              <input
                type="text"
                id="cardHolder"
                defaultValue={bookingData?.user?.name}
                className="w-full border rounded px-3 py-2 border-gray-200 outline-none focus:border-[#F5A481] mt-0.5"
              />
            </div>

            {/* billing address  */}
            <div>
              <label
                htmlFor="billingAddress"
                className="text-[1rem] font-medium text-gray-800 mb-1"
              >
                Billing address
              </label>
              <select
                required
                value={address}
                onChange={(e) => setAdress(e.target.value)}
                id="billingAddress"
                className="w-full border rounded px-3 py-2 border-gray-200 outline-none focus:border-[#F5A481] mt-0.5"
              >
                <option>United States</option>
                <option>United Kingdom</option>
                <option>India</option>
                <option>Bangladesh</option>
                <option>Australia</option>
                <option>Canada</option>
                <option>Germany</option>
                <option>France</option>
                <option>Japan</option>
                <option>South Africa</option>
              </select>
            </div>

            {/* city  */}
            <div>
              <label
                htmlFor="city"
                className="text-[1rem] font-medium text-gray-800 mb-1"
              >
                City
              </label>
              <input
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                id="city"
                placeholder="Ex. New York"
                className="w-full border rounded px-3 py-2 border-gray-200 outline-none focus:border-[#F5A481] mt-0.5"
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
              <label htmlFor="sameAsShipping" className="text-sm text-gray-600">
                Billing address is same as shipping
              </label>
            </div>

            {/* submit button  */}
            <button
              type="submit"
              className="btn w-full shadow-lg shadow-[#6a9995] hover:shadow-[#eeab8f] mt-10 border border-[#07332F] relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-mono  tracking-tighter text-[#07332F] bg-[#fdc4ac] rounded-lg group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#07332F] rounded-full group-hover:w-full group-hover:h-full"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 "></span>
              <span className="relative text-text group-hover:text-white">
                Pay {amountToPay}৳
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
