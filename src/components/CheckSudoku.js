export default function CheckSudoku({currBoard, sudokuArr, solver}) {

    function compareSudoku(currSudoku, finalSudoku){
        let res = {
          isCompleted : true,
          isSolvable : true
        }
        for(let i = 0 ; i < 9; i++){
          for (let j = 0; j < 9; j++){
            if (currSudoku[i][j] !== finalSudoku[i][j]){
              if (currSudoku[i][j] !== -1){
                res.isSolvable = false  // sudoku is yet not completed
              }
              res.isCompleted = false // if wrong entry is filled sudoku becomes non-solvable
            }
          }
        }
        return res
      }

    function checkSudoku(){

        let solvedSudoku = currBoard.map(row => [...row]);
        solver(solvedSudoku)
        let compare = compareSudoku(sudokuArr, solvedSudoku)
        if (compare.isCompleted){
          alert('Congratulations! You got that right!');
        }
        else if (compare.isSolvable){
          alert('Go Ahead!!');
        }
        else{
          alert('Sudoku Cannot be solved!')
        }
    }

    return(
        <button className='bg-slate-200 mx-3 px-6 py-2 rounded-xl hover:bg-blue-500 hover:text-slate-50' onClick={checkSudoku}>Check</button>
    )
}