import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export const MaxWidthWrapper = ({ className, children } : { className?: string, children: ReactNode }) => {
  return (
    <div className={cn("mx-auto w-full max-w-screen-3xl px-2.5 lg:px-10 xl:px-20 2xl:px-44", className )}>
      { children }
    </div>
  )
}