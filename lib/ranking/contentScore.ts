export type RankingSignals = {
  views: number;
  recentViews: number;
  engagementRate: number;
  editorialBoost?: number;
};

export function calculateContentScore({
  views,
  recentViews,
  engagementRate,
  editorialBoost = 0,
}: RankingSignals): number {
  const popularityScore = Math.log10(views + 1) * 10;

  const velocityScore = Math.log10(recentViews + 1) * 15;

  const engagementScore =
    Math.max(0, Math.min(engagementRate, 1)) * 20;

  return (
    popularityScore +
    velocityScore +
    engagementScore +
    editorialBoost
  );
}

export function rankContent<T extends RankingSignals>(
  items: T[],
): T[] {
  return [...items].sort(
    (a, b) =>
      calculateContentScore(b) -
      calculateContentScore(a),
  );
}
