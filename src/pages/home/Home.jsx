import Banner from "../../components/homeComponents/banner/Banner";
import Overview from "../../components/homeComponents/overview/Overview";
import TurismAndTravelGuide from "../../components/homeComponents/turismAndTravelGuide/TurismAndTravelGuide";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Overview></Overview>
      <TurismAndTravelGuide></TurismAndTravelGuide>
    </div>
  );
};

export default Home;
