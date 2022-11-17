function makeCountObject() {
    const countObj = [];
    for (let i = 0; i < 10; i += 1) countObj.push(0);
    return countObj;
}

export function pluck(allCells, n = 0) {
    const puzzle = JSON.parse(JSON.stringify(allCells));
    /**
     * starts with a set of all 81 cells, and tries to remove one (randomly) at a time,
     * but not before checking that the cell can still be deduced from the remaining cells.
     * @type {Set}
     */
    const cells = new Set(Array.from(Array(81).keys()));
    const cellsLeft = new Set(cells);
    while (cellsLeft.size && cells.size > n) {
        const cell = randomChoice([...cells]);
        const x = Math.floor(cell / 9);
        const y = cell % 9;
        cellsLeft.delete(cell);
        /**
         * row, column and square record whether another cell in those groups could also take
         * on the value we are trying to pluck. (If another cell can, then we can't use the
         * group to deduce this value.) If all three groups are True, then we cannot pluck
         * this cell and must try another one.
         */
        let row = false;
        let column = false;
        let square = false;
        range(9).forEach((i) => {
            const rowPeer = { x: i, y };
            const columnPeer = { x, y: i };
            const squarePeer = {
                x: Math.floor(Math.floor(cell / 9) / 3) * 3 + Math.floor(i / 3),
                y: (Math.floor(cell / 9) % 3) * 3 + (i % 3),
            };
            if (rowPeer.x !== x) {
                row = canBeA(puzzle, rowPeer.x, rowPeer.y, cell);
            }
            if (columnPeer.y !== y) {
                column = canBeA(puzzle, columnPeer.x, columnPeer.y, cell);
            }
            if (squarePeer.x !== x && squarePeer.y !== y) {
                square = canBeA(puzzle, squarePeer.x, squarePeer.y, cell);
            }
        });
        if (row && column && square) {
            // eslint-disable-next-line no-continue
            continue;
        } else {
            // this is a pluckable cell!
            // eslint-disable-next-line no-param-reassign
            puzzle[x][y] = 0; // 0 denotes a blank cell
            /**
             * remove from the set of visible cells (pluck it)
             * we don't need to reset "cellsleft" because if a cell was not pluckable
             * earlier, then it will still not be pluckable now (with less information
             * on the board).
             */
            cells.delete(cell);
        }
    }
    return { puzzle, size: cells.size };
}

export function makeBoard({ puzzle }) {
    // create initial count object to keep track of conflicts per number value
    const rows = Array.from(Array(9).keys()).map(() => makeCountObject());
    const columns = Array.from(Array(9).keys()).map(() => makeCountObject());
    const squares = Array.from(Array(9).keys()).map(() => makeCountObject());
    const result = puzzle.map((row, i) =>
        row.map((cell, j) => {
            if (cell) {
                rows[i][cell] += 1;
                columns[j][cell] += 1;
                squares[Math.floor(i / 3) * 3 + Math.floor(j / 3)][cell] += 1;
            }
            return {
                value: puzzle[i][j] > 0 ? puzzle[i][j] : null,
                prefilled: !!puzzle[i][j],
            };
        })
    );

    return result;
    // return fromJS({
    //     puzzle: result,
    //     selected: false,
    //     choices: { rows, columns, squares },
    // });
}

function randomChoice(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}

export function range(n) {
    return Array.from(Array(n).keys());
}

// TODO use immutable when this is all working
export function makePuzzle() {
    while (true) {
        try {
            const puzzle = Array.from(Array(9).keys()).map(() =>
                Array.from(Array(9).keys())
            );
            const rows = Array.from(Array(9).keys()).map(
                () => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])
            );
            const columns = Array.from(Array(9).keys()).map(
                () => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])
            );
            const squares = Array.from(Array(9).keys()).map(
                () => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])
            );
            Array.from(Array(9).keys()).forEach((i) => {
                Array.from(Array(9).keys()).forEach((j) => {
                    const row = rows[i];
                    const column = columns[j];
                    const square =
                        squares[Math.floor(i / 3) * 3 + Math.floor(j / 3)];
                    const choices = [...row]
                        .filter((x) => column.has(x))
                        .filter((x) => square.has(x));
                    const choice = randomChoice(choices);
                    if (!choice) {
                        // eslint-disable-next-line no-throw-literal
                        throw "dead end";
                    }
                    puzzle[i][j] = choice;
                    column.delete(choice);
                    row.delete(choice);
                    square.delete(choice);
                });
            });
            return puzzle;
        } catch (e) {
            // eslint-disable-next-line no-continue
            continue;
        }
    }
}

