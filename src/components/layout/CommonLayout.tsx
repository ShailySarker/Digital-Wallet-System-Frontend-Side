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
      <div className="grow-1 xl:px-20 lg:px-14 md:px-10 px-5">{children}</div>
      <Footer />
    </div>
  );
}
