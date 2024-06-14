import { Game } from "./components/game/Game";

import { AppContextProvider } from "./appContext";
import { BoardSelect } from "./components/board-select/BoardSelect";
import { Sidebar } from "./components/sidebar/Sidebar";

export const Main = () => {
  return (
    <AppContextProvider>
      <div className="grid md:grid-cols-12 gap-5 h-full">
        <div className="md:col-span-3 p-4 border-1 bg-slate-50 border-solid border-r border-neutral-200">
          <div className="font-bold text-2xl">Tic Tac Toe</div>
          <Sidebar />
        </div>
        <div className="md:col-span-9 p-4">
          <div className="flex flex-col items-center gap-4 w-96 m-auto">
            <BoardSelect />
            <Game />
          </div>
        </div>
      </div>
    </AppContextProvider>
  );
};
