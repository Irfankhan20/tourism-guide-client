import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import SignUp from "../pages/signUp/SignUp";
import PackageDetails from "../pages/packageDetails/PackageDetails";
import Login from "../pages/login/Login";
import Community from "../pages/community/Community";
import AboutUs from "../pages/aboutUs/AboutUs";
import Trips from "../pages/trips/Trips";

import Dashboard from "../pages/dashboard/Dashboard";
import AddPackage from "../pages/dashboard/adminDashboard/AddPackage";
import ManageCandidates from "../pages/dashboard/adminDashboard/ManageCandidates";
// import ManageProfile from "../pages/dashboard/adminDashboard/ManageProfile";
import ManageUsers from "../pages/dashboard/adminDashboard/ManageUsers";
import AddStories from "../pages/dashboard/tourGuideDashboard/AddStories";
// import GuideManageProfile from "../pages/dashboard/tourGuideDashboard/GuideManageProfile";
import ManageStories from "../pages/dashboard/tourGuideDashboard/ManageStories";
import MyAssignedTours from "../pages/dashboard/tourGuideDashboard/MyAssignedTours";
import JoinAsTourGuide from "../pages/dashboard/touristDashboard/JoinAsTourGuide";
import MyBookings from "../pages/dashboard/touristDashboard/MyBookings";
import TouristAddStories from "../pages/dashboard/touristDashboard/TouristAddStories";
import TouristManageStories from "../pages/dashboard/touristDashboard/TouristManageStories";
// import TouristManageProfile from "../pages/dashboard/touristDashboard/TouristManageProfile";

import Page404 from "../pages/errorPage/Page404";
import UpdateStory from "../pages/dashboard/tourGuideDashboard/UpdateStory";
import Payment from "../pages/dashboard/Payment";
import AllTourGuides from "../pages/allTourGuides/AllTourGuides";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import PaymentSuccess from "../pages/dashboard/PaymentSuccess";
import PaymentFailed from "../pages/dashboard/PaymentFailed";
import PaymentHistory from "../pages/dashboard/adminDashboard/PaymentHistory";
import Profile from "../pages/dashboard/Profile";
import Redirect from "../pages/dashboard/Redirect";
import AdminStatess from "../pages/dashboard/adminDashboard/AdminStatess";
import ForgotPassword from "../pages/login/ForgotPassword";
import AllCupons from "../pages/dashboard/touristDashboard/AllCupons";

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
      { path: "/forgotPassword", element: <ForgotPassword></ForgotPassword> },
      {
        path: "/allGuides",
        element: <AllTourGuides></AllTourGuides>,
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
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/packageDetails/:id",
        element: (
          <PrivateRoute>
            <PackageDetails></PackageDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://unique-travel-server.vercel.app/package/${params.id}`),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Redirect />,
          },
          {
            path: "/dashboard/payment/:id",
            element: <Payment></Payment>,
          },
          {
            path: "/dashboard/paymentSuccess",
            element: <PaymentSuccess></PaymentSuccess>,
          },
          {
            path: "/dashboard/paymentFailed",
            element: <PaymentFailed></PaymentFailed>,
          },
          //admin routes

          {
            path: "/dashboard/addPakcage",
            element: (
              <AdminRoute>
                <AddPackage></AddPackage>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/paymentHistory",
            element: (
              <AdminRoute>
                <PaymentHistory></PaymentHistory>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/admin",
            element: (
              <AdminRoute>
                <AdminStatess></AdminStatess>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/manageCandidates",
            element: (
              <AdminRoute>
                <ManageCandidates></ManageCandidates>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/manageUsers",
            element: (
              <AdminRoute>
                <ManageUsers></ManageUsers>
              </AdminRoute>
            ),
          },

          //tourGuids

          {
            path: "/dashboard/addStories",
            element: <AddStories></AddStories>,
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
          },

          // tourist

          {
            path: "/dashboard/joinAsTourGuide",
            element: <JoinAsTourGuide></JoinAsTourGuide>,
          },
          {
            path: "/dashboard/myBookings",
            element: <MyBookings></MyBookings>,
          },
          {
            path: "/dashboard/allcupons",
            element: <AllCupons></AllCupons>,
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
            path: "/dashboard/profile",
            element: <Profile></Profile>,
          },
        ],
      },
    ],
  },
]);

export default router;
