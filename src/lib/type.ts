// League Types

export interface TableType {
  team: {
    _id: string
    name: string
  }
  played: number
  wins: number
  loses: number
  draws: number
  for: number
  against: number
  points: number
  goalDifference: number
  _id: string
}

export interface EventType {
  type: string
  player: string
  team: string
}

export interface FixtureType {
  home: string
  away: string
  dateTime: string
  venue: string
  status: string
  _id: string
  score?: {
    home?: number
    away?: number
  }
  events?: EventType[]
}

export interface StatType {
  team: string
  player?: string
  stat: number
}

export interface StatCategoryType {
  name: string;
  stats: StatType[];
}

export interface SeasonType {
  _id: string
  season: string
  status: string
  fixtures: FixtureType[]
  table: TableType[]
  completedFixtures?: FixtureType[]
  upcomingFixtures?: FixtureType[]
  slimTable?: TableType[]
  stats?: {
    team: StatCategoryType[],
    player: StatCategoryType[]
  }
  teams: LeagueTeamType[]
}

export interface LeagueTeamType {
  team: {
    _id: string
    name: string
  }
  goals: Number
  cleanSheets: Number
  redCards: Number
  yellowCards: Number
}

export interface LeagueType {
  _id: string
  league: string
  seasons: SeasonType[]
}

export interface LeagueSummaryType {
  _id: string
  league: string
}

// News Type

export interface NewsType {
  id: string
  title: string
  summary: string
  description: string
  createdAt: string
  image: string
  tag: string
  featured?: boolean
}

// Team Types

export interface TeamSummaryType {
  _id: string
  name: string
  parent: string
  abbr: string
}

export interface TeamType {
  _id: string
  name: string
  ground?: string[]
  seasons?: TeamSeasonType[]
  season?: TeamSeasonType
  parent?: string
  fixtures?: FixtureType[]
  abbr?: string
}

export interface TeamSeasonType {
  season: string
  status: string
  league: {
    _id: string
    league: string
  }
  manager: string
  players: PlayerType[]
  _id: string
  stats: {
    goals: number
    yellowCards: number
    redCards: number
    cleanSheets: number
  }
}

// Player Types
export interface PlayerStatType {
  team: {
    _id: string,
    name: string,
  },
  appearances: number,
  goals: number,
  assists: number,
  yellowCards: number,
  redCards: number,
  started: number,
  playerofMatch: number,
  cleanSheet: number,
}

export interface PlayerSeasonType {
  season: string
  status: string
  stats: PlayerStatType[]
}

export interface PlayerType {
  _id: string
  firstName: string
  lastName: string
  number?: number
  position?: string
  seasons?: PlayerSeasonType[]
}