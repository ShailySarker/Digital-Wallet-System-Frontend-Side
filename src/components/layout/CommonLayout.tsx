import type { ReactNode } from "react";
import Footer from "../shared/Footer";
import { Navbar } from "../shared/Navbar";

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      {/* <Header /> */}
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
}
