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
        height: "100vh",
      }}
    >
      <Profile></Profile>
    </div>
  );
};

export default GuideManageProfile;
