import Link from "next/link"
import Image from "next/image"

export const Footer = () => {
  return (
    <div className="bg-[#01257d] py-4 text-white text-sm px-2 flex items-center gap-2 flex-col">
      <div className="flex gap-4">
        <div className="bg-white flex gap-1 items-center rounded-full md:py-1 md:pr-2">
          <Image src="/assets/sussex-county-fa.png" alt="Sussex County FA" width={48} height={48} />
          <p className="text-black font-semibold hidden md:flex">Sussex County FA</p>
        </div>
        <div className="bg-white flex gap-1 items-center rounded-full px-3">
          <Image src="/assets/gray-hooper-holt-llp.png" alt="Gray Hooper Holt LLP" width={250} height={48} />
        </div>
        <div className="md:bg-white flex gap-1 items-center rounded-full md:py-1 md:pr-2">
          <Image src="/assets/fa.png" alt="Football Association" width={48} height={48} />
          <p className="text-black font-semibold hidden md:flex">The Football Association</p>
        </div>
      </div>
      <p>All data copied from <Link className="cursor-pointer underline" href="https://fulltime.thefa.com/index.html?league=568629645&selectedSeason=34198694&selectedDivision=116511351&selectedCompetition=0&selectedFixtureGroupKey=1_449340625" target="_blank">FA Full Time</Link></p>
    </div>
  )
}