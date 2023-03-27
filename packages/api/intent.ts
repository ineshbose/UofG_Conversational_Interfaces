import { interact } from "./fetch";
import type { InfoType, Team } from "./types";

type Arrayable<T> = T | T[];
type InfoParam = { team: Team; info?: Arrayable<InfoType> };

const INFO_TYPES: Set<InfoType> = new Set([
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
const withOrdinal = <T extends number | any>(i: T) => {
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

const pluralise = <N extends number | any, W extends string>(
  num: N,
  word: W,
  plural = "s"
) => `${num} ${word}${(num as number) > 1 ? plural : ""}`;

export async function infoLinker<DR extends string>(
  intent: InfoType,
  rawTeam: Team,
  token: string,
  defaultResponse: DR
) {
  const options = { headers: { "x-rapidapi-key": token } };
  let team: Team | undefined = rawTeam;

  if (!team.id) {
    team = (await interact("/teams", rawTeam, options)).response.pop()?.team;

    if (!team) {
      return "Couldn't find team";
    }
  }

  switch (intent) {
    case "lastOpponent":
      return 1;
    case "lastScore":
      return 1;
    case "leaguePosition": {
      const season = "2022"; // | (await interact("/teams/seasons", { team: team.id })).response.pop() | new Date().getFullYear();
      const standing = (
        await interact("/standings", { season, team: team.id }, options)
      ).response
        .pop()
        ?.league?.standings?.pop()
        ?.pop();

      return standing
        ? `${team.name} are in ${withOrdinal(
            standing.rank
          )} place with ${pluralise(
            standing.all.played,
            "match",
            "es"
          )} played and ${pluralise(standing.all.win, "win")}.`
        : "Couldn't find standing";
    }
    case "manager":
      return 1;
    case "nextGameDate":
      return 1;
    case "nextOpponent":
      return 1;
    case "numGamesPlayed":
      return 1;
    case "playingNow":
      return 1;
    case "winLossRecord":
      return 1;
    case "default_teamInfo":
      return 1;
    default:
      return defaultResponse;
  }
}

export async function getInfo(
  params: InfoParam,
  token: string,
  defaultResponse = "I don't know that"
) {
  const info = (
    Array.isArray(params.info)
      ? params.info
      : [params.info || "default_teamInfo"]
  ).filter((i) => INFO_TYPES.has(i));

  if (info.length === 0) {
    return defaultResponse;
  }

  return (
    await Promise.all(
      info.map((i) => infoLinker(i, params.team, token, defaultResponse))
    )
  ).join(". ");
}
