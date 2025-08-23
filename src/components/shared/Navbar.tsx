import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import { ModeToggle } from "./ModeToggler";
import {
  authApi,
  useLogoutMutation,
  useMyProfileQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import ProfileLogo from "./ProfileLogo";

const Navbar = () => {
  const { data } = useMyProfileQuery(undefined);
  // console.log(data.data.name);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };
  // const features = [
  //   {
  //     title: "Dashboard",
  //     description: "Overview of your activity",
  //     href: "#",
  //   },
  //   {
  //     title: "Analytics",
  //     description: "Track your performance",
  //     href: "#",
  //   },
  //   {
  //     title: "Settings",
  //     description: "Configure your preferences",
  //     href: "#",
  //   },
  //   {
  //     title: "Integrations",
  //     description: "Connect with other tools",
  //     href: "#",
  //   },
  //   {
  //     title: "Storage",
  //     description: "Manage your files",
  //     href: "#",
  //   },
  //   {
  //     title: "Support",
  //     description: "Get help when needed",
  //     href: "#",
  //   },
  // ];
  // #7f22fe
  return (
    <div className="sticky top-0 z-50 bg-accent xl:px-8 lg:px-6 md:px-7 px-5 xl:py-6 md:py-5 py-4">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] grid-cols-2 p-3">
                  {features.map((feature, index) => (
                    <NavigationMenuLink
                      href={feature.href}
                      key={index}
                      className="rounded-md p-3 transition-colors hover:bg-muted/70"
                    >
                      <div key={feature.title}>
                        <p className="mb-1 font-semibold text-foreground">
                          {feature.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className={navigationMenuTriggerStyle()}
              >
                <span className="xl:text-base lg:text-[14.5px]">Home</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/about"
                className={navigationMenuTriggerStyle()}
              >
                <span className="xl:text-base lg:text-[14.5px]">About</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/features"
                className={navigationMenuTriggerStyle()}
              >
                <span className="xl:text-base lg:text-[14.5px]">Features</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/pricing"
                className={navigationMenuTriggerStyle()}
              >
                <span className="xl:text-base lg:text-[14.5px]">Pricing</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/contact"
                className={navigationMenuTriggerStyle()}
              >
                <span className="xl:text-base lg:text-[14.5px]">Contact</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/faq"
                className={navigationMenuTriggerStyle()}
              >
                <span className="xl:text-base lg:text-[14.5px]">FAQ</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex lg:gap-2 gap-2">
          {/* {data?.data?.email && <ProfileLogo initial={data?.data?.name} />} */}
          <ModeToggle />

          <div className="hidden items-center xl:gap-3 lg:gap-2 lg:flex">
            {data?.data?.email ? (
              <div className="flex gap-3">
                {/* <ProfileLogo initial={data?.data?.name} /> */}
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="text-sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className=" items-center xl:gap-3 lg:gap-2 lg:flex">
                <Link to="/login">
                  <Button className="xl:text-base lg:text-[14.5px]">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    className="xl:text-base lg:text-[14.5px]"
                    variant="outline"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="md:h-4 md:w-4 w-3 h-3" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="max-h-screen overflow-auto md:px-2 px-1 pt-2"
            >
              <SheetHeader>
                <SheetTitle>
                  <Link to="/">
                    <Logo />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col md:px-4 px-4 md:pb-6 pb-5 md:pt-2">
                {/* <Accordion type="single" collapsible className="mt-4 mb-2">
                <AccordionItem value="solutions" className="border-none">
                  <AccordionTrigger className="text-base hover:no-underline">
                    Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid md:grid-cols-2">
                      {features.map((feature, index) => (
                        <a
                          href={feature.href}
                          key={index}
                          className="rounded-md p-3 transition-colors hover:bg-muted/70"
                        >
                          <div key={feature.title}>
                            <p className="mb-1 font-semibold text-foreground">
                              {feature.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion> */}
                <div className="flex flex-col md:gap-[22px] gap-5">
                  <Link
                    to="/"
                    className="md:text-[15px] text-[14.5px] font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="md:text-[15px] text-[14.5px] font-medium"
                  >
                    About
                  </Link>
                  <Link
                    to="/features"
                    className="md:text-[15px] text-[14.5px] font-medium"
                  >
                    Features
                  </Link>
                  <Link
                    to="/pricing"
                    className="md:text-[15px] text-[14.5px] font-medium"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/contact"
                    className="md:text-[15px] text-[14.5px] font-medium"
                  >
                    Contact
                  </Link>
                  <Link
                    to="/faq"
                    className="md:text-[15px] text-[14.5px] font-medium"
                  >
                    FAQ
                  </Link>
                </div>
                <div className="md:mt-10 mt-8 flex flex-col gap-3 w-full">
                  <Link to="/login">
                    <Button className="md:text-[15px] text-[14.5px] w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      className="md:text-[15px] text-[14.5px] w-full"
                      variant="outline"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export { Navbar };
