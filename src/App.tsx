import "./App.css";
import Grid from "./components/Grid";
import { GridContextProvider } from "./context/GridContext";

function App() {
  return (
    <div className="App">
      <GridContextProvider>
        <Grid />
      </GridContextProvider>
    </div>
  );
}

export default App;
