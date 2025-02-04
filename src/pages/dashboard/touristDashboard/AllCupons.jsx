import useAllCupons from "../../../hooks/useAllCupons";
import CouponShow from "./CuponCardDesign";
import profileBg from "../../../assets/profileBg.jpg";
import SectionTitleForMain from "../../../sharedComponents/sectionTitleForMain/SectionTitleForMain";
const AllCupons = () => {
  const [cupons] = useAllCupons();

  return (
    <div
      style={{
        backgroundImage: `url(${profileBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="lg:pb-20 lg:pt-10 lg:min-h-96"
    >
      {/* Title and Subtitle */}
      <div className="text-center  animate__animated animate__bounceInDown">
        <SectionTitleForMain
          heading={"GET COUPON CODE FOR DISCOUNT"}
          subHeading={
            "Get coupon code and take discount for price. Enjoy your life with us."
          }
        ></SectionTitleForMain>
      </div>

      <div className="pb-8">
        <p className="text-green-600 text-lg font-bold underline">Note:</p>
        <p className="text-green-600 font-semibold text-base">
          1) You can use a coupon for one time
        </p>
        <p className="text-green-600 font-semibold text-base">
          2) You can use one coupon for a booking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 w-11/12 mx-auto gap-5">
        {cupons.map((cupon) => (
          <div key={cupon._id}>
            <CouponShow
              couponCode={cupon.couponText}
              discount={cupon.discountPercent}
              expiryDate={cupon.expireDate}
            ></CouponShow>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCupons;
