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

const Home = React.lazy(() => import("../pages/Public/Home"));
const About = React.lazy(() => import("../pages/Public/About"));
const Pricing = React.lazy(() => import("../pages/Public/Pricing"));
const Features = React.lazy(() => import("../pages/Public/Features"));
const Contact = React.lazy(() => import("../pages/Public/Contact"));
const FAQ = React.lazy(() => import("../pages/Public/FAQ"));
const Setting = React.lazy(() => import("../pages/Public/Setting"));
const Login = React.lazy(() => import("../pages/Authentication/Login"));
const Register = React.lazy(() => import("../pages/Authentication/Register"));
const Verify = React.lazy(() => import("../pages/Authentication/Verify"));
const ChangePassword = React.lazy(
  () => import("../pages/Private/ChangePassword")
);
const ForgetPassword = React.lazy(
  () => import("../pages/Authentication/ForgetPassword")
);
const ResetPassword = React.lazy(
  () => import("../pages/Authentication/ResetPassword")
);
const EditProfile = React.lazy(() => import("../pages/Private/EditProfile"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
const Unauthorized = React.lazy(() => import("@/pages/Unauthorized"));

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
        path: "faq",
        element: (
          <Suspense fallback={<LazyLoader />}>
            <FAQ />
          </Suspense>
        ),
      },
      {
        path: "setting",
        element: (
          <Suspense fallback={<LazyLoader />}>
            <Setting />
          </Suspense>
        ),
      },
      {
        path: "change-password",
        Component: () => (
          <Suspense fallback={<LazyLoader />}>
            {React.createElement(withAuth(ChangePassword))}
          </Suspense>
        ),
      },
      {
        path: "edit-profile",
        Component: () => (
          <Suspense fallback={<LazyLoader />}>
            {React.createElement(withAuth(EditProfile))}
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
    path: "/unauthorized",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <Unauthorized />
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
