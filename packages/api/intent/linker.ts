import { interact as _interact } from "../fetch";
import type { InfoType, Team, Venue } from "../types";
import { apostrophe, pluralise, withOrdinal } from "./utils";

export default async function <DR extends string>(
  intent: InfoType,
  rawTeam: Team,
  token: string,
  defaultResponse: DR
) {
  const options = { headers: { "x-rapidapi-key": token } };
  const interact: typeof _interact = (e, p) => _interact(e, p, options);
  let teamInfo: Team | undefined = rawTeam;

  if (!teamInfo.id) {
    teamInfo = (await interact("/teams", rawTeam)).response.pop()?.team;

    if (!teamInfo) {
      return "Couldn't find team";
    }
  }

  const team = teamInfo.id;
  const season = "2022"; // | (await interact("/teams/seasons", { team: team.id })).response.pop() | new Date().getFullYear();

  switch (intent) {
    case "lastOpponent": {
      const fixture = (
        await interact("/fixtures", { team, last: 1 })
      ).response.pop();
      const opponent = fixture
        ? Object.values(fixture.teams || {})
            .filter((i) => !new RegExp(teamInfo?.name || "").test(i.name))
            .pop()
        : undefined;

      return opponent
        ? `${teamInfo.name} played against ${opponent.name} last.`
        : "Couldn't find opponent";
    }

    case "lastScore": {
      const fixture = (
        await interact("/fixtures", { team, last: 1 })
      ).response.pop();

      return fixture?.goals
        ? `${apostrophe(teamInfo.name)} last score was ${Object.values(
            fixture.goals
          ).join("-")}.`
        : "Couldn't find score";
    }

    case "leaguePosition": {
      const standing = (await interact("/standings", { season, team })).response
        .filter((i) => ["Premier League"].includes(i.league.name))
        .pop()
        ?.league?.standings?.pop()
        ?.pop();

      return standing
        ? `${teamInfo.name} are in ${withOrdinal(standing.rank)} place in the ${
            standing.group
          } standings.` // ` with ${pluralise(standing.all.played, "match", "es")} played and ${pluralise(standing.all.win, "win")}.`
        : "Couldn't find standing";
    }

    case "manager": {
      const coach = (await interact("/coachs", { team })).response.pop();
      return coach
        ? `The manager/coach for ${teamInfo.name} is ${coach.name}`
        : "Couldn't find manager";
    }

    case "nextGameDate": {
      // not used yet
      const date = (
        await interact("/fixtures", { team, next: 1 })
      ).response.pop()?.fixture.date;

      return date
        ? `${teamInfo.name} are playing on ${new Date(date).toLocaleString(
            "en-GB"
          )} next.`
        : "Couldn't find opponent";
    }

    case "nextOpponent": {
      const fixture = (
        await interact("/fixtures", { team, next: 1 })
      ).response.pop();
      const opponent = fixture
        ? Object.values(fixture.teams || {})
            .filter((i) => !new RegExp(teamInfo?.name || "").test(i.name))
            .pop()
        : undefined;

      return opponent
        ? `${teamInfo.name} are playing against ${opponent.name} next.`
        : "Couldn't find opponent";
    }

    case "numGamesPlayed": {
      const standing = (await interact("/standings", { season, team })).response
        .filter((i) => ["Premier League"].includes(i.league.name))
        .pop()
        ?.league?.standings?.pop()
        ?.pop();

      return standing
        ? `${teamInfo.name} have played ${pluralise(
            standing.all.played,
            "match",
            "es"
          )} in the ${standing.group} standings so far.`
        : "Couldn't find standing";
    }

    case "playingNow": {
      const fixture = (
        await interact("/fixtures", {
          team,
          live: "all",
          season,
        })
      ).response.pop();
      return fixture ? "Yes" : "No";
    }

    case "winLossRecord": {
      const standing = (await interact("/standings", { season, team })).response
        .filter((i) => ["Premier League"].includes(i.league.name))
        .pop()
        ?.league?.standings?.pop()
        ?.pop();

      return standing
        ? `${teamInfo.name} have ${pluralise(
            standing.all.win,
            "win"
          )}, ${pluralise(standing.all.lose, "lose")} and ${pluralise(
            standing.all.draw,
            "draw"
          )} in the ${standing.group} standings so far.`
        : "Couldn't find standing";
    }

    case "default_teamInfo": {
      let venue: Venue | undefined;
      if (!teamInfo.founded) {
        const resp = (await interact("/teams", { id: team })).response.pop();
        teamInfo = resp?.team;
        venue = resp?.venue;
      }
      return teamInfo
        ? `${teamInfo.name}, founded in ${teamInfo.founded} are from ${
            teamInfo.country
          }${venue ? ` and their home is ${venue.name} in ${venue.city}` : ""}.`
        : "Couldn't find team";
    }

    default:
      return defaultResponse;
  }
}
