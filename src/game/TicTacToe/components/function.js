const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

export function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every((elem) => plays.indexOf(elem) > -1)) {
            gameWon = {
                type: "win",
                content: `Congratulation winner: ${player}, restart game ? `,
                index: index,
                player: player,
            };
            break;
        }
    }
    return gameWon;
}

export function endGame(board) {
    let gameWon = {
        type: "draw",
        content: `Draw, restart game ?`,
        player: null,
    };

    // Draw
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i] === j) {
                gameWon = null;
            }
        }
    }
    return gameWon;
}

export function emptySquares(origBoard) {
    return origBoard.filter((s) => typeof s == "number");
}

export function bestSpot(origBoard) {
    return minimax(origBoard, "O");
}

export function checkTie(origBoard) {
    if (emptySquares(origBoard).length === 0) {
        return true;
    }
    return false;
}

export function minimax(newBoard, player) {
    var availSpots = emptySquares(newBoard);

    const aiPlayer = "O";
    const huPlayer = "X";

    if (checkWin(newBoard, huPlayer)) {
        return { score: -10 };
    } else if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }
    var moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player === aiPlayer) {
            let result = minimax(newBoard, huPlayer);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if (player === aiPlayer) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}
