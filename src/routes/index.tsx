import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import App from "@/App";
import LazyLoader from "@/components/shared/LazyLoader";
import { withAuth } from "@/utils/withAuth";
import { generateRoutes } from "@/utils/generateRoutes";
import adminSidebar from "./adminSidebar";
import userSidebar from "./userSidebar";
import agentSidebar from "./agentSidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import NotFound from "@/pages/NotFound";


const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const Contact = React.lazy(() => import("../pages/Contact"));
const FAQ = React.lazy(() => import("../pages/FAQ"));
const Features = React.lazy(() => import("../pages/Features"));
const Pricing = React.lazy(() => import("../pages/Pricing"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Verify = React.lazy(() => import("../pages/Verify"));
const ChangePassword = React.lazy(() => import("../pages/ChangePassword"));
const ForgetPassword = React.lazy(() => import("../pages/ForgetPassword"));
const ResetPassword = React.lazy(() => import("../pages/ResetPassword"));

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LazyLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<LazyLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "features",
        element: (
          <Suspense fallback={<LazyLoader />}>
            <Features />
          </Suspense>
        ),
      },
      {
        path: "pricing",
        element: (
          <Suspense fallback={<LazyLoader />}>
            <Pricing />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<LazyLoader />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "change-password",
        element: (
          <Suspense fallback={<LazyLoader />}>
            <ChangePassword />
          </Suspense>
        ),
      },
      // {
      //   path: "edit-profile",
      //   element: (
      //     <Suspense fallback={<LazyLoader />}>
      //       <Edit />
      //     </Suspense>
      //   ),
      // },
      {
        path: "faq",
        element: (
          <Suspense fallback={<LazyLoader />}>
            <FAQ />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    Component: () => (
      <Suspense fallback={<LazyLoader />}>
        {React.createElement(withAuth(DashboardLayout, "ADMIN"))}
      </Suspense>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/overview" /> },
      ...generateRoutes(adminSidebar).map(({ path, Component }) => ({
        path,
        Component: Component
          ? () => (
              <Suspense fallback={<LazyLoader />}>
                {React.createElement(withAuth(Component, "ADMIN"))}
              </Suspense>
            )
          : undefined,
      })),
    ],
  },
  {
    path: "/user",
    Component: () => (
      <Suspense fallback={<LazyLoader />}>
        {React.createElement(withAuth(DashboardLayout, "USER"))}
      </Suspense>
    ),
    children: [
      { index: true, element: <Navigate to="/user/overview" /> },
      ...generateRoutes(userSidebar).map(({ path, Component }) => ({
        path,
        Component: Component
          ? () => (
              <Suspense fallback={<LazyLoader />}>
                {React.createElement(withAuth(Component, "USER"))}
              </Suspense>
            )
          : undefined,
      })),
    ],
  },
  {
    path: "/agent",
    Component: () => (
      <Suspense fallback={<LazyLoader />}>
        {React.createElement(withAuth(DashboardLayout, "AGENT"))}
      </Suspense>
    ),
    children: [
      { index: true, element: <Navigate to="/agent/overview" /> },
      ...generateRoutes(agentSidebar).map(({ path, Component }) => ({
        path,
        Component: Component
          ? () => (
              <Suspense fallback={<LazyLoader />}>
                {React.createElement(withAuth(Component, "AGENT"))}
              </Suspense>
            )
          : undefined,
      })),
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/verify",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <Verify />
      </Suspense>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <ForgetPassword />
      </Suspense>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: "/*",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
