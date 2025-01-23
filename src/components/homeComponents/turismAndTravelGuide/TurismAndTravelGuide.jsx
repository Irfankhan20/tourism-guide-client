import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import usePackageData from "../../../hooks/usePackageData";
import Package from "./Package";
import { Link } from "react-router-dom";
import useGuides from "../../../hooks/useGuides";
import TourGuideCard from "./TourGuideCard";

const TourismAndTravelGuide = () => {
  const [packages] = usePackageData();
  const [guides] = useGuides();

  const handleDetails = (id) => {
    <Link to={`/details/${id}`}></Link>;
  };

  return (
    <section className=" md:mt-24 mt-10">
      <div className="w-11/12 mx-auto">
        <h2 className="text-5xl font-bold text-center text-gray-800 mb-8">
          Tourism and Travel Guide
        </h2>
        <Tabs>
          <TabList className="flex justify-center gap-4 mb-8">
            <Tab
              className="px-6 py-2 border text-black rounded-md cursor-pointer transition-all hover:bg-primary hover:text-white focus:outline-none"
              selectedClassName="bg-primary text-white border-primary"
            >
              Our Packages
            </Tab>
            <Tab
              className="px-6 py-2 border text-black rounded-md cursor-pointer transition-all hover:bg-primary hover:text-white focus:outline-none"
              selectedClassName="bg-primary text-white border-primary"
            >
              Meet Tour Guides
            </Tab>
          </TabList>
          <TabPanel className={""}>
            <div className="grid md:grid-cols-3 mt-8 ">
              {packages.map((tour) => (
                <Package
                  key={tour._id}
                  tour={tour}
                  handleDetails={handleDetails}
                />
              ))}
            </div>
            <Link to="/trips">
              <button className="btn mt-10 border-2 border-[#F5A481] relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-mono  tracking-tighter text-[#F5A481] bg-white rounded-lg group">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-300"></span>
                <span className="relative text-text group-hover:text-white">
                  See All Packages
                </span>
              </button>
            </Link>
          </TabPanel>

          <TabPanel className={"text-center"}>
            <div className="grid md:grid-cols-6 gap-6 mt-8">
              {guides.map((guide) => (
                <TourGuideCard key={guide._id} guide={guide} />
              ))}
            </div>

            <Link to="/allGuides">
              <button className="btn mt-10 btn-primary">See All Guides</button>
            </Link>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default TourismAndTravelGuide;
