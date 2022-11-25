import { createContext, useContext, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GRID_ACTIONS } from "./GridActions";

export enum GridCellStatus {
  Initial = "initial",
  Selected = "selected",
  Completed = "completed",
}

export interface GridCell {
  id: string;
  value: string;
  status: GridCellStatus;
}

const generateGrid = (): GridCell[] => {
  let grid = Array(6)
    .fill("")
    .map((cell) => ({
      id: "",
      value: String(Math.floor(Math.random() * 3)),
      status: GridCellStatus.Initial,
    }));
  console.log(grid);
  grid = grid
    .concat(grid)
    .map((cell) => ({ ...cell, id: uuidv4() }))
    .sort();

  console.log(grid);
  return grid;
};

const GridContext = createContext([]);

export const useGridContext = () => {
  return useContext(GridContext);
};

const reducer = (state, action) => {
  switch (action.type) {
    case GRID_ACTIONS.STATUS_INITIAL:
      return {
        ...state,
        grid: state.grid.map((cell: GridCell) => {
          if (
            cell.id === state.visible[0].id ||
            cell.id === state.visible[1].id
          ) {
            return { ...cell, status: GridCellStatus.Initial };
          }
          return cell;
        }),
      };
  }
};

interface ProviderProps {
  children?: React.ReactNode;
}

export const GridContextProvider: React.FC<ProviderProps> = ({ children }) => {
  // const [visible, setVisible] = useState<GridCell[]>([]);
  // const [grid, setGrid] = useState<GridCell[]>(generateGrid());

  const gridState = {
    grid: [],
    visible: [],
  };

  const [state, dispatch] = useReducer(reducer, gridState);

  return (
    <GridContext.Provider value={{ state, dispatch }}>
      {children}
    </GridContext.Provider>
  );
};
