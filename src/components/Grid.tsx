import React, { useState } from "react";

const Grid = ({ grid }: { grid: Array<number> }) => {
  const [visible, setVisible] = useState<number[]>([]);

  const handleCellClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    console.log(e.target);
    const value = Number(
      target.querySelector(".grid-cell-content")?.textContent ||
        target.closest(".grid-cell-content")?.textContent
    );

    if (visible.length < 2) {
      if (value !== undefined) {
        setVisible(() => [...visible, value]);
      }
    } else {
      //TODO: add delay
      //TODO: remove visible elements from the grid

      setVisible(() => []);
    }
  };

  return (
    <>
      {JSON.stringify(visible, null, 2)}
      <div className="grid">
        {grid.map((cell, idx) => (
          <div className="grid-cell" onClick={handleCellClick} key={idx}>
            <div className="grid-cell-content">{cell}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
