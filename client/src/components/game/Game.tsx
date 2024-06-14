import React, { FC, useEffect, useState, useContext } from "react";
import { XorO, Result, Board as BoardType } from "../../types";

import { Board } from "../board/Board";

import { AppContext, AppContextType } from "../../appContext";

const generateInitialBoard = (maxRows: number) => {
  return Array.from(Array(maxRows), () => Array(maxRows).fill(undefined));
};

export const Game: FC = () => {
  const { maxRows } = useContext(AppContext) as AppContextType;
  const [currentPlayer, setCurrentPlayer] = useState<XorO>("X");
  const [result, setResult] = useState<Result>(undefined);
  const [board, setBoard] = useState<BoardType>(generateInitialBoard(maxRows));

  useEffect(() => {
    if (!result) {
      // Check rows to see if every item is the same
      for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        const row = board[rowIndex];
        if (row.every((i) => i === "X")) {
          setResult("X");
        } else if (row.every((i) => i === "O")) {
          setResult("O");
        }
      }

      if (result) {
        return;
      }

      // Check columns to see if every item is the same
      for (let columnIndex = 0; columnIndex < maxRows; columnIndex++) {
        const column = board.map((row) => row[columnIndex]);
        if (column.every((i) => i === "X")) {
          setResult("X");
        } else if (column.every((i) => i === "O")) {
          setResult("O");
        }
      }

      if (result) {
        return;
      }

      // Check diagonals (top left > bottom right, top right > bottom left)
      for (let diagonalIndex = 0; diagonalIndex < maxRows; diagonalIndex++) {
        let ltrStart = 0;

        // Top left to bottom right
        const ltrDiagonal: (XorO | undefined)[] = Array.from(
          Array(maxRows)
        ).reduce((acc, _) => {
          // Increment ltrStart so we can check the board values
          // i.e. board[0][0] > board[1][1] > board[2][2]
          const int = ltrStart++;
          return [...acc, board[int][int]];
        }, []);

        let rtlStart = maxRows - 1;
        let rtlEnd = 0;

        // Top right to bottom left
        const rtlDiagonal: (XorO | undefined)[] = Array.from(
          Array(maxRows)
        ).reduce((acc, _) => {
          // Increment rtlStart and rtlEnd in opposite directions, so we can check the board values
          // i.e. board[3][0] > board[1][1] > board[0][3]
          return [...acc, board[rtlStart--][rtlEnd++]];
        }, []);

        if (
          ltrDiagonal.every((i) => i === "X") ||
          rtlDiagonal.every((i) => i === "X")
        ) {
          setResult("X");
        } else if (
          ltrDiagonal.every((i) => i === "O") ||
          rtlDiagonal.every((i) => i === "O")
        ) {
          setResult("O");
        }
      }

      if (result) {
        return;
      }

      if (board.flat().every((i) => i !== undefined)) {
        setResult("Draw");
      }
    }
  }, [board, result]);

  useEffect(() => {
    handleReset();
  }, [maxRows]);

  const handleClick = ({ rowIndex, columnIndex, value }) => {
    const newBoard = [...board];
    const row = newBoard[rowIndex];
    row[columnIndex] = currentPlayer;
    newBoard[rowIndex] = row;
    setBoard(newBoard);

    if (currentPlayer === "X") {
      setCurrentPlayer("O");
    } else {
      setCurrentPlayer("X");
    }
  };

  const handleReset = () => {
    setResult(undefined);
    setBoard(generateInitialBoard(maxRows));
    setCurrentPlayer("X");
  };

  return (
    <>
      <div className="font-bold text-2xl">
        {!result && (
          <div className="text-center">
            <span className="mb-3 py-1 px-2 bg-slate-50 border-1 border border-gray-200">
              {currentPlayer}
            </span>
            <div className="mt-3">It's your go! 🥳</div>
          </div>
        )}
        {result && result !== "Draw" && (
          <div className="text-center">
            <span className="mb-3 py-1 px-2 bg-slate-50 border-1 border border-gray-200">
              {result}
            </span>
            <div className="mt-3">You win 🎉</div>
          </div>
        )}
        {result === "Draw" && (
          <div className="text-center">
            <span className="mb-3 py-1 px-2 bg-slate-50 border-1 border border-gray-200">
              👔
            </span>
            <div className="mt-3">It's a tie!</div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <Board board={board} result={result} handleClick={handleClick} />
      </div>
      {result && (
        <div className="font-bold text-2xl">
          <button
            className="bg-rose-500 py-1 px-2 text-base rounded-md text-white mb-4"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
    </>
  );
};
