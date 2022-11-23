import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Grid from "./components/Grid";
import { useState } from "react";

const generateGrid = () => {
  return Array(9)
    .fill("")
    .map((cell) => ({
      id: uuidv4(),
      value: Math.floor(Math.random() * 3),
      status: "initial",
    }));
};

function App() {
  const [grid, setGrid] = useState(generateGrid());

  return (
    <div className="App">
      {/* {JSON.stringify(generateGrid(), null, 2)} */}
      <Grid grid={grid} setGrid={setGrid} />
    </div>
  );
}

export default App;
