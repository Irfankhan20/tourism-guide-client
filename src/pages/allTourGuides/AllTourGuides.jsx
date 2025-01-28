import { useEffect, useState } from "react";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitleForMain from "../../sharedComponents/sectionTitleForMain/SectionTitleForMain";

const AllTourGuides = () => {
  // fetch tour guides data
  const [guides, setGuides] = useState([]);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("allGuides").then((res) => setGuides(res.data));
  }, [axiosPublic]);
  return (
    <div className="w-10/12 mx-auto md:mt-32 mt-28 md:mb-24 mb-20">
      {/* Title and Subtitle */}
      <div className="">
        <SectionTitleForMain
          heading={"Explore All Tour Guides"}
          subHeading={
            "Discover amazing experiences by travel with us from around the world"
          }
        ></SectionTitleForMain>
      </div>
      <div className="grid md:grid-cols-4 gap-7 md:gap-16">
        {guides.map((guide) => (
          <div
            key={guide._id}
            className="w-full shadow-md hover:shadow-none z-0 bg-white rounded-md relative cursor-pointer group before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] before:w-full before:h-full before:rounded-md before:bg-[#c0e6ed] before:transition-all before:duration-300 before:z-[-1] after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] after:rounded-md after:bg-[#d4f2f7] after:z-[-2] after:transition-all after:duration-500"
          >
            {/*  image  */}
            <img
              src={guide?.photo}
              alt="animated_card"
              className="w-full h-[250px] rounded-t-md object-cover"
            />

            {/*  contents  */}
            <div className="p-[18px] pt-2.5 bg-white rounded-b-md">
              <h3 className="text-[1.5rem] font-bold text-[#0FABCA]">
                Name: {guide?.name}
              </h3>
              <h3 className="text-lg font-bold text-[#0FABCA]">
                speciality: {guide?.specialty}
              </h3>
              <p className="text-[1rem] font-[600] text-gray-600">
                contact: {guide?.contact}
              </p>

              <button className="w-full py-2 px-4 hover:bg-[#c0e6ed] hover:text-black text-[1rem] transition-all duration-300 bg-[#0FABCA] text-white rounded-md mt-5">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTourGuides;
