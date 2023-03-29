import type { InfoType, Team } from "../types";

type Arrayable<T> = T | T[];
export type InfoParam = { team: Team; info?: Arrayable<InfoType> };

export const INFO_TYPES: Set<InfoType> = new Set([
  "lastOpponent",
  "lastScore",
  "leaguePosition",
  "manager",
  // "nextGameDate",
  "nextOpponent",
  "numGamesPlayed",
  "playingNow",
  "winLossRecord",
]);

// SafeNumber messing these up
export const withOrdinal = <T extends number | any>(i: T) => {
  const j = (i as number) % 10;
  const k = (i as number) % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
};

export const pluralise = <N extends number | any, W extends string>(
  num: N,
  word: W,
  plural = "s"
) => `${num} ${word}${(num as number) > 1 ? plural : ""}`;

export const apostrophe: {
  <T extends string>(w: T): T extends `${string}s` ? `${T}'` : `${T}'s`;
  <T extends string, E extends string>(w: T, end: E): T extends `${string}${E}` ? `${T}'` : `${T}'${E}`;
} = (word: string, end = "s") => `${word}'${word.endsWith(end) ? "" : end}` as any;
