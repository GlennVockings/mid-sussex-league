"use client"

import Image from "next/image"
import { MaxWidthWrapper } from "./MaxWidthWrapper"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu"
import Link from "next/link"
import { GiHamburgerMenu } from "react-icons/gi";

export const Navbar = () => {
  return (
    <div className="bg-[#01257d] sticky z-50 top-0 h-16">
      <header className="relative h-full flex items-center">
        <MaxWidthWrapper>
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 bg-white rounded-full md:pr-3">
              <div className="bg-white rounded-full p-1 shadow-inner">
                <Image src="/assets/mid-sussex-league.png" width={50} height={50} alt="Mid Sussex League" />
              </div>
              <p className="text-xl font-bold hidden md:block">Mid Sussex League</p>
            </Link>
            <div>
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
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}