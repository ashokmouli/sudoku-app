import React from 'react';
import SolveSudoku from './Sudoku.js'
import './App.css';


/* Array.slice() does not do a deep copy of a 2D array. This one does. */
function arrayClone(arr) {
  var i, copy;

  if (Array.isArray(arr)) {
    copy = arr.slice(0);
    for (i = 0; i < copy.length; i++) {
      copy[i] = arrayClone(copy[i]);
    }
    return copy;
  } else if (typeof arr === 'object') {
    throw 'Cannot clone array containing an object!';
  } else {
    return arr;
  }

}


class Square extends React.Component {

  handleInput() {
    const text = document.getElementById(this.props.id).innerHTML;
    if (text && text === "") {
      console.log("text: 0");
      this.props.onEnter("0");
    }
    else {
      console.log("text: " + text);
      this.props.onEnter(text);
    }

  }

  handleKeyDown(e) {    
    // console.log("e.keyCode: " + e.keyCode);
    if (e.keyCode === 8) { 
        // handle delete key. 
        document.getElementById(this.props.id).innerHTML = "";
        this.props.onEnter("0");
    }
    else if (e.keyCode >= 49 && e.keyCode <= 57) {
      // Key pressed is 1 through 9.
      // console.log(String.fromCharCode(e.keyCode));
      e.preventDefault();
      document.getElementById(this.props.id).innerHTML = "";
      this.props.onEnter(String.fromCharCode(e.keyCode));
    }
    else {
      // All other keystrokes ignored.
      e.preventDefault();
    }
  
  }

  componentDidMount() {
    // document.getElementById(this.props.id).addEventListener("input", (e) => this.handleInput())
    document.getElementById(this.props.id).addEventListener("keydown", (e) => { return this.handleKeyDown(e)})
  }

  render() {

    return (

      <label
        id={this.props.id}
        className={this.props.editModeOrUserSpecified ? 's-input' : 's-input read-only'}
        contentEditable={this.props.editMode ? "true" : "false"}
        suppressContentEditableWarning="true"
        title="Enter Initial Value"
      >
        {this.props.value === "0" ? "" : this.props.value}
      </label>
    )
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      history: null,
      solved: false,
    };
    this.handleSolve = this.handleSolve.bind(this);
    this.updateCells = this.updateCells.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSolve() {

    const squares = arrayClone(this.state.squares);
    const history = arrayClone(this.state.squares);

    // console.log("history: ");
    // console.log(history);
    SolveSudoku(squares);
    this.setState({
      squares: squares,
      history: history, // Save the initial values in history.
      solved: true,
    });
    //console.log("After: ");
    // console.log(this.state.history);
  }

  handleReset() {
    const squares = arrayClone(this.state.squares);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        squares[i][j] = 0;
      }
    }
    this.setState({ squares: squares, history: null, solved: false });
  }

  updateCells(value, row, col) {
    const squares = arrayClone(this.state.squares);
    squares[row][col] = parseInt(value)
    this.setState({ squares: squares });
    // console.log(this.state.squares);
  }

  generateGrid(rowOffset, colOffset) {
    return (
      <table className="s-table">
        <tbody>
          {
            this.state.squares.filter((row1, rowInd) => ((rowInd >= rowOffset) && (rowInd < (rowOffset + 3))) ? true : false).map((row, i) => {
              const rowIndex = i + rowOffset;
              // console.log("rowIndex: " + rowIndex);
              return (
                <tr key={rowIndex}>
                  {
                    row.filter((col1, colInd) => ((colInd >= colOffset) && (colInd < (colOffset + 3))) ? true : false).map((cell, j) => {
                      const colIndex = j + colOffset;
                      // console.log("colIndex: " + colIndex);
                      return (
                        <td className="s-table-data" key={rowIndex.toString() + colIndex}>
                          <Square
                            value={(this.state.squares[rowIndex][colIndex]).toString()}
                            onEnter={(value) => this.updateCells(value, rowIndex, colIndex)}
                            id={"cell" + rowIndex.toString() + colIndex.toString()}
                            // If the board is not solved or it is solved but this square was has a user entered value, 
                            // editModeOrUserSpecified is true.
                            editModeOrUserSpecified={(!this.state.solved || this.state.history[rowIndex][colIndex] !== 0) ? true : false}
                            editMode={!this.state.solved}
                          />
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="subgrid-row">
          <div className="subgrid-col">
            {this.generateGrid(0, 0)}
            {this.generateGrid(0, 3)}
            {this.generateGrid(0, 6)}
          </div>
          <div className="subgrid-col">
            {this.generateGrid(3, 0)}
            {this.generateGrid(3, 3)}
            {this.generateGrid(3, 6)}
          </div>
          <div className="subgrid-col">
            {this.generateGrid(6, 0)}
            {this.generateGrid(6, 3)}
            {this.generateGrid(6, 6)}
          </div>
        </div>
        <div className="s-button-list">
          <button className="square_btn" onClick={this.handleSolve} > Solve </button>
          <button className="square_btn" onClick={this.handleReset} > Reset </button>
        </div>
      </div>
    )
  }
}



export default Board;
