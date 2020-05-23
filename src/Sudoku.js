

function checkRow(arr, rowElement, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[rowElement][i] === val) {
            return false
        }
    }
    return true
}

function checkCol(arr, colElement, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][colElement] === val) {
            return false
        }
    }
    return true
}

function checkBox(arr, row, col, val) {
    var centerCol;
    var centerRow;
    if (col < 3) {
        centerCol = 1
    } else if (col < 6) {
        centerCol = 4
    } else if (col < 9) {
        centerCol = 7
    }

    if (row < 3) {
        centerRow = 1
    } else if (row < 6) {
        centerRow = 4
    } else if (col < 9) {
        centerRow = 7
    }

    if ((arr[centerRow - 1][centerCol - 1] === val) || (arr[centerRow - 1][centerCol] === val) ||
        (arr[centerRow - 1][centerCol + 1] === val) || (arr[centerRow][centerCol - 1] === val) ||
        (arr[centerRow][centerCol] === val) || (arr[centerRow][centerCol + 1] === val) ||
        (arr[centerRow + 1][centerCol - 1] === val) || (arr[centerRow + 1][centerCol] === val) ||
        (arr[centerRow + 1][centerCol + 1] === val)) {
        return false;
    }
    return true;
}

function check(arr, row, col, val) {
    return checkRow(arr, row, val) && checkCol(arr, col, val) && checkBox(arr, row, col, val);
}


function SolveSudoku(x) {

    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x[i].length; j++) {
            if (x[i][j] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (check(x, i, j, num)) {
                        x[i][j] = num;
                        if (!SolveSudoku(x)) {
                            x[i][j] = 0;
                        }
                        else {
                            return true;
                        }
                    }
                }
                return false
            }
        }
    }

    return true
}

/*
function sprint(x, row, col) {

    console.log(">>>>");

    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x[i].length; j++) {
            if (typeof row == "number" && typeof col == "number" && i == row && j == col) {
                process.stdout.write((x[i][j]).toString());

            }
            else {
                process.stdout.write((x[i][j]).toString());
            }
            process.stdout.write(" ")
        }
        process.stdout.write("\n")
    }
    console.log("<<<");

}


function testSudoku() {

    sudoku = [
        [8, 0, 1, 9, 2, 0, 0, 0, 0],
        [0, 4, 0, 8, 5, 0, 7, 2, 6],
        [0, 5, 6, 0, 7, 3, 0, 9, 0],
        [5, 9, 8, 0, 0, 4, 1, 0, 0],
        [7, 0, 0, 0, 0, 0, 5, 3, 0],
        [0, 0, 2, 6, 0, 0, 4, 0, 0],
        [9, 0, 0, 3, 0, 0, 6, 8, 0],
        [6, 8, 3, 1, 9, 0, 0, 5, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 3]
    ];
    sprint(sudoku);
    SolveSudoku(sudoku, 0, 0);

    console.log("Solution: ");

    sprint(sudoku);

}
*/

export default SolveSudoku;
