import { Game } from "./components/game/Game";

import { AppContextProvider } from "./appContext";
import { BoardSelect } from "./components/board-select/BoardSelect";

export const Main = () => {
  return (
    <AppContextProvider>
      <div className="flex flex-col mt-10 items-center gap-10">
        <div className="font-bold text-2xl">Tic Tac Toe</div>
        <div className="flex flex-col items-center gap-4 w-96 m-auto">
          <BoardSelect />
          <Game />
        </div>
      </div>
    </AppContextProvider>
  );
};
