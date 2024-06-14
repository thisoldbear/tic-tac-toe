export type XorO = "X" | "O";

export type Result = XorO | "Draw" | undefined;

export type Board = (XorO | undefined)[][];

export type Score = {
  _id: string;
  player: XorO;
  wins: number;
  losses: number;
};
