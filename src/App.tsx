import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Grid from "./components/Grid";
import { useState } from "react";

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

function App() {
  const [grid, setGrid] = useState<GridCell[]>(generateGrid());

  return (
    <div className="App">
      <Grid grid={grid} setGrid={setGrid} />
    </div>
  );
}

export default App;
