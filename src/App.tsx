import { useEffect, useState } from "react";
import "./App.css";
import Grid from "./components/Grid";

const generateGrid = () => {
  return Array(9)
    .fill("")
    .map((cell) => Math.floor(Math.random() * 3));
};

function App() {
  return (
    <div className="App">
      {JSON.stringify(generateGrid(), null, 2)}
      <Grid grid={generateGrid()} />
    </div>
  );
}

export default App;
