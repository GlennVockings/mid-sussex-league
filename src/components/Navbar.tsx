"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { MaxWidthWrapper } from "./MaxWidthWrapper"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Accordion } from "./Accordion"
import { IoMdClose } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { FaSquareFacebook, FaTiktok, FaInstagram, FaXTwitter } from "react-icons/fa6";

export const Navbar = () => {
  const [ mobileMenu, setMobileMenu ] = useState<boolean>(false);

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenu])

  return (
    <>
      <div className="bg-[#01257d] sticky z-30 top-0 h-16">
        <header className="relative h-full flex items-center">
          <MaxWidthWrapper>
            <div className="flex justify-between items-center gap-8">
              <Link href="/" className="flex items-center gap-2 bg-white rounded-full md:pr-3">
                <div className="bg-white rounded-full p-1 shadow-inner">
                  <Image src="/assets/mid-sussex-league.png" width={50} height={50} alt="Mid Sussex League" />
                </div>
                <p className="text-xl font-bold hidden md:block">Mid Sussex League</p>
              </Link>
              <div className="hidden">
                <NavigationMenu>
                  <NavigationMenuList className="gap-1 md:gap-3">
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Leagues</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                              href={`/premier-league`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none text-nowrap">Premier League</div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="#" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          News
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/fixtures" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Fixtures
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              <div className="md:hidden">
                <button onClick={() => setMobileMenu(true)}>
                  <MdMenu className="text-3xl text-[#00ffff]" />
                </button>
              </div>
            </div>
          </MaxWidthWrapper>
        </header>
      </div>
      <div className={cn("fixed inset-0 float-right z-40 flex justify-start overflow-hidden transition-all duration-75", mobileMenu ? "w-full" : "w-0")}>
        <div
          className={cn("w-full absolute top-0 left-0 h-full transition-all delay-500", mobileMenu ? "bg-black/80" : "bg-black/0")}
          onClick={() => setMobileMenu(false)}
          />
        <div className={cn("relative bg-white h-full flex flex-col border-r-8 border-[#01257d] transition-all delay-75 duration-300", mobileMenu ? "w-64" : "w-0")}>
          <div className="pt-4 px-2 flex justify-between items-center">
            <Image src="/assets/mid-sussex-league.png" width={40} height={40} alt="Mid Sussex League" />
            <button onClick={() => setMobileMenu(false)}>
              <IoMdClose className="text-2xl" />
            </button>
          </div>
          <div className={cn("px-2 py-3 flex flex-col flex-grow gap-4 transition-all delay-75", mobileMenu ? "opacity-100" : "opacity-0")}>
            <Accordion title="Leagues">
              <Link
                href={`/premier-league`}
                className="block select-none rounded-md py-2 px-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                <div className="text-sm font-medium leading-none text-nowrap">Premier League</div>
              </Link>
              <Link
                href={`/championship`}
                className="block select-none rounded-md py-2 px-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                <div className="text-sm font-medium leading-none text-nowrap">Championship</div>
              </Link>
            </Accordion>
            <Link href="#" className="font-semibold tracking-wide">News</Link>
            <Link href="/fixtures" className="font-semibold tracking-wide">Fixtures</Link>
          </div>
          <div className="flex gap-2 text-2xl px-2 py-4 text-[#01257d]">
            <FaSquareFacebook />
            <FaInstagram />
            <FaXTwitter />
            <FaTiktok />
          </div>
        </div>
      </div>
    </>
  )
}