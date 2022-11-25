import { useEffect, useState } from "react";
import { GRID_ACTIONS } from "../context/GridActions";
import { GridCell } from "../context/GridContext";
import { GridCellStatus } from "../context/GridContext";
import { useGridContext } from "../context/GridContext";

const Grid = () => {
  const { state, dispatch } = useGridContext();
  const [gameOver, setGameOver] = useState(false);

  const checkPairEquality = (visible: GridCell[]) => {
    if (visible.length === 2) {
      if (visible[0].value === visible[1].value) {
        setTimeout(() => {
          dispatch({ type: GRID_ACTIONS.STATUS_COMPLETED });
          dispatch({ type: GRID_ACTIONS.CLEAR_VISIBLE });
        }, 500);
      } else {
        setTimeout(() => {
          dispatch({ type: GRID_ACTIONS.STATUS_INITIAL });
          dispatch({ type: GRID_ACTIONS.CLEAR_VISIBLE });
        }, 500);
      }
    }
  };

  const handleCellClick = (cell: GridCell) => {
    if (cell.status !== GridCellStatus.Initial) return;
    if (state.visible.length === 2) return;
    if (gameOver) return;

    dispatch({ type: GRID_ACTIONS.ADD_TO_VISIBLE, payload: { cell } });
    dispatch({ type: GRID_ACTIONS.STATUS_SELECTED, payload: { cell } });
  };

  const checkGridComplete = (grid: GridCell[]) => {
    const gridComplete = grid.find((cell: GridCell) => {
      return (
        cell.status === GridCellStatus.Initial ||
        cell.status === GridCellStatus.Selected
      );
    });
    // return !gridComplete;
    if (!gridComplete) {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    dispatch({ type: GRID_ACTIONS.RESTART });
    setGameOver(false);
  };

  useEffect(() => {
    checkPairEquality(state.visible);
  }, [state.visible]);

  useEffect(() => {
    checkGridComplete(state.grid);
  }, [state.grid]);

  return (
    <>
      {/* {JSON.stringify(state.visible, null, 2)} */}
      {/* <br /> */}
      {/* {JSON.stringify(state.grid, null, 2)} */}
      <div className="grid">
        {state.grid.map((cell: GridCell) => (
          <div
            onClick={() => handleCellClick(cell)}
            key={cell.id}
            className={`grid-cell ${cell.status}`}
          >
            <div className="grid-cell-content">{cell.value}</div>
          </div>
        ))}
      </div>
      {gameOver ? (
        <>
          <h1>Game over</h1>
          <button onClick={restartGame}>Restart game</button>
        </>
      ) : null}
    </>
  );
};

export default Grid;
