import type {
  Competition,
  HomepageData,
  Match,
  Team,
} from "@/types/homepage";

const premier: Competition = {
  id: "competition-premier",
  name: "Premier Division",
  shortName: "Premier",
  slug: "premier-division",
  accent: "#E4574F",
};

const divisionOne: Competition = {
  id: "competition-division-one",
  name: "Division One",
  shortName: "Div One",
  slug: "division-one",
  accent: "#3977B8",
};

const championship: Competition = {
  id: "competition-championship",
  name: "Championship",
  shortName: "Champ",
  slug: "championship",
  accent: "#D69A2D",
};

const oxted: Team = {
  id: "oxted",
  name: "Oxted",
  shortName: "OXT",
  slug: "oxted",
  primaryColour: "#1E3A8A",
  secondaryColour: "#FFFFFF",
};

const southwick: Team = {
  id: "southwick",
  name: "Southwick",
  shortName: "SOU",
  slug: "southwick",
  primaryColour: "#E31B23",
  secondaryColour: "#FFFFFF",
};

const balcombe: Team = {
  id: "balcombe",
  name: "Balcombe",
  shortName: "BAL",
  slug: "balcombe",
  primaryColour: "#242424",
  secondaryColour: "#F3C623",
};

const montpelier: Team = {
  id: "montpelier",
  name: "Montpelier Villa",
  shortName: "MON",
  slug: "montpelier-villa",
  primaryColour: "#6B21A8",
  secondaryColour: "#FFFFFF",
};

const ridgewood: Team = {
  id: "ridgewood",
  name: "Ridgewood",
  shortName: "RID",
  slug: "ridgewood",
  primaryColour: "#176B3A",
  secondaryColour: "#FFFFFF",
};

const lingfield: Team = {
  id: "lingfield",
  name: "Lingfield",
  shortName: "LIN",
  slug: "lingfield",
  primaryColour: "#D90429",
  secondaryColour: "#FFFFFF",
};

const heroMatch: Match = {
  id: "match-oxted-southwick",

  competition: premier,

  homeTeam: oxted,
  awayTeam: southwick,

  homeScore: 4,
  awayScore: 3,

  date: "2026-09-12T15:00:00+01:00",
  venue: "Master Park",

  status: "finished",

  views: 12840,

  videoAvailable: true,
};

export const mockHomepageData: HomepageData = {
  heroMatch,

  trendingVideo: {
    id: "video-1",

    title: "Seven goals, late drama and a packed touchline",
    description:
      "Watch the highlights from one of the weekend's most talked-about matches.",

    competition: premier,

    views: 12840,
    duration: "8:42",

    publishedAt: "2026-09-13T10:00:00+01:00",
  },

  table: {
    competition: premier,

    standings: [
      {
        position: 1,
        team: balcombe,
        played: 6,
        won: 5,
        drawn: 1,
        lost: 0,
        goalDifference: 13,
        points: 16,
        movement: "same",
      },
      {
        position: 2,
        team: oxted,
        played: 6,
        won: 5,
        drawn: 0,
        lost: 1,
        goalDifference: 11,
        points: 15,
        movement: "up",
      },
      {
        position: 3,
        team: southwick,
        played: 6,
        won: 4,
        drawn: 1,
        lost: 1,
        goalDifference: 9,
        points: 13,
        movement: "down",
      },
      {
        position: 4,
        team: ridgewood,
        played: 6,
        won: 3,
        drawn: 2,
        lost: 1,
        goalDifference: 6,
        points: 11,
        movement: "same",
      },
      {
        position: 5,
        team: lingfield,
        played: 6,
        won: 3,
        drawn: 1,
        lost: 2,
        goalDifference: 4,
        points: 10,
        movement: "up",
      },
    ],
  },

  fixtures: {
    label: "Saturday 19 September",

    matches: [
      {
        id: "fixture-1",

        competition: premier,

        homeTeam: balcombe,
        awayTeam: oxted,

        date: "2026-09-19T15:00:00+01:00",
        venue: "Balcombe Recreation Ground",

        status: "upcoming",
      },
      {
        id: "fixture-2",

        competition: premier,

        homeTeam: southwick,
        awayTeam: ridgewood,

        date: "2026-09-19T15:00:00+01:00",
        venue: "Old Barn Way",

        status: "upcoming",
      },
      {
        id: "fixture-3",

        competition: championship,

        homeTeam: lingfield,
        awayTeam: montpelier,

        date: "2026-09-19T15:00:00+01:00",
        venue: "Sports Pavilion",

        status: "upcoming",
      },
    ],
  },

  trendingCompetition: {
    competition: divisionOne,

    reason: "Views are up 186% this week",

    views: 28410,
  },
};
