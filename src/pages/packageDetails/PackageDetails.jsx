import { useState } from "react";
import { useLoaderData } from "react-router-dom";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import DetailsImgSlider from "../components/DetailsImgSlider";

const PackageDetails = () => {
  const destination = useLoaderData();
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="w-11/12 mx-auto px-8 pt-36 pb-20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left side - Image */}
        <div>{/* <DetailsImgSlider images={destination?.photo} /> */}</div>

        {/* Right side - Details */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* Title and Price */}
          <div>
            <h1 className="text-[1.6rem] lg:text-4xl font-bold text-gray-800">
              {destination.title}
            </h1>
            <div className="flex items-center gap-2 mt-2 lg:mt-5">
              <span className="text-3xl font-medium">৳{destination.price}</span>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold text-2xl text-gray-700">
                Description:
              </h2>
              <p className="text-lg text-gray-600 mt-6">
                {destination.description}
              </p>
            </div>
          </div>

          {/* Book Now Button */}
          <div>
            <button className="w-full py-3 px-4 rounded-lg bg-[#F5A481] text-white">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div className="mt-16">
        <h3 className="text-4xl text-center font-bold underline mb-8">
          Our Tour Plans
        </h3>
        <div className="space-y-4">
          {destination?.tour_plan?.map((plan, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-md"
            >
              {/* Accordion Header */}
              <button
                className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100 focus:outline-none"
                onClick={() => toggleAccordion(idx)}
              >
                <div>
                  <h2 className="text-lg font-medium text-gray-800">
                    {plan.day} - {plan.title}
                  </h2>
                </div>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openAccordion === idx ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Accordion Content */}
              {openAccordion === idx && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-600 text-base leading-relaxed">
                    {plan.activities}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
