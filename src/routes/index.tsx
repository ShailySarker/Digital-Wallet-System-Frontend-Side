import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import App from "@/App";
import LazyLoader from "@/components/shared/LazyLoader";

const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const Contact = React.lazy(() => import("../pages/Contact"));
const FAQ = React.lazy(() => import("../pages/FAQ"));
const Features = React.lazy(() => import("../pages/Features"));
const Pricing = React.lazy(() => import("../pages/Pricing"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Verify = React.lazy(() => import("../pages/Verify"));

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
]);
