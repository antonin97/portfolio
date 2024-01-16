import { useState, useEffect } from 'react';


const GameOfLife = () => {

  const generateEmptyGrid = (columns, rows) => {
    const result = [];
    for (let i = 0; i < columns; i++) {
        result.push(Array(rows).fill(false));
    }
    console.log(columns, rows)
    return result;
    };
      
  const [gridSize, setGridSize] = useState({
    cols: Math.floor(window.innerWidth / 20),
    rows: Math.floor(window.innerHeight / 20),
  });
  const [grid, setGrid] = useState(() => generateEmptyGrid(gridSize.cols, gridSize.rows));

  useEffect(() => {
    const handleResize = () => {
      const newGridSize = {
        cols: Math.floor(window.innerWidth / 20),
        rows: Math.floor(window.innerHeight / 20),
      };
      setGridSize(newGridSize);
      setGrid(generateEmptyGrid(newGridSize.cols, newGridSize.rows));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize.cols}, 20px)`,
        gridTemplateRows: `repeat(${gridSize.rows}, 20px)`,
        gap: '0',
      }}
    >
      {grid.map((rows, i) =>
        rows.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: cell ? 'white' : 'black',
              border: '1px solid #ccc',
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default GameOfLife;
