import { Link } from "react-router";
import banner from "../../assets/images/Error.jpg";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img
        className="xl:w-[40%] lg:w-[35%] md:w-[50%] w-[70%]"
        src={banner}
        alt="banner"
      />
      {/* <h3 className="italic xl:text-3xl lg:text-2xl md:text-[22px] text-xl font-medium xl:mt-4 lg:mt-3 md:mt-3 mt-2">
        Something went wrong.
      </h3>
      <p className="text-center xl:text-lg md:text-base text-sm lg:mt-2 mt-[6px]">
        Sorry, We can’t find the page you’re looking for.
      </p> */}
      <Link to="/">
        <Button className="cursor-pointer w-full xl:mt-7 lg:mt-6 md:mt-5 mt-4 font-semibold xl:text-base lg:text-[14.5px] md:text-[15px] text-[14.5px]">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
