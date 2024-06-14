import axios from "axios"
import { FixtureType, SeasonType, LeagueSummaryType, TeamSummaryType, LeagueType, TeamType } from "./type";

export async function getLeagues(): Promise<LeagueSummaryType[]> {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/v1/leagues/list");
    return response.data as LeagueSummaryType[];
  } catch (error) {
    // Handle errors
    console.error('Error fetching leagues:', error);
    return [];
  }
}

export async function getLeagueName(name: string): Promise<LeagueType> {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/v1/leagues/league?name=${name}`)
    return response.data[0] as LeagueType;
  } catch (error) {
    // Handle errors
    console.error('Error fetching leagues:', error);
    return {
      _id: "",
      league: "",
      seasons: []
    }
  }
}

export async function getLeague(id :string): Promise<LeagueType> {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/v1/leagues/${id}`);
    return response.data as LeagueType;
  } catch (error) {
    // Handle errors
    console.error('Error fetching leagues:', error);
    return {
      _id: "",
      league: "",
      seasons: []
    }
  }
}

export async function getLeagueSummary(id :string): Promise<SeasonType> {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/v1/leagues/${id}/list`);
    return response.data as SeasonType;
  } catch (error) {
    // Handle errors
    console.error('Error fetching leagues:', error);
    return {
      _id: "",
      table: [],
      fixtures: [],
      status: "",
      season: "",
      teams: []
    }
  }
}

export async function getFixtures(leagueId : string): Promise<FixtureType[]> {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/v1/leagues/${leagueId}/upcomingFixtures`);
    return response.data as FixtureType[];
  } catch (error) {
    // Handle errors
    console.error('Error fetching leagues:', error);
    return [];
  }
}

export async function getAllLeagueData(): Promise<LeagueType[]> {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/v1/leagues");
    return response.data as LeagueType[];
  } catch (error) {
    // Handle errors
    console.error('Error fetching leagues:', error);
    return [];
  }
}

export async function getTeams(): Promise<TeamSummaryType[]> {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/v1/teams/list");
    return response.data as TeamSummaryType[];
  } catch (error) {
    // Handle errors
    console.error('Error fetching leagues:', error);
    return [];
  }
}

export async function getTeamById(id: string): Promise<TeamType> {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/v1/teams/${id}`);
    return response.data as TeamType;
  } catch (error) {
    // Handle errors
    console.error('Error fetching leagues:', error);
    return {
      _id: "",
      name: "",
      ground: [""],
      seasons: []
    };
  }
}

export async function getTeamByName(name: string, year: string): Promise<TeamType> {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/v1/teams?team=${name}&year=${year}`);
    return response.data as TeamType;
  } catch (error) {
    // Handle errors
    console.error('Error fetching leagues:', error);
    return {
      _id: "",
      name: "",
      ground: [""],
      season: {
        season: "",
        status: "",
        league: {
          _id: "",
          league: ""
        },
        manager: "",
        players: [{
          _id: "",
          firstName: "",
          lastName: "",
          number: 0,
          position: ""
        }],
        _id: ""
      },
      parent: "",
      fixtures: []
    };
  }
}