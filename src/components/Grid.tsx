import { useEffect, useState } from "react";
import { GridCell } from "../App";
import { GridCellStatus } from "../App";

interface GridProps {
  grid: GridCell[];
  setGrid: any;
}

const Grid = ({ grid, setGrid }: GridProps) => {
  const [visible, setVisible] = useState<GridCell[]>([]);

  const checkPairEquality = (grid: GridCell[], visible: GridCell[]) => {
    if (visible.length !== 2) return;

    if (visible[0].value === visible[1].value) {
      setGrid(
        grid.map((cell: GridCell) => {
          if (cell.id === visible[0].id || cell.id === visible[1].id) {
            return { ...cell, status: GridCellStatus.Completed };
          }
          return cell;
        })
      );
    } else {
      setTimeout(() => {
        setGrid(
          grid.map((cell: GridCell) => {
            if (cell.id === visible[0].id || cell.id === visible[1].id) {
              return { ...cell, status: GridCellStatus.Initial };
            }
            return cell;
          })
        );
      }, 500);
    }

    setVisible([]);
  };

  const handleCellClick = ({ id, status, value }: GridCell) => {
    if (status !== GridCellStatus.Initial) return;

    setVisible((prev) => [...prev, { id, status, value }]);

    setGrid((prev: GridCell[]) =>
      prev.map((cell: GridCell) =>
        cell.id === id ? { ...cell, status: GridCellStatus.Selected } : cell
      )
    );
  };

  useEffect(() => {
    checkPairEquality(grid, visible);
  }, [grid, visible]);

  return (
    <>
      {/* {JSON.stringify(visible, null, 2)} */}
      {/* <br /> */}
      {/* {JSON.stringify(grid, null, 2)} */}
      <div className="grid">
        {grid.map((cell: GridCell) => (
          <div
            onClick={() => handleCellClick(cell)}
            key={cell.id}
            className={`grid-cell ${cell.status}`}
          >
            <div className="grid-cell-content">{cell.value}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
