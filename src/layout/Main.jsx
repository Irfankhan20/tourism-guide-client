import { Outlet } from "react-router-dom";
import Navbar from "../sharedComponents/navbar/Navbar";
import Footer from "../sharedComponents/footer/Footer";

const Main = () => {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <div className="flex-grow">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
      <div className="flex-shrink-0">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
