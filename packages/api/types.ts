type SafeNumber = number | string;

export type Team = {
  id: SafeNumber;
  name: string;
  code?: string;
  country?: string;
  founded?: SafeNumber;
  national?: boolean;
  logo?: string;
};

export type Venue = {
  id: SafeNumber;
  name: string;
  address: string;
  city: string;
  capacity: SafeNumber;
  surface: string;
  image: string;
};

export type League = {
  id: SafeNumber;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: SafeNumber;
};

export type Score<T extends boolean = true> = {
  home: SafeNumber;
  away: SafeNumber;
  total: T extends true ? SafeNumber : SafeNumber | undefined;
};

export type ScoreFixtures = Record<
  "played" | "wins" | "draws" | "loses",
  Score
>;

export type Side = "home" | "away";
export type AltSide = "for" | "against";

export type Goal = {
  total: Score;
  average: Score;
  minute: MinuteMetrics;
};

export type Card = "yellow" | "red";

export type MinuteMetric = {
  total: SafeNumber;
  percentage: string;
};

export type Minutes =
  | "0-15"
  | "16-30"
  | "31-45"
  | "46-60"
  | "61-75"
  | "76-90"
  | "91-105"
  | "106-120";

export type MinuteMetrics = Record<Minutes, MinuteMetric>;

export type Streak = {
  wins: SafeNumber;
  draws: SafeNumber;
  loses: SafeNumber;
};

export type Lineup = { formation: string; played: SafeNumber };

export type Penalty = {
  scored: MinuteMetric;
  missed: MinuteMetric;
  total: SafeNumber;
};

export type Biggest = {
  streak: Streak;
  wins: Score<false>;
  loses: Score<false>;
  goals: Record<AltSide, Score<false>>;
};

export type Coach = {
  id: SafeNumber;
  name: string;
  firstname: string;
  lastname: string;
  age: SafeNumber;
  birth: {
    date: string;
    place: string;
    country: string;
  };
  nationality: string;
  height: string;
  weight: string;
  photo: string;
  team: Team;
  career: Array<{
    team: Team;
    start: string;
    end?: string;
  }>;
};

export type StandingMetric = {
  played: SafeNumber;
  win: SafeNumber;
  draw: SafeNumber;
  lose: SafeNumber;
  goals: Record<AltSide, SafeNumber>;
};

export type Standing = {
  rank: SafeNumber;
  team: Team;
  points: SafeNumber;
  goalsDiff: SafeNumber;
  group: string;
  form: string;
  status: string;
  description: string;
  update: string;
} & Record<"all" | Side, StandingMetric>;

export type Fixture = {
  id: SafeNumber;
  referee: any;
  timezone: string;
  date: string;
  timestamp: SafeNumber;
  periods: { first: SafeNumber; second: any };
  venue: { id: SafeNumber; name: string; city: string };
  status: { long: string; short: string; elapsed: SafeNumber };
};

export type FixtureTimes = "halftime" | "fulltime" | "extratime" | "penality";

export type ApiResponse<P extends Record<string, any> | undefined, R> = {
  get: string;
  parameters: P;
  errors: Array<any>;
  results: SafeNumber;
  paging: { current: SafeNumber; total: SafeNumber };
  response: R;
};

export type EndpointMap = {
  "/teams": ApiResponse<
    | Partial<{
        id: SafeNumber;
        name: string;
        league: SafeNumber;
        season: string;
        country: string;
        code: string;
        venue: SafeNumber;
        search: string;
      }>
    | undefined,
    Array<{ team: Team; venue: Venue }>
  >;

  "/teams/statistics": ApiResponse<
    {
      league: SafeNumber;
      season: string;
      team: SafeNumber;
      date?: string;
    },
    {
      league: League;
      team: Team;
      form: string;
      fixtures: ScoreFixtures;
      goals: Record<AltSide, Goal>;
      biggest: Biggest;
      clean_sheet: Score;
      failed_to_score: Score;
      penalty: Penalty;
      lineups: Lineup[];
      cards: Record<Card, MinuteMetrics>;
    }
  >;
  "/teams/seasons": ApiResponse<{ team: SafeNumber }, Array<SafeNumber>>;
  "/coachs": ApiResponse<
    Partial<{ id: SafeNumber; team: SafeNumber; search: string }> | undefined,
    Array<Coach>
  >;
  "/standings": ApiResponse<
    { league?: SafeNumber; season: string; team?: SafeNumber },
    Array<{ league: League & { standings: Standing[][] } }>
  >;
  "/fixtures": ApiResponse<
    | Partial<{
        id?: SafeNumber;
        ids?: string;
        live?: string;
        date?: string;
        league?: SafeNumber;
        season?: string;
        team?: SafeNumber;
        last?: SafeNumber;
        next?: SafeNumber;
        from?: string;
        to?: string;
        round?: string;
        status?: string;
        venue?: SafeNumber;
        timezone?: string;
      }>
    | undefined,
    Array<{
      fixture: Fixture;
      league: League & { round: string };
      teams: Record<Side, Team & { winner: boolean }>;
      goals: Score<false>;
      score: Record<FixtureTimes, Score<false>>;
    }>
  >;
};

export type InfoType =
  | "lastOpponent"
  | "lastScore"
  | "leaguePosition"
  | "manager"
  | "nextGameDate"
  | "nextOpponent"
  | "numGamesPlayed"
  | "playingNow"
  | "winLossRecord"
  | "default_teamInfo";
