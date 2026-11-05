import type { Team } from "@/types/homepage";

type ClubBadgeProps = {
  team: Team;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "size-7 text-[9px]",
  md: "size-10 text-xs",
  lg: "size-14 text-sm",
};

export function ClubBadge({
  team,
  size = "md",
  className = "",
}: ClubBadgeProps) {
  return (
    <div
      role="img"
      aria-label={`${team.name} placeholder badge`}
      className={[
        "grid shrink-0 place-items-center rounded-full",
        "font-black tracking-tight",
        sizes[size],
        className,
      ].join(" ")}
      style={{
        backgroundColor: team.primaryColour,
        color: team.secondaryColour,
      }}
    >
      {team.shortName}
    </div>
  );
}
