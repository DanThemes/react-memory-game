import { useState } from "react";

// enum GridCellStatus {
//   INITIAL = "initial",
//   SELECTED = "selected",
//   COMPLETED = "completed",
// }

interface GridCell {
  id: string;
  value: string;
  status: string;
}

interface GridProps {
  grid: [];
  setGrid: any;
}

const Grid = ({ grid, setGrid }: GridProps) => {
  const [visible, setVisible] = useState<GridCell[]>([]);

  const checkPairs = () => {
    if (visible[0].value === visible[1].value) {
      setGrid((prev: GridCell[]) => {
        prev.map((cell: GridCell) => {
          if (cell.id === visible[0].value || cell.id === visible[1].value) {
            return { ...cell, status: "completed" };
          }
          return cell;
        });
      });
    }
  };

  const handleCellClick = (cell: GridCell) => {
    if (visible.length === 1) {
      checkPairs();
      setGrid((prev: GridCell[]) =>
        prev.map((cell: GridCell) => {
          if (cell.status === "selected") {
            return { ...cell, status: "initial" };
          }
          return cell;
        })
      );
      setVisible(() => []);
    } else if (visible.length < 2) {
      // console.log(cell);
      const id = cell.id;
      setGrid((prev: GridCell[]) =>
        prev.map((cell: GridCell) =>
          cell.id === id ? { ...cell, status: "selected" } : cell
        )
      );
      setVisible(() => [...visible, cell]);
    }
  };

  return (
    <>
      {JSON.stringify(visible, null, 2)}
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
