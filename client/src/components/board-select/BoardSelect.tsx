import { FC, useContext } from "react";
import { AppContext, AppContextType } from "../../appContext";

export const BoardSelect: FC = () => {
  const { maxRows, setMaxRows } = useContext(AppContext) as AppContextType;
  // Add an array of options. starting at 3
  // [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const options = Array.from({ length: 13 }, (_, i = 3) => i + 3);
  return (
    <>
      <label>Select a board size</label>
      <div className="grid w-40">
        <select
          className="appearance-none row-start-1 col-start-1 bg-slate-50 p-2 text-center border-2 mb-10 rounded-md cursor-pointer"
          value={maxRows}
          onChange={(e) => {
            setMaxRows(+e.target.value);
          }}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </>
  );
};
