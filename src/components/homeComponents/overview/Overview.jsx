import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../sharedComponents/button/Button";
import SectionTitleForMain from "../../../sharedComponents/sectionTitleForMain/SectionTitleForMain";

const Overview = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ scale: 1.2 });
  }, [controls]);
  return (
    <div className="px-5 md:px-0 w-full lg:mt-24">
      <div className="container mx-auto lg:flex lg:flex-row items-center">
        <div className="lg:w-1/2 w-full">
          <div className="">
            <motion.img
              animate={{ y: [100, 50, 100] }}
              transition={{ duration: 10, repeat: Infinity }}
              src="https://i.ibb.co.com/TvPh7jx/bandarban1.jpg"
              className="md:max-w-[350px] max-w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-[#07332F] shadow-2xl"
            />
            <motion.img
              animate={{ x: [100, 150, 100] }}
              transition={{ duration: 10, repeat: Infinity }}
              src="https://i.ibb.co.com/ssFXrn4/cox1.jpg"
              className="md:max-w-[350px]  max-w-52   rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-[#07332F] shadow-2xl"
            />
          </div>
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="my-8 text-center lg:my-0">
            <SectionTitleForMain
              heading={"Overview"}
              subHeading={"Explore Us For Travel With Us"}
            ></SectionTitleForMain>
            <p className="text-gray-700 mb-4 md:">
              Our travel agency website is your ultimate companion for exploring
              the world effortlessly. We provide personalized tourist guides and
              exclusive package booking systems tailored to enhance your travel
              experience. With dedicated dashboards for admins, guides, and
              tourists, we ensure seamless communication, efficient management,
              and user-friendly navigation. From planning to exploration, our
              platform offers trusted services to make your journeys memorable
              and hassle-free.
            </p>
            <Link to="/aboutus">
              <Button btnText={"Explore Now"}></Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
