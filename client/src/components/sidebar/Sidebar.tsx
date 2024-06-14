import { FC, useContext } from "react";

import { AppContext, AppContextType } from "../../appContext";

export const Sidebar: FC = () => {
  const { scores } = useContext(AppContext) as AppContextType;

  return (
    <>
      {scores && (
        <>
          <h2 className="text-2xl mt-10 mb-2">Scores</h2>
          <ul>
            {scores?.map(({ player, wins, losses }) => {
              return (
                <li className="mb-2" key={player}>
                  <p>
                    <strong>Player:</strong> {player}
                  </p>
                  <p>
                    <strong>Wins:</strong> {wins}
                  </p>
                  <p>
                    <strong>Losses:</strong> {losses}
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};
