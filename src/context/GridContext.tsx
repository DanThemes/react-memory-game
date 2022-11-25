import { createContext, Dispatch, useContext, useReducer } from "react";
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

interface StateInterface {
  grid: GridCell[];
  visible: GridCell[];
}

const generateGrid = (): GridCell[] => {
  let grid = Array(6)
    .fill("")
    .map((cell) => ({
      id: "",
      value: String(Math.floor(Math.random() * 3)),
      status: GridCellStatus.Initial,
    }));
  grid = grid
    .concat(grid)
    .map((cell) => ({ ...cell, id: uuidv4() }))
    .sort();

  return grid;
};

interface GridContextInterface {
  state: StateInterface;
  dispatch: React.Dispatch<any>;
}

interface ReducerAction {
  type: string;
  payload?: { id?: string; cell?: GridCell };
}

const initialState = {
  grid: generateGrid(),
  visible: [],
};

const GridContext = createContext<{
  state: StateInterface;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const useGridContext = () => {
  return useContext(GridContext);
};

const reducer = (
  state: StateInterface,
  action: ReducerAction
): StateInterface => {
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

    case GRID_ACTIONS.STATUS_SELECTED:
      return {
        ...state,
        grid: state.grid.map((cell: GridCell) =>
          action.payload && cell.id === action.payload.cell!.id
            ? { ...cell, status: GridCellStatus.Selected }
            : cell
        ),
      };

    case GRID_ACTIONS.STATUS_COMPLETED:
      return {
        ...state,
        grid: state.grid.map((cell: GridCell) => {
          if (
            cell.id === state.visible[0].id ||
            cell.id === state.visible[1].id
          ) {
            return { ...cell, status: GridCellStatus.Completed };
          }
          return cell;
        }),
      };

    case GRID_ACTIONS.ADD_TO_VISIBLE:
      return {
        ...state,
        visible: [...state.visible, action.payload!.cell!],
      };

    case GRID_ACTIONS.CLEAR_VISIBLE:
      return {
        ...state,
        visible: [],
      };

    case GRID_ACTIONS.RESTART:
      return {
        grid: generateGrid(),
        visible: [],
      };

    default:
      return state;
  }
};

interface ProviderProps {
  children?: React.ReactNode;
}

export const GridContextProvider: React.FC<ProviderProps> = ({ children }) => {
  // const [visible, setVisible] = useState<GridCell[]>([]);
  // const [grid, setGrid] = useState<GridCell[]>(generateGrid());

  const gridState = {
    grid: generateGrid(),
    visible: [],
  };

  const [state, dispatch] = useReducer(reducer, gridState);

  return (
    <GridContext.Provider value={{ state, dispatch }}>
      {children}
    </GridContext.Provider>
  );
};
