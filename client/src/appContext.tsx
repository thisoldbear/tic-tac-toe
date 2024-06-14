import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import { Result, Score } from "./types";

export type AppContextType = {
  maxRows: number;
  setMaxRows: (rows: number) => void;
  result: Result;
  setResult: Dispatch<SetStateAction<Result>>;
  scores: Score[] | undefined;
};

const getScores = async (callback: Dispatch<SetStateAction<Score[]>>) => {
  await fetch(`http://localhost:3000/scores`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      callback(data);
    });
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [maxRows, setMaxRows] = useState<number>(3);
  const [result, setResult] = useState<Result>(undefined);
  const [scores, setScores] = useState<Score[] | undefined>(undefined);

  // Fetch initial scores
  useEffect(() => {
    getScores(setScores);
  }, []);

  // Post result to the endpoint
  useEffect(() => {
    if (result === "X" || result === "O") {
      const postResult = async () => {
        await fetch(
          `http://localhost:3000/update-scores/?winner=${result}&loser=${
            result === "X" ? "O" : "X"
          }`,
          {
            method: "POST",
            mode: "no-cors",
          }
        ).then(() => {
          getScores(setScores);
        });
      };

      postResult();
    }
  }, [result]);

  return (
    <AppContext.Provider
      value={{ maxRows, setMaxRows, result, setResult, scores }}
    >
      {children}
    </AppContext.Provider>
  );
};
