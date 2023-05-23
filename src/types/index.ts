export enum MatchEventTypes {
  MatchCalled = 'matchCalled',
  DecidingTeam = 'decidingTeam',
  FirstServe = 'firstServe',
  MatchStarted = 'matchStarted',
  MatchEnded = 'matchEnded',
  PeriodStart = 'periodStart',
  Point = 'point',
  PeriodScore = 'periodScore'
}

export enum ResultType {
  Ace = 'ace',
  DoubleFault = 'doubleFault',
  ReceiverWon = 'receiverWon',
  ServerWon = 'serverWon'
}

export enum TeamType {
  Home = 'home',
  Away = 'away'
}

type BaseEvent = {
  id: string;
  time: string;
};

export type MatchCalled = BaseEvent & {
  type: MatchEventTypes.MatchCalled;
};

export type DecidingTeam = BaseEvent & {
  type: MatchEventTypes.DecidingTeam;
  competitor: TeamType;
};

export type FirstServe = BaseEvent & {
  type: MatchEventTypes.FirstServe;
  competitor: TeamType;
};

export type MatchStarted = BaseEvent & {
  type: MatchEventTypes.MatchStarted;
};

export type MatchEnded = BaseEvent & {
  type: MatchEventTypes.MatchStarted;
};

export type PeriodStart = BaseEvent & {
  type: MatchEventTypes.PeriodStart;
  periodName: string;
};

export type Point = BaseEvent & {
  type: MatchEventTypes.Point;
  competitor: TeamType;
  homeScore: string;
  awayScore: string;
  server: TeamType;
  result: ResultType;
  firstServeFault: boolean;
};

export type PeriodScore = BaseEvent & {
  type: MatchEventTypes.PeriodScore;
  period: string;
  homeScore: string;
  awayScore: string;
  server: TeamType;
  result: ResultType.ReceiverWon | ResultType.ServerWon;
};

export type MatchUpdate = {
  clock: string;
  events: MatchEvent[];
};

export type MatchEvent =
  | MatchCalled
  | DecidingTeam
  | FirstServe
  | MatchStarted
  | MatchEnded
  | PeriodStart
  | Point
  | PeriodScore;
