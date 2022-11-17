import Images from "./icon";

// Menu
export const MENU = [
    {
        id: 1,
        icon: Images.ICON_TTT,
        path: "/tic-tac-toe",
        content: "Tic-Tac-Toe",
    },
    { id: 2, icon: Images.ICON_SDK, path: "/sudoku", content: "Sudoku" },
    // { id: 3, icon: Images.ICON_CARO, path: "/ca-ro", content: "Caro" },
    {
        id: 3,
        icon: Images.ICON_BOOM,
        path: "/minesweeper",
        content: "Minesweeper",
    },
];

// All Action
export const ACTION = [
    { id: 1, path: "/one-people", content: "One People", key: "TicTacToe" },
    { id: 2, path: "/two-people", content: "Two People", key: "TicTacToe" },
    { id: 3, path: "/1", content: "Easy", key: "Sudoku" },
    { id: 4, path: "/2", content: "Normal", key: "Sudoku" },
    { id: 5, path: "/3", content: "Hard", key: "Sudoku" },
    { id: 6, path: "/1", content: "Easy", key: "Minesweeper" },
    { id: 7, path: "/2", content: "Normal", key: "Minesweeper" },
    { id: 8, path: "/3", content: "Hard", key: "Minesweeper" },
];

// TicTacToe
export const ACTION_TTT = [
    { id: 1, path: "/one-people", content: "One People" },
    { id: 1, path: "/two-people", content: "Two People" },
];

// Sudoku
export const ACTION_SDK = [
    { id: 1, path: "/1", content: "Easy" },
    { id: 2, path: "/2", content: "Normal" },
    { id: 3, path: "/3", content: "Hard" },
];

export const NAV_SDK = [{ id: 1, key: "verify", content: "Verify" }];

export const CTR_SDK = [
    { id: 1, key: "1", content: "1" },
    { id: 2, key: "2", content: "2" },
    { id: 3, key: "3", content: "3" },
    { id: 4, key: "4", content: "4" },
    { id: 5, key: "5", content: "5" },
    { id: 6, key: "6", content: "6" },
    { id: 7, key: "7", content: "7" },
    { id: 8, key: "8", content: "8" },
    { id: 9, key: "9", content: "9" },
    { id: 10, key: "delete", content: "Del" },
];

// Minesweeper

export const ACTION_MS = [
    { id: 1, path: "/1", content: "Easy" },
    { id: 2, path: "/2", content: "Normal" },
    { id: 3, path: "/3", content: "Hard" },
];
