import { MaxWidthWrapper } from "./MaxWidthWrapper"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loading = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex gap-3">
        Loading...
        <AiOutlineLoading3Quarters className="animate-spin" />
      </div>
    </MaxWidthWrapper>
  )
}