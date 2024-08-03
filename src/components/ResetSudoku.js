export default function ResetSudoku({currBoard, setSudokuArr}) {

    function resetSudoku(){
        setSudokuArr(() => { 
          let sudoku = currBoard.map(row => [...row]);  // spread operator creates deep copy of initial board
          return sudoku;
        }) 
      }    

    return (
        <button className='bg-slate-200 mx-3 px-6 py-2 rounded-xl hover:bg-blue-500 hover:text-slate-50' onClick={resetSudoku}>Reset</button>
        
    )
}