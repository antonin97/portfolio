import { useState, useEffect, useRef } from 'react';
import { ANTONIN_MARTYKAN32x97, A_M25x15, ANTONIN_MARTYKAN20x48 } from '../Functions/textx';
import { Link } from 'react-router-dom';


const GameOfLife = () => {

  console.log("GameOfLife component is mounting...");


  const generateInitGrid = (columns, rows) => {
    // add different logic for different screen sizes
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < columns; j++) {
            row.push(false)
        }
        grid.push(row);
    }

    let coordinates = [];
    let padding_left = 0;
    let padding_up = 0;

    if (rows > 34 && columns > 99) {
        coordinates = ANTONIN_MARTYKAN32x97
        padding_left = Math.floor((columns - 97) / 2)
        padding_up = Math.floor((rows - 32) / 2)
    } else if (rows > 22 && columns > 50) {
        coordinates = ANTONIN_MARTYKAN20x48
        padding_left = Math.floor((columns - 48) / 2)
        padding_up = Math.floor((rows - 20) / 2)
    }
    else {
        coordinates = A_M25x15
        padding_left = Math.floor((columns - 15) / 2)
        padding_up = Math.floor((rows - 25) / 2)
    }

    for (let dot of coordinates) {
        grid[dot[0] + padding_up][dot[1] + padding_left] = true;
    }
    return grid;
    };

    const generateNextGrid = (currentGrid) => {
        const newGrid = currentGrid.map((row, i) =>
          row.map((cell, j) => {
            const neighbors = [
              currentGrid[i - 1]?.[j - 1], currentGrid[i - 1]?.[j], currentGrid[i - 1]?.[j + 1],
              currentGrid[i]?.[j - 1], currentGrid[i]?.[j + 1],
              currentGrid[i + 1]?.[j - 1], currentGrid[i + 1]?.[j], currentGrid[i + 1]?.[j + 1],
            ].filter(neighbor => neighbor !== undefined);
            const numAliveNeighbors = neighbors.filter(neighbor => neighbor).length;
            if (cell && (numAliveNeighbors < 2 || numAliveNeighbors > 3)) {
              return false; // Cell dies
            } else if (!cell && numAliveNeighbors === 3) {
              return true; // Cell becomes alive
            } else {
              return cell; // Cell remains the same
            }
          })
        );
    
        return newGrid;
      };
      


      const [gridSize, setGridSize] = useState({
        cols: Math.floor(window.innerWidth / 15) - 2,
        rows: Math.floor(window.innerHeight / 15) - 7,
      });
    
      const [grid, setGrid] = useState(() => generateInitGrid(gridSize.cols, gridSize.rows));
      const speedRef = useRef(2000);
      const timeoutRef = useRef();

      useEffect(() => {
        console.log("Grid size:", gridSize);
      }, [gridSize]);

      useEffect(() => {
        console.log("window.innerWidth:", window.innerWidth);
        console.log("window.innerHeight:", window.innerHeight);
      }, []);
    
      useEffect(() => {
        const handleResize = () => {
          clearTimeout(timeoutRef.current);
          speedRef.current = 2000;
          timeoutRef.current = setTimeout(runGame, speedRef.current);
          const newGridSize = {
            cols: Math.floor(window.innerWidth / 15) - 2,
            rows: Math.floor(window.innerHeight / 15) - 7,
          };
          setGridSize(newGridSize);
          setGrid(generateInitGrid(newGridSize.cols, newGridSize.rows));
        };
    
        const runGame = () => {
          clearTimeout(timeoutRef.current); // Clear previous timeout
          setGrid((prevGrid) => generateNextGrid(prevGrid));
    
          // Decrease speed by 100ms after each iteration
          if (speedRef.current >= 180) {
            speedRef.current /= 1.6;
          }
    
          timeoutRef.current = setTimeout(runGame, speedRef.current);
        };
    
        // Add a timeout before starting the animation loop
        const initialTimeout = setTimeout(() => {
        runGame();
        }, 3000); // Set the desired initial timeout duration
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
          clearTimeout(timeoutRef.current);
          clearTimeout(initialTimeout); // Clear the initial timeout on component unmount
        };
      }, []);
    
      return (
        <div>
            <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridSize.cols}, 15px)`,
                gridTemplateRows: `repeat(${gridSize.rows}, 15px)`,
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
                    }}
                ></div>
                ))
            )}
            </div>
            <div style={{
                color: 'white',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Link to="/home">
                    <svg width="80" height="70" xmlns="http://www.w3.org/2000/svg">
                        <g>
                        <title>Layer 1</title>
                        <rect stroke="#148cc8" id="svg_2" height="30" width="60" y="20" x="10" fill="#148cc8"/>
                        <rect stroke="#148cc8" id="svg_3" height="10" width="40" y="10" x="20" fill="#148cc8"/>
                        <rect stroke="#148cc8" id="svg_4" height="10" width="20" y="0" x="30" fill="#148cc8"/>
                        <rect stroke="#148cc8" id="svg_5" height="10" width="80" y="30" x="0" fill="#148cc8"/>
                        <rect stroke="#148cc8" id="svg_6" height="20" width="20" y="82.77037" x="221.77778" fill="#148cc8"/>
                        <rect stroke="#148cc8" id="svg_7" height="20" width="20" y="50" x="10" fill="#148cc8"/>
                        <rect stroke="#148cc8" id="svg_8" height="20" width="20" y="50" x="50" fill="#148cc8"/>
                        </g>
                    </svg>
                </Link>
            </div>
        </div>
      );
    };
    
    export default GameOfLife;