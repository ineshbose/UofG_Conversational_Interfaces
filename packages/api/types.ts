export type Team = {
  id: number;
  name: string;
  code?: string;
  country?: string;
  founded?: number;
  national?: boolean;
  logo?: string;
};

export type Venue = {
  id: number;
  name: string;
  address: string;
  city: string;
  capacity: number;
  surface: string;
  image: string;
};

export type League = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
};

export type Score<T extends boolean = true> = {
  home: number;
  away: number;
  total: T extends true ? number : number | undefined;
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
  total: number;
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
  wins: number;
  draws: number;
  loses: number;
};

export type Lineup = { formation: string; played: number };

export type Penalty = {
  scored: MinuteMetric;
  missed: MinuteMetric;
  total: number;
};

export type Biggest = {
  streak: Streak;
  wins: Score<false>;
  loses: Score<false>;
  goals: Record<AltSide, Score<false>>;
};

export type Coach = {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
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
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: Record<AltSide, number>;
};

export type Standing = {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  update: string;
} & Record<"all" | Side, StandingMetric>;

export type Fixture = {
  id: number;
  referee: any;
  timezone: string;
  date: string;
  timestamp: number;
  periods: { first: number; second: any };
  venue: { id: number; name: string; city: string };
  status: { long: string; short: string; elapsed: number };
};

export type FixtureTimes = "halftime" | "fulltime" | "extratime" | "penality";

export type ApiResponse<P extends Record<string, any> | undefined, R> = {
  get: string;
  parameters: P;
  errors: Array<any>;
  results: number;
  paging: { current: number; total: number };
  response: R;
};

export type EndpointMap = {
  "/teams": ApiResponse<
    | Partial<{
        id: number;
        name: string;
        league: number;
        season: string;
        country: string;
        code: string;
        venue: number;
        search: string;
      }>
    | undefined,
    Array<{ team: Team; venue: Venue }>
  >;

  "/teams/statistics": ApiResponse<
    {
      league: number;
      season: string;
      team: number;
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
  "/teams/seasons": ApiResponse<{ team: number }, Array<number>>;
  "/coachs": ApiResponse<
    Partial<{ id: number; team: number; search: string }> | undefined,
    Array<Coach>
  >;
  "/standings": ApiResponse<
    { league?: number; season: string; team?: number },
    Array<League & { standings: Standing[][] }>
  >;
  "/fixtures": ApiResponse<
    | Partial<{
        id?: number;
        ids?: string;
        live?: string;
        date?: string;
        league?: number;
        season?: string;
        team?: number;
        last?: number;
        next?: number;
        from?: string;
        to?: string;
        round?: string;
        status?: string;
        venue?: number;
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
