import React, { useEffect, useState } from "react";

// enum GridCellStatus {
//   INITIAL = "initial",
//   SELECTED = "selected",
//   COMPLETED = "completed",
// }

const Grid = ({ grid, setGrid }) => {
  const [visible, setVisible] = useState<string[]>([]);

  const checkPairs() => {

  }

  const handleCellClick = (id: string) => {
    if (visible.length < 2) {
      if (id !== undefined) {
        setGrid(() =>
          grid.map((cell) =>
            cell.id === id ? { ...cell, status: "selected" } : cell
          )
        );
        setVisible(() => [...visible, id]);
      }
    }
  };

  useEffect(() => {
    if (visible.length == 2) {
      
      // setGrid(() => grid.map((cell) => ({ ...cell, status: "initial" })));
      // setVisible(() => []);
    }
  }, [visible]);

  return (
    <>
      {JSON.stringify(visible, null, 2)}
      <div className="grid">
        {grid.map(({ id, value, status }) => (
          <div
            onClick={() => handleCellClick(id)}
            key={id}
            className={`grid-cell ${status === "selected" ? "selected" : ""}`}
          >
            <div className="grid-cell-content">{value}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
