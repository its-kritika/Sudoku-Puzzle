import { useEffect } from 'react'

export default function CreateSudoku({setCurrBoard, setSudokuArr, solver}){

        // DSA, program for sudoku generator
        function fillDiagonal(sudoku){
            for (let i = 0; i < 9; i += 3){
            fillBox(sudoku, i, i)
            }
        }

        function isNumValidInGrid(sudoku, row, col, num){
            for(let i = 0; i < 9; i++){
            let idx_i = (Math.floor(row/3) * 3) + (Math.floor(i/3))
            let idx_j = (Math.floor(col/3) * 3) + i%3
            if (sudoku[idx_i][idx_j] === num){
                return false;
            }
            }
            return true
        }

        let num;
        function fillBox(sudoku, row, col){
            // we are required to fill exact 9 cells of a diagonal
            for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                while (true){
                num = Math.floor(Math.random() * 9 + 1)  //generate a random number for grid in loop so that in case same number is generated, loop gets executed again
                if (isNumValidInGrid(sudoku, row, col, num)){
                    break;
                }
                }
                sudoku[row + i][col + j] = num; // filling the box of 0 x 0, 3 x 3, 6 x 6 (diagonals)
            }
            }
        }

        function removeKdigits(sudoku){
            let k = 41
            while (k > 0){
            let i = Math.floor(Math.random() * 9)  // generating random indices to remove
            let j = Math.floor(Math.random() * 9)
            if (sudoku[i][j] !== -1){
                k--
                sudoku[i][j] = -1
            }
            }
            return
        }
    
        const handleNewGame = () => {
            let initial = Array(9).fill().map(() => Array(9).fill(-1));
        
            // sudoku generator
            fillDiagonal(initial)
            solver(initial)
            removeKdigits(initial)
        
            setCurrBoard(initial) // setting a state variable causes re-rendering of App component and everytime we set App is called and that's why infinite loop occurs
            setSudokuArr(initial) // but here useEffect is not req bcoz react hooks are used directly in the root component and not in a nested function. Also this doesn't require useEffect as it is function is called only when 'New Game' button is clicked
        }
        
        // handleNewGame will be executed once
        useEffect(() => {
            handleNewGame();
            // eslint-disable-next-line
            }, []);


    return (
        <button className='bg-blue-600 py-2 w-[90%] mt-8 md:mt-0 md:w-[31%] text-white rounded-sm hover:font-medium' onClick={handleNewGame}>New Game</button>
    
    )
}