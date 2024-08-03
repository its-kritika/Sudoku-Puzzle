export default function SolveSudoku({ currBoard, setSudokuArr, solver }) {

  // function to solve the sudoku 
  function solveSudoku(){
    setSudokuArr(() => { 
      // we create copy of initial board so that in case player fills some wrong number, we can send correct initials to the solver function
      let solvedSudoku = currBoard.map(row => [...row]);  // spread operator creates deep copy of initial board
      solver(solvedSudoku)
      return solvedSudoku;
    }) 
  } 

    return (
        <button className='bg-blue-500 mx-3 w-20 py-3 text-slate-50 rounded-xl hover:font-medium' onClick={solveSudoku}>Solve</button>
          
    );
}