/**
   * Answers the question: can the cell (i,j) in the puzzle contain the number
   in cell "c"
   * @param puzzle
   * @param i
   * @param j
   * @param c
   */
function canBeA(puzzle, i, j, c) {
    const x = Math.floor(c / 9);
    const y = c % 9;
    const value = puzzle[x][y];
    if (puzzle[i][j] === value) return true;
    if (puzzle[i][j] > 0) return false;
    // if not the cell itself, and the mth cell of the group contains the value v, then "no"
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const m in Array.from(Array(9).keys())) {
        const rowPeer = { x: m, y: j };
        const columnPeer = { x: i, y: m };
        const SquarePeer = {
            x: Math.floor(i / 3) * 3 + Math.floor(m / 3),
            y: Math.floor(j / 3) * 3 + (m % 3),
        };
        if (
            !(rowPeer.x === x && rowPeer.y === y) &&
            puzzle[(rowPeer.x, rowPeer.y)] === value
        )
            return false;
        if (
            !(columnPeer.x === x && columnPeer.y === y) &&
            puzzle[(columnPeer.x, columnPeer.y)] === value
        )
            return false;
        if (
            !(SquarePeer.x === x && SquarePeer.y === y) &&
            puzzle[(SquarePeer.x, SquarePeer.y)] === value
        )
            return false;
    }
    return true;
}

