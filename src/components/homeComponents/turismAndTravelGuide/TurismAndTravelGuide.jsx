import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import usePackageData from "../../../hooks/usePackageData";
const TurismAndTravelGuide = () => {
  const [packages] = usePackageData();
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Our Packages</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>

        <TabPanel>
          <h2>{packages.length}</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TurismAndTravelGuide;
