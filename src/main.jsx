import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.css";
import App from "./App";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import Features from "./pages/Features";
import Premium from "./pages/Premium";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import AboutPage from "./pages/AboutPage";
import PaymentPage from "./pages/PaymentPage";
import Error500 from "./pages/Error500";
import PaymentSuccess from "./pages/PaymentSuccess";
import Children from "./pages/Children";
import VerifyEmail from "./pages/VerifyEmail";
import HealthRecord from "./pages/HealthRecord";
import HistoryPayment from "./pages/HistoryPayment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/pricing",
        element: <Premium />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/profile/:userId",
        element: <Profile />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/children/:parentId",
        element: <Children />,
      },
      {
        path: "/health-records/:childrenId/:childName",
        element: <HealthRecord />,
      },
      {
        path: "/history-payment/:userId",
        element: <HistoryPayment />,
      },
    ],
  },
  {
    path: "/:userId/payment",
    element: <PaymentPage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/error",
    element: <Error500 />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/verify-email/:token",
    element: <VerifyEmail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
