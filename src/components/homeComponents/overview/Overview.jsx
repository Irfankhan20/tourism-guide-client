import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";

const Overview = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ scale: 1.2 });
  }, [controls]);
  return (
    <div className=" md:my-20 w-full mt-32 mb-32">
      <div className="container mx-auto lg:flex lg:flex-row items-center">
        <div className="md:w-1/2">
          <div className="">
            <motion.img
              animate={{ y: [100, 50, 100] }}
              transition={{ duration: 10, repeat: Infinity }}
              src="https://i.ibb.co.com/TvPh7jx/bandarban1.jpg"
              className="max-w-sm rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-[#07332F] shadow-2xl"
            />
            <motion.img
              animate={{ x: [100, 150, 100] }}
              transition={{ duration: 10, repeat: Infinity }}
              src="https://i.ibb.co.com/ssFXrn4/cox1.jpg"
              className="max-w-sm rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-[#07332F] shadow-2xl"
            />
          </div>
        </div>
        <div className="md:w-1/2 ">
          <div className="my-8 lg:my-0">
            <h2 className=" text-2xl font-bold md:text-[40px] md:mb-6 mb-4">
              Overview
            </h2>
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
            <button
              className="px-8 text-lg font-bold animate__animated animate__fadeInLeft mt-3 md:mt-5 bg-[#F5A481] py-3 relative shadow-lg before:absolute 
before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent 
hover:before:w-full hover:before:h-full hover:before:border-[#07332F] hover:before:transition-all hover:before:duration-500 
after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-[#07332F] 
after:absolute after:bottom-0 after:right-0 after:w-0 
after:h-0 hover:after:w-full hover:after:h-full hover:after:transition-all hover:after:duration-500"
            >
              {" "}
              Explore More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
