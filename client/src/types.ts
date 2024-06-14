export type XorO = "X" | "O";

export type Result = XorO | "Draw" | undefined;

export type Board = (XorO | undefined)[][];
