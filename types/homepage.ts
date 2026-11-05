export type Competition = {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  accent: string;
};

export type Team = {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  primaryColour: string;
  secondaryColour: string;
};

export type MatchStatus = "upcoming" | "live" | "finished";

export type Match = {
  id: string;

  competition: Competition;

  homeTeam: Team;
  awayTeam: Team;

  homeScore?: number;
  awayScore?: number;

  date: string;
  venue: string;

  status: MatchStatus;

  views?: number;

  videoAvailable?: boolean;
};

export type Standing = {
  position: number;
  team: Team;

  played: number;
  won: number;
  drawn: number;
  lost: number;

  goalDifference: number;
  points: number;

  movement?: "up" | "down" | "same";
};

export type Video = {
  id: string;

  title: string;
  description?: string;

  competition: Competition;

  views: number;
  duration: string;

  thumbnail?: string;

  publishedAt: string;
};

export type FixtureGroup = {
  label: string;
  matches: Match[];
};

export type HomepageData = {
  heroMatch: Match;

  trendingVideo: Video;

  table: {
    competition: Competition;
    standings: Standing[];
  };

  fixtures: FixtureGroup;

  trendingCompetition: {
    competition: Competition;
    reason: string;
    views: number;
  };
};
