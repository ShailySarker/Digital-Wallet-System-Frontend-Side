import { useEffect, useState } from "react";
import Joyride, { type Step } from "react-joyride";

const STORAGE_KEY = "isTourCompleted";

const steps: Step[] = [
  {
    target: ".mode-toggle",
    content:
      "Switch between Light and Dark mode for the best viewing experience.",
  },
  {
    target: ".loginButton",
    content:
      "Already a member? Log in to securely access your Digi Wallet account.",
  },
  {
    target: ".registerButton",
    content: "New here? Create your Digi Wallet account in just a few clicks.",
  },
  {
    target: ".homePage",
    content:
      "Start your journey with a quick overview of Digi Wallet on the homepage.",
  },
  {
    target: ".aboutPage",
    content:
      "Learn more about Digi Wallet, our mission, and what sets us apart.",
  },
  {
    target: ".featuresPage",
    content:
      "Discover the powerful features Digi Wallet offers to make your life easier.",
  },
  {
    target: ".pricingtPage",
    content: "Explore our flexible plans and packages tailored to your needs.",
  },
  {
    target: ".contactPage",
    content: "Have questions? Reach out to us directly from the Contact page.",
  },
  {
    target: ".faqPage",
    content: "Find quick answers to common questions in our FAQ section.",
  },
];

export default function NavbarTourGuide() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY);
    if (!done) setRun(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCallback = (data: any) => {
    const { status } = data;
    if (status === "finished" || status === "skipped") {
      localStorage.setItem(STORAGE_KEY, "true");
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      callback={handleCallback}
      styles={{
        options: { zIndex: 10000, primaryColor: "#7f22fe" },
      }}
    />
  );
}
