// icons
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import faq from "../../assets/faq.json";
import Lottie from "lottie-react";
import SectionTitleForMain from "../../sharedComponents/sectionTitleForMain/SectionTitleForMain";

const Accordion = () => {
  const [isAccordingOpen, setIsAccordingOpen] = useState(0);

  // according data
  const accordingData = [
    {
      title: "What are the most popular destinations you offer?",
      description:
        "Our most popular destinations include the Sundarbans, Cox’s Bazar, Sylhet, and Bandarban. For each season, we recommend specific locations to ensure you have the best experience.",
    },
    {
      title: "Do you provide customizable tour packages?",
      description:
        "Yes, we offer customizable packages. You can choose your preferred destinations, activities, and accommodations to create the perfect trip.",
    },
    {
      title: "What is included in the tour package price?",
      description:
        "Most packages include transportation, accommodation, meals, guided tours, and entry fees. Specific details are provided for each package.",
    },
    {
      title: `Are there any group discounts or promotions available?`,
      description: `Yes, we offer group discounts for families and larger groups. Seasonal promotions are also available—check our website or contact us for the latest deals.`,
    },
    {
      title: `What is your cancellation and refund policy?`,
      description: `Cancellations made within the specified period are eligible for a full or partial refund. The exact policy varies by package—details are provided during booking.`,
    },
    {
      title: `How do you ensure the safety of travelers?`,
      description: `We prioritize safety by working with experienced guides, conducting regular checks on vehicles, and staying updated on weather and local conditions. Emergency support is available 24/7.`,
    },
    {
      title: `Do you provide travel insurance?`,
      description: `Travel insurance is not included in our packages but can be arranged on request. We recommend it for international or adventure trips.`,
    },
  ];

  const handleClick = (index) =>
    setIsAccordingOpen((prevIndex) => (prevIndex === index ? null : index));

  return (
    <div className="w-10/12 mx-auto md:mt-28 md:mb-28 mt-20 mb-16">
      <SectionTitleForMain
        heading={"Frequently Asked Question"}
        subHeading={"What do you want to know about us?"}
      ></SectionTitleForMain>

      <div className="flex flex-col-reverse lg:flex-row justify-between items-center md:mt-10">
        <div className="flex gap-3 flex-col lg:w-1/2 ">
          {accordingData?.map((according, index) => (
            <article
              key={index}
              className="border-b border-[#e5eaf2] rounded py-3"
            >
              <div
                className="flex gap-2 cursor-pointer items-center justify-between w-full"
                onClick={() => handleClick(index)}
              >
                <h2 className="text-[#0d504a] font-[600] text-[1.2rem]">
                  {according.title}
                </h2>
                <p>
                  <FaChevronDown
                    className={`text-[1.2rem] text-[#e9855a] transition-all duration-300 ${
                      isAccordingOpen === index &&
                      "rotate-[180deg] !text-[#0d504a]"
                    }`}
                  />
                </p>
              </div>
              <div
                className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                  isAccordingOpen === index
                    ? "grid-rows-[1fr] opacity-100 mt-4"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <p className="text-[#e9855a] text-[0.9rem] overflow-hidden">
                  {according.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="w-4/5 lg:w-1/3 mx-auto my-6">
          <Lottie className="w-full" animationData={faq} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Accordion;
