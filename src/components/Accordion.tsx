import { cn } from "@/lib/utils"
import { useState } from "react"
import { IoChevronDown } from "react-icons/io5"

export const Accordion = ({ title, children } : { title: string, children: React.ReactNode}) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="flex gap-3 items-center font-semibold tracking-wide">
        { title }
        <IoChevronDown className={cn("transition-all", isOpen ? "rotate-180" : "" )} />
      </button>
      <div className={cn("overflow-y-scroll transition-all", isOpen ? "h-20" : "h-0")}>
        { children }
      </div>
    </div>
  )
}