import Profile from "../Profile";
import profileBg from "../../../assets/profileBg.jpg";
const GuideManageProfile = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${profileBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="lg:pb-20 lg:pt-10"
    >
      <Profile></Profile>
    </div>
  );
};

export default GuideManageProfile;
