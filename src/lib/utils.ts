import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { themes } from "./themes"
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { NewsType, PlayerType, TeamSummaryType, TeamType } from "./type";
import { TEAMS } from "./constants";

dayjs.extend(advancedFormat)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function replaceWithDash(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export function getColor(name?: string, theme?: string) {
  if (!name) return "bg-blue-200";
  const formattedName = name.replace(/-/g, " ").replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  })
  return themes[formattedName][theme || "background"];
}

export function getAbbr(name: string) {
  return TEAMS[name].abbr || "ABBR";
}

export function convertDate(dateTime : string, format: string) {
  const date = dayjs(dateTime).format(format);
  return date
}

export const sortPlayers = (players: PlayerType[]) => {
  return players.sort((a, b) => {
    if (a.firstName < b.firstName) return -1;
    if (a.firstName > b.firstName) return 1;
    if (a.lastName < b.lastName) return -1;
    if (a.lastName > b.lastName) return 1;
    return 0;
  });
};

export function uniqueTeams(teams: TeamSummaryType[]) {
    // Create a map to store unique parent names
    const uniqueParents: { [parent: string]: boolean } = {};

    // Filter the teams array to include only teams with unique parents
    const uniqueTeamsArray = teams.filter(team => {
      if (!uniqueParents[team.parent]) {
        // If the parent is not present in the map, add it and return true
        uniqueParents[team.parent] = true;
        return true;
      }
      return false;
    });

    return uniqueTeamsArray;
  };

/**
 * regular expression to check for valid hour format (01-23)
 */
export function isValidHour(value: string) {
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);
}
 
/**
 * regular expression to check for valid 12 hour format (01-12)
 */
export function isValid12Hour(value: string) {
  return /^(0[1-9]|1[0-2])$/.test(value);
}
 
/**
 * regular expression to check for valid minute format (00-59)
 */
export function isValidMinuteOrSecond(value: string) {
  return /^[0-5][0-9]$/.test(value);
}
 
type GetValidNumberConfig = { max: number; min?: number; loop?: boolean };
 
export function getValidNumber(
  value: string,
  { max, min = 0, loop = false }: GetValidNumberConfig
) {
  let numericValue = parseInt(value, 10);
 
  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max;
      if (numericValue < min) numericValue = min;
    } else {
      if (numericValue > max) numericValue = min;
      if (numericValue < min) numericValue = max;
    }
    return numericValue.toString().padStart(2, "0");
  }
 
  return "00";
}
 
export function getValidHour(value: string) {
  if (isValidHour(value)) return value;
  return getValidNumber(value, { max: 23 });
}
 
export function getValid12Hour(value: string) {
  if (isValid12Hour(value)) return value;
  return getValidNumber(value, { max: 12 });
}
 
export function getValidMinuteOrSecond(value: string) {
  if (isValidMinuteOrSecond(value)) return value;
  return getValidNumber(value, { max: 59 });
}
 
type GetValidArrowNumberConfig = {
  min: number;
  max: number;
  step: number;
};
 
export function getValidArrowNumber(
  value: string,
  { min, max, step }: GetValidArrowNumberConfig
) {
  let numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    numericValue += step;
    return getValidNumber(String(numericValue), { min, max, loop: true });
  }
  return "00";
}
 
export function getValidArrowHour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 23, step });
}
 
export function getValidArrowMinuteOrSecond(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 59, step });
}
 
export function setMinutes(date: Date, value: string) {
  const minutes = getValidMinuteOrSecond(value);
  date.setMinutes(parseInt(minutes, 10));
  return date;
}
 
export function setSeconds(date: Date, value: string) {
  const seconds = getValidMinuteOrSecond(value);
  date.setSeconds(parseInt(seconds, 10));
  return date;
}
 
export function setHours(date: Date, value: string) {
  const hours = getValidHour(value);
  date.setHours(parseInt(hours, 10));
  return date;
}
 
export type TimePickerType = "minutes" | "seconds" | "hours"; // | "12hours";
export type Period = "AM" | "PM";
 
export function setDateByType(date: Date, value: string, type: TimePickerType) {
  switch (type) {
    case "minutes":
      return setMinutes(date, value);
    case "seconds":
      return setSeconds(date, value);
    case "hours":
      return setHours(date, value);
    default:
      return date;
  }
}
 
export function getDateByType(date: Date, type: TimePickerType) {
  switch (type) {
    case "minutes":
      return getValidMinuteOrSecond(String(date.getMinutes()));
    case "seconds":
      return getValidMinuteOrSecond(String(date.getSeconds()));
    case "hours":
      return getValidHour(String(date.getHours()));
    default:
      return "00";
  }
}
 
export function getArrowByType(
  value: string,
  step: number,
  type: TimePickerType
) {
  switch (type) {
    case "minutes":
      return getValidArrowMinuteOrSecond(value, step);
    case "seconds":
      return getValidArrowMinuteOrSecond(value, step);
    case "hours":
      return getValidArrowHour(value, step);
    default:
      return "00";
  }
}

export function NewsFilters(newsList: NewsType[], teams?: TeamType[]) {
  // Sort by createdAt (convert strings to Date objects for comparison)
  newsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Filter the newsList into featured and non-featured news
  const featuredNews = newsList.filter(news => news.featured === true);
  const filteredNews = newsList.filter(news => news.featured === false || news.featured === undefined);
  const leagueNews = newsList.filter(news =>
    teams?.some(team => news.tag === team.name)
  );

  // Sort leagueNews with featured news at the top, then by date
  leagueNews.sort((a, b) => {
    if (a.featured === b.featured) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return a.featured ? -1 : 1;
  });

  // Return or use the filtered lists as needed
  return {
    featuredNews,
    filteredNews,
    leagueNews: leagueNews || []
  };
}