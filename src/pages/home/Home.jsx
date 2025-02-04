import { Helmet } from "react-helmet";
import Accordion from "../../components/accordion/Accordion";
import Banner from "../../components/homeComponents/banner/Banner";
import Overview from "../../components/homeComponents/overview/Overview";
import TouristStory from "../../components/homeComponents/touristStory/TouristStory";
import TurismAndTravelGuide from "../../components/homeComponents/turismAndTravelGuide/TurismAndTravelGuide";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Unique Travel - Home</title>
      </Helmet>
      <Banner></Banner>
      <Overview></Overview>
      <TurismAndTravelGuide></TurismAndTravelGuide>
      <TouristStory></TouristStory>
      <Accordion></Accordion>
    </div>
  );
};

export default Home;
