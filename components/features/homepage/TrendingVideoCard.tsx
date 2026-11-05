import { Eye, Play } from "lucide-react";

import { BentoCard } from "@/components/ui/BentoCard";

import type { Video } from "@/types/homepage";

type TrendingVideoCardProps = {
  video: Video;
};

export function TrendingVideoCard({ video }: TrendingVideoCardProps) {
  return (
    <BentoCard className="min-h-[300px] bg-msfl-navy text-white md:col-span-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.18),transparent_45%)]" />

      <div className="relative flex h-full min-h-[300px] flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-white/60">
            Watch
          </span>

          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
            {video.duration}
          </span>
        </div>

        <div className="my-auto py-8">
          <button
            aria-label="Play video"
            className="grid size-16 cursor-pointer place-items-center rounded-full bg-white text-msfl-navy transition-transform hover:scale-105"
          >
            <Play className="translate-x-[1px]" fill="currentColor" size={24} />
          </button>
        </div>

        <h2 className="text-2xl font-black leading-tight tracking-[-0.035em]">
          {video.title}
        </h2>

        <div className="mt-5 flex items-center justify-between text-sm text-white/65">
          <span>{video.competition.name}</span>

          <span className="flex items-center gap-1.5">
            <Eye size={15} />

            {video.views.toLocaleString("en-GB")}
          </span>
        </div>
      </div>
    </BentoCard>
  );
}
