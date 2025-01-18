import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import SignUp from "../pages/signUp/SignUp";
import PackageDetails from "../pages/packageDetails/PackageDetails";
import Login from "../pages/login/Login";
import Community from "../pages/community/Community";
import AboutUs from "../pages/aboutUs/AboutUs";
import Trips from "../pages/trips/Trips";
import Gallery from "../pages/gallery/Gallery";
import Dashboard from "../pages/dashboard/Dashboard";
import AddPackage from "../pages/dashboard/adminDashboard/AddPackage";
import ManageCandidates from "../pages/dashboard/adminDashboard/ManageCandidates";
import ManageProfile from "../pages/dashboard/adminDashboard/ManageProfile";
import ManageUsers from "../pages/dashboard/adminDashboard/ManageUsers";
import AddStories from "../pages/dashboard/tourGuideDashboard/AddStories";
import GuideManageProfile from "../pages/dashboard/tourGuideDashboard/GuideManageProfile";
import ManageStories from "../pages/dashboard/tourGuideDashboard/ManageStories";
import MyAssignedTours from "../pages/dashboard/tourGuideDashboard/MyAssignedTours";
import JoinAsTourGuide from "../pages/dashboard/touristDashboard/JoinAsTourGuide";
import MyBookings from "../pages/dashboard/touristDashboard/MyBookings";
import TouristAddStories from "../pages/dashboard/touristDashboard/TouristAddStories";
import TouristManageStories from "../pages/dashboard/touristDashboard/TouristManageStories";
import TouristManageProfile from "../pages/dashboard/touristDashboard/TouristManageProfile";
import AdminHome from "../pages/dashboard/adminDashboard/AdminHome";
import TourGuideHome from "../pages/dashboard/tourGuideDashboard/TourGuideHome";
import TouristHome from "../pages/dashboard/touristDashboard/TouristHome";
import Page404 from "../pages/errorPage/Page404";
import UpdateStory from "../pages/dashboard/tourGuideDashboard/UpdateStory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Page404></Page404>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/community",
        element: <Community></Community>,
      },
      {
        path: "/aboutus",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/trips",
        element: <Trips></Trips>,
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/packageDetails/:id",
        element: <PackageDetails></PackageDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/package/${params.id}`),
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          //admin routes
          {
            path: "/dashboard/adminHome",
            element: <AdminHome></AdminHome>,
          },
          {
            path: "/dashboard/addPakcage",
            element: <AddPackage></AddPackage>,
          },
          {
            path: "/dashboard/manageCandidates",
            element: <ManageCandidates></ManageCandidates>,
          },
          {
            path: "/dashboard/adminManageProfile",
            element: <ManageProfile></ManageProfile>,
          },
          {
            path: "/dashboard/manageUsers",
            element: <ManageUsers></ManageUsers>,
          },

          //tourGuids
          {
            path: "/dashboard/tourGuideHome",
            element: <TourGuideHome></TourGuideHome>,
          },
          {
            path: "/dashboard/addStories",
            element: <AddStories></AddStories>,
          },
          {
            path: "/dashboard/guideManageProfile",
            element: <GuideManageProfile></GuideManageProfile>,
          },
          {
            path: "/dashboard/manageStories",
            element: <ManageStories></ManageStories>,
          },
          {
            path: "/dashboard/myAssignedTours",
            element: <MyAssignedTours></MyAssignedTours>,
          },
          {
            path: "/dashboard/updateStory/:id",
            element: <UpdateStory></UpdateStory>,
            // loader: ({ params }) =>
            //   fetch(`http://localhost:5000/story/${params.id}`),
          },

          // tourist
          {
            path: "/dashboard/touristHome",
            element: <TouristHome></TouristHome>,
          },
          {
            path: "/dashboard/joinAsTourGuide",
            element: <JoinAsTourGuide></JoinAsTourGuide>,
          },
          {
            path: "/dashboard/myBookings",
            element: <MyBookings></MyBookings>,
          },
          {
            path: "/dashboard/touristAddStories",
            element: <TouristAddStories></TouristAddStories>,
          },
          {
            path: "/dashboard/manageStories",
            element: <TouristManageStories></TouristManageStories>,
          },
          {
            path: "/dashboard/touristManageProfile",
            element: <TouristManageProfile></TouristManageProfile>,
          },
        ],
      },
    ],
  },
]);

export default router;
