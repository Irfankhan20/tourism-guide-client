import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import MailBox from "./MailBox";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdOutlineMailOutline, MdAddLocation } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import SectionTitleForMain from "../../sharedComponents/sectionTitleForMain/SectionTitleForMain";
import profileBg from "../../assets/profileBg.jpg";

const AboutUs = () => {
  const controls = useAnimation();
  const average_rating = 4.7;

  useEffect(() => {
    controls.start({ scale: 1.2 });
  }, [controls]);

  // rating star function
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} className="text-yellow-500" />
        ))}
      </>
    );
  };

  return (
    <div className="smt-28 md:mt-32 md:mb-24 mb-20 ">
      <div className="w-full">
        <div className="animate__animated animate__bounceInDown">
          <SectionTitleForMain
            heading={"About Us"}
            subHeading={"Know about us and stay with us."}
          ></SectionTitleForMain>
        </div>
        <div
          style={{
            backgroundImage: `url(${profileBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex w-11/12 animate__animated animate__bounceInRight mx-auto mt-10 h-[400px] justify-between pl-5 "
        >
          {/* address  */}
          <div className="w-1/2  mt-8 ">
            <h2 className="text-3xl font-bold capitalize">
              Unique Travel Agency
            </h2>
            <div className="badge my-2">
              <span className="text-xl ">Average Rating: {average_rating}</span>
              {renderStars(average_rating)}
            </div>
            <p>Corporet office in Dhaka</p>
            <h2 className="flex items-center text-xl gap-2">
              <MdAddLocation />
              <span className="font-bold">Address:</span> Tajmahal Road,
              Mohammadpur, Dhaka 1207
            </h2>
            <p className="flex items-center text-xl gap-2">
              <FaPhone />
              <span className="font-bold">Phone:</span> 01941456477
            </p>
            <h2 className="flex items-center text-xl gap-2">
              <MdOutlineMailOutline />
              <span className="font-bold">Email:</span>
              md.irfankhanpathan75@gmail.com
            </h2>
            <div className="flex justify-center gap-5 mt-10">
              <img
                className="w-[150px] h-[150px]"
                src="https://i.ibb.co.com/2s5t190/shundorban5.jpg"
                alt=""
              />
              <img
                className="w-[150px] h-[150px]"
                src="https://i.ibb.co.com/Y3sTd3K/jaflong4.jpg"
                alt=""
              />
              <img
                className="w-[150px] h-[150px]"
                src="https://i.ibb.co.com/BnGNhqk/ranga4.png"
                alt=""
              />
              <img
                className="w-[150px] h-[150px]"
                src="https://i.ibb.co.com/JcgrGFt/IMG-8821.jpg"
                alt=""
              />
            </div>
          </div>
          {/* map  */}
          <div className=" w-1/2 ">
            <iframe
              className="border-0 h-[100%] w-[100%] left-0 top-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1825.7430282462014!2d90.4243214484263!3d23.7657000356756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c754583dd209%3A0xdd0c5fcc7d2d3836!2sbdCalling%20IT%20Ltd.%20-%20Corporate%20Office!5e0!3m2!1sen!2sbd!4v1716893219075!5m2!1sen!2sbd"
              width="600"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* address section  */}

        {/* support card section  */}
        <h2 className="text-3xl mt-20 font-medium text-center underline pb-10">
          Support Session
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20 xl:max-w-[1440px] mx-auto lg:max-w-[1024px]">
          {/* card 1 */}
          <motion.div
            animate={controls}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="bg-[#FFFFFF] rounded-xl shadow-xl "
          >
            <div className="bg-[#FFFFFF] p-10 rounded-xl shadow-xl">
              <h2 className="font-bold underline">24/7 Travel Assistance</h2>
              <p className="my-6">
                Our dedicated support team is available round the clock to
                assist you with any queries or concerns during your travels.
                Whether it’s a last-minute itinerary change or help navigating
                your destination, we’re just a call away to ensure your journey
                is stress-free.
              </p>
              <button className="px-4 py-2 text-[#F5A481] bg-white font-bold shadow-xl">
                Contact with us
              </button>
            </div>
          </motion.div>

          {/* card 2 */}
          <motion.div
            animate={controls}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="bg-[#FFFFFF] rounded-xl shadow-xl "
          >
            <div className="bg-[#FFFFFF] p-10 rounded-xl shadow-xl">
              <h2 className="font-bold underline">
                Destination Expertise Sessions
              </h2>
              <p className="my-6">
                We organize live sessions and webinars featuring travel experts
                and guides to provide in-depth knowledge about your chosen
                destinations. Learn about the culture, attractions, and best
                travel practices to make the most of your trip.
              </p>
              <button className="px-4 py-2 text-[#F5A481] bg-white font-bold shadow-xl">
                Contact with us
              </button>
            </div>
          </motion.div>

          {/* card 3 */}
          <motion.div
            animate={controls}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="bg-[#FFFFFF] rounded-xl shadow-xl "
          >
            <div className="bg-[#FFFFFF] p-10 rounded-xl shadow-xl">
              <h2 className="font-bold underline">
                Personalized Trip Consultations
              </h2>
              <p className="my-6">
                Need help planning the perfect getaway? Book a one-on-one
                session with our travel advisors who specialize in crafting
                personalized itineraries tailored to your interests, budget, and
                travel goals. Let us design an unforgettable experience for you.
              </p>
              <button className="px-4 py-2 text-[#F5A481] bg-white font-bold shadow-xl">
                Contact with us
              </button>
            </div>
          </motion.div>
        </div>

        {/* poster section  */}
        <div className="mb-20">
          <MailBox></MailBox>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
