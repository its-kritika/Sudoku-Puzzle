import './App.css';
import { useState } from 'react'
import SudokuBoard from './components/SudokuBoard';
import CheckSudoku from './components/CheckSudoku';
import ResetSudoku from './components/ResetSudoku';
import CreateSudoku from './components/CreateSudoku';
import SolveSudoku from './components/SolveSudoku';

const initialSudoku = Array(9).fill().map(() => Array(9).fill(-1));

function App() {
  //  sudokuArr is manage currGame but currGame state variable is used to manage newly generated games
  const [currBoard, setCurrBoard] = useState(initialSudoku)
  const [sudokuArr, setSudokuArr] = useState(initialSudoku)
  
  // DSA, program for sudoku solver
  function isValid(grid, row, col, num){
    for(let i = 0; i < 9; i++){
      if (grid[row][i] === num){
        return false;
      }
      if (grid[i][col] === num){
        return false;
      }
      // to check num in corresponding 3x3 grid
      let idx_i = (Math.floor(row/3) * 3) + (Math.floor(i/3))
      let idx_j = (Math.floor(col/3) * 3) + i%3
      if (grid[idx_i][idx_j] === num){
        return false;
      }
    }
      return true;
    } 

  // recursive function to solve sudoku
  function solver(grid, row = 0, col = 0){
    if (row === 9){
      return true;
    }
    if (col === 9){
      return solver(grid, row+1, 0)
    }
    if (grid[row][col] === -1){
      for(let i = 1; i <= 9; i++){
        if (isValid(grid, row, col, i)){
          grid[row][col] = i
          if (solver(grid, row, col+1)){
            return true
          }
          else{
            grid[row][col] = -1
          }
        }
      }
      return false
    }
    return solver(grid, row, col+1)
  }

  return ( 
    <div className="App">
      <div className='flex flex-col items-center h-full justify-center'>
        <CreateSudoku setCurrBoard = {setCurrBoard} setSudokuArr = {setSudokuArr} solver={solver}/>

        <SudokuBoard sudokuArr={sudokuArr} currBoard={currBoard} setSudokuArr={setSudokuArr} /> 

        <div className='my-1'>
          <CheckSudoku currBoard = {currBoard} sudokuArr = {sudokuArr} solver = {solver}/>
          <SolveSudoku currBoard={currBoard} setSudokuArr = {setSudokuArr} solver={solver}/>
          <ResetSudoku currBoard = {currBoard} setSudokuArr = {setSudokuArr}/>
        </div>
      </div>
    </div>
  );
}

export default App;
