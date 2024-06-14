import { FC } from "react";
import { XorO, Result, Board as BoardType } from "../../types";

type BoardProps = {
  board: BoardType;
  result: Result;
  handleClick: ({ rowIndex, columnIndex }) => void;
};

export const Board: FC<BoardProps> = ({ board, result, handleClick }) => {
  return (
    <div className="flex flex-col gap-1">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((_, columnIndex) => (
            <div
              key={columnIndex}
              className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
            >
              <button
                className="w-full h-full"
                disabled={
                  result !== undefined ||
                  board[rowIndex][columnIndex] !== undefined
                }
                onClick={() =>
                  handleClick({
                    rowIndex,
                    columnIndex,
                  })
                }
              >
                {board[rowIndex][columnIndex]}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
