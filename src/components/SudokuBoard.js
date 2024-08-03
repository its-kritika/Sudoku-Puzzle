export default function SudokuBoard ({sudokuArr, currBoard, setSudokuArr}) {

  // to input number from keyboard
  function onInputChange(e, row, col){
    // e.target.value is the value user entered, this function is triggered with every keystroke of the user
    // here we set val can have -1 for case when we press backspace and reset the pos to empty string as -1 will result empty string
    var val = parseInt(e.target.value) || -1
    setSudokuArr((prevBoard) => {
      // const newBoard = [...prevBoard]  // this creates shallow copy of board

      const newBoard = prevBoard.map(row => [...row]);  // creating deep copy of the board
      if (val === -1 || (val >= 1 && val <= 9)){
        newBoard[row][col] = val
      }
    
      return newBoard;
    })
  }

  return (
    <table className=' bg-blue-500 border-2 my-4'>
          <tbody>
            {
              // creating 9 x 9 grid
              [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
                return <tr key = {rIndex} className={((row+1) % 3 === 0 && row !== 8) ? 'border-b-2 border-blue-700' : ''}>
                  {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                      return <td key = {cIndex} className= {((col+1) % 3 === 0  && col !== 8)? 'border-r-2 border-blue-700' : ''}>
                        {/* if val = -1 set the input initial val to empty */}
                        <input onChange={(e) => onInputChange(e, row, col)} 
                               value = {sudokuArr[row][col] === -1 ? '' : sudokuArr[row][col]} 
                               className='cell w-9 h-[38px] text-xl indent-3 md:indent-5 md:w-12 md:h-12'
                               disabled = {currBoard[row][col] !== -1}/> 
                               {/* disable the boxes which are not -1 so that they cannot be edited */}
                      </td>
                    })
                  }
                </tr>
              })

            }
          </tbody>
    </table>
  );
}