import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import usePackageData from "../../../hooks/usePackageData";
import Package from "./Package";
import { Link } from "react-router-dom";
import useGuides from "../../../hooks/useGuides";
import TourGuideCard from "./TourGuideCard";
import Button from "../../../sharedComponents/button/Button";
import SectionTitleForMain from "../../../sharedComponents/sectionTitleForMain/SectionTitleForMain";

const TourismAndTravelGuide = () => {
  const [packages] = usePackageData();
  const [guides] = useGuides();

  const handleDetails = (id) => {
    <Link to={`/details/${id}`}></Link>;
  };

  return (
    <section className=" md:mt-28 mt-20">
      <div className="w-11/12 mx-auto">
        <SectionTitleForMain
          heading={"Tourism and Travel Guide"}
          subHeading={"Explore us for travel with us"}
        ></SectionTitleForMain>
        <Tabs className={"md:mt-10"}>
          <TabList className="flex justify-center gap-4 mb-8">
            <Tab
              className="px-6 shadow-lg py-2 border  text-black rounded-md cursor-pointer transition-all  focus:outline-none"
              selectedClassName=" shadow-lg shadow-[#6a9995] hover:shadow-[#eeab8f] text-[#07332F] bg-[#fdc4ac]  border border-[#07332F]"
            >
              Our Packages
            </Tab>
            <Tab
              className="px-6 shadow-lg py-2 border text-black rounded-md cursor-pointer transition-all focus:outline-none"
              selectedClassName=" shadow-lg shadow-[#6a9995] hover:shadow-[#eeab8f] text-[#07332F] bg-[#fdc4ac]  border border-[#07332F]"
            >
              Meet Tour Guides
            </Tab>
          </TabList>
          <TabPanel className={"text-center"}>
            <div className="grid md:grid-cols-3 gap-8 md:gap-0 mt-10 ">
              {packages.map((tour) => (
                <Package
                  key={tour._id}
                  tour={tour}
                  handleDetails={handleDetails}
                />
              ))}
            </div>
            <Link to="/trips">
              <Button btnText={"See All Packages"}></Button>
            </Link>
          </TabPanel>

          <TabPanel className={"text-center"}>
            <div className="grid md:grid-cols-6 gap-6 mt-10">
              {guides.map((guide) => (
                <TourGuideCard key={guide._id} guide={guide} />
              ))}
            </div>

            <Link to="/allGuides">
              <Button btnText={"See All Guides"}></Button>
            </Link>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default TourismAndTravelGuide;
