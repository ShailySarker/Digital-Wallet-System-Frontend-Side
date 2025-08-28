import Logo from "@/assets/icons/Logo";
import LoginForm from "@/components/modules/Login/LoginForm";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex w-full flex-col justify-center items-center xl:gap-4 gap-3">
        <Link to="/">
          <Logo />
        </Link>
        <div className="lg:w-4/5 md:w-[95%]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}