/**
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export function isPeer(a, b) {
    if (!a || !b) return false;
    const squareA = Math.floor(a.x / 3) * 3 + Math.floor(a.y / 3);
    const squareB = Math.floor(b.x / 3) * 3 + Math.floor(b.y / 3);
    return a.x === b.x || a.y === b.y || squareA === squareB;
}

export function createBoard(row, col, mines) {
    // Board for storing the values for each cell
    let board = [];
    // Tracking the minelocation
    let mineLocation = [];
    // Create blank board

    for (let x = 0; x < row; x++) {
        let subCol = [];
        for (let y = 0; y < col; y++) {
            subCol.push({
                value: 0,
                revealed: false,
                x: x,
                y: y,
                flagged: false,
            });
        }
        board.push(subCol);
    }

    // Randomize Bomb Placement
    let minesCount = 0;
    while (minesCount < mines) {
        // Implementing random function
        let x = random(0, row - 1);
        let y = random(0, col - 1);

        // placing bomb at random location(x,y) on board[x][y]
        if (board[x][y].value === 0) {
            board[x][y].value = "X";
            mineLocation.push([x, y]);
            minesCount++;
        }
    }

    // Increasing the value of specific cell
    // If the cell has mines increasing the cell value by 1.
    // Add Numbers
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (board[i][j].value === "X") {
                continue;
            }

            // Top
            if (i > 0 && board[i - 1][j].value === "X") {
                board[i][j].value++;
            }

            // Top Right
            if (i > 0 && j < col - 1 && board[i - 1][j + 1].value === "X") {
                board[i][j].value++;
            }

            // Right
            if (j < col - 1 && board[i][j + 1].value === "X") {
                board[i][j].value++;
            }

            // Botoom Right
            if (
                i < row - 1 &&
                j < col - 1 &&
                board[i + 1][j + 1].value === "X"
            ) {
                board[i][j].value++;
            }

            // Bottom
            if (i < row - 1 && board[i + 1][j].value === "X") {
                board[i][j].value++;
            }

            // Bottom Left
            if (i < row - 1 && j > 0 && board[i + 1][j - 1].value === "X") {
                board[i][j].value++;
            }

            // LEft
            if (j > 0 && board[i][j - 1].value === "X") {
                board[i][j].value++;
            }

            // Top Left
            if (i > 0 && j > 0 && board[i - 1][j - 1].value === "X") {
                board[i][j].value++;
            }
        }
    }
    return { board, mineLocation };
}

// Random function used for generating random value of x & y
function random(min = 0, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function revealed(arr, x, y, newNonMines) {
    // all the cells which are adjaced to zero must be stored in the array
    // so that it can be revealed later

    let show = [];
    show.push(arr[x][y]);
    while (show.length !== 0) {
        let one = show.pop();
        let i = one.x;
        let j = one.y;
        if (!one.revealed) {
            newNonMines--;
            one.revealed = true;
        }
        if (one.value !== 0) {
            break;
        }

        // top left

        if (
            i > 0 &&
            j > 0 &&
            arr[i - 1][j - 1].value === 0 &&
            !arr[i - 1][j - 1].revealed
        ) {
            show.push(arr[i - 1][j - 1]);
        }

        // bottom right

        if (
            i < arr.length - 1 &&
            j < arr[0].length - 1 &&
            arr[i + 1][j + 1].value === 0 &&
            !arr[i + 1][j + 1].revealed
        ) {
            show.push(arr[i + 1][j + 1]);
        }

        // top right

        if (
            i > 0 &&
            j < arr[0].length - 1 &&
            arr[i - 1][j + 1].value === 0 &&
            !arr[i - 1][j + 1].revealed
        ) {
            show.push(arr[i - 1][j + 1]);
        }

        // bottom left

        if (
            i < arr.length - 1 &&
            j > 0 &&
            arr[i + 1][j - 1].value === 0 &&
            !arr[i + 1][j - 1].revealed
        ) {
            show.push(arr[i + 1][j - 1]);
        }

        // top
        if (i > 0 && arr[i - 1][j].value === 0 && !arr[i - 1][j].revealed) {
            show.push(arr[i - 1][j]);
        }

        // right

        if (
            j < arr[0].length - 1 &&
            arr[i][j + 1].value === 0 &&
            !arr[i][j + 1].revealed
        ) {
            show.push(arr[i][j + 1]);
        }

        // bottom

        if (
            i < arr.length - 1 &&
            arr[i + 1][j].value === 0 &&
            !arr[i + 1][j].revealed
        ) {
            show.push(arr[i + 1][j]);
        }

        // left

        if (j > 0 && arr[i][j - 1].value === 0 && !arr[i][j - 1].revealed) {
            show.push(arr[i][j - 1]);
        }

        // start revealing the item

        if (i > 0 && j > 0 && !arr[i - 1][j - 1].revealed) {
            //Top Left Reveal

            arr[i - 1][j - 1].revealed = true;
            newNonMines--;
        }

        if (j > 0 && !arr[i][j - 1].revealed) {
            // Left Reveal
            arr[i][j - 1].revealed = true;
            newNonMines--;
        }

        if (i < arr.length - 1 && j > 0 && !arr[i + 1][j - 1].revealed) {
            //Bottom Left Reveal
            arr[i + 1][j - 1].revealed = true;
            newNonMines--;
        }

        if (i > 0 && !arr[i - 1][j].revealed) {
            //Top Reveal
            arr[i - 1][j].revealed = true;
            newNonMines--;
        }

        if (i < arr.length - 1 && !arr[i + 1][j].revealed) {
            // Bottom Reveal
            arr[i + 1][j].revealed = true;
            newNonMines--;
        }

        if (i > 0 && j < arr[0].length - 1 && !arr[i - 1][j + 1].revealed) {
            // Top Right Reveal
            arr[i - 1][j + 1].revealed = true;
            newNonMines--;
        }

        if (j < arr[0].length - 1 && !arr[i][j + 1].revealed) {
            //Right Reveal
            arr[i][j + 1].revealed = true;
            newNonMines--;
        }

        if (
            i < arr.length - 1 &&
            j < arr[0].length - 1 &&
            !arr[i + 1][j + 1].revealed
        ) {
            // Bottom Right Reveal
            arr[i + 1][j + 1].revealed = true;
            newNonMines--;
        }
    }

    return { arr, newNonMines };
}
