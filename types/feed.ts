export type FeedItemType =
  | "match"
  | "video"
  | "standings"
  | "fixtures"
  | "competition"
  | "club"
  | "news";

export type FeedItemSize =
  | "compact"
  | "standard"
  | "wide"
  | "hero";

export type FeedItem = {
  id: string;

  type: FeedItemType;

  referenceId: string;

  priority: number;

  size: FeedItemSize;

  competitionId?: string;
  clubIds?: string[];

  trending?: boolean;
  editorialBoost?: number;
};

export type HomepageFeed = {
  generatedAt: string;
  items: FeedItem[];
};
