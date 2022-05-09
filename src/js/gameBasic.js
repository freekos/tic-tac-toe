import data from "./data.js";
import createScoreNum from "./score.js";

const modal = document.querySelector(".modal");
const gridPlace = document.querySelector(".grid");

function computerStep() {
    let row = Math.floor(Math.random() * 3);
    let col = Math.floor(Math.random() * 3);

    let squares = document.querySelectorAll(".square_container");
    let result;
    let full = 0;

    for(let square of squares) {
        let element = square.firstElementChild;
        let inner = element.innerHTML;
        if(+square.dataset.row === row && +square.dataset.col === col && inner === "") {
            data.board[row][col] = data.computer;
            result = element;
        }
        if(inner === '') {
            full += 1;
        }
    }

    if(result) {
        let symbol = document.createElement("p");
        if(data.computer === 1) {
            symbol.className = "symbol_x"
            symbol.innerHTML = "X";
            result.append(symbol);

        }else {
            symbol.className = "symbol_o"
            symbol.innerHTML = "O";
            result.append(symbol);
        }
    }else {
        if(full !== 0) {
            computerStep()
        }else {
            return;
        }
    }
}

//Winner checker
function winnerCheck() {
    //check col and row
    for(let i=0; i < 3; i++) {
        let resultCol = [];
        let resultRow = [];
        for(let y=0; y < 3; y++) {
            resultCol.push(data.board[y][i]);
            resultRow.push(data.board[i][y]);
        }


        let [firstCol, secondCol, threeCol] = resultCol;
        if(firstCol && secondCol && threeCol && (firstCol === secondCol) && (firstCol === threeCol)) {
            data.winner = firstCol;
            break;
        }

        let [firstRow, secondRow, threeRow] = resultRow;
        if(firstRow && secondRow && threeRow && (firstRow === secondRow) && (firstRow === threeRow)) {
            data.winner = firstRow;
            break;
        }
    }

    // First diagonal check
    let [ firstF, secondF, threeF ] = [ data.board[0][0], data.board[1][1], data.board[2][2] ];
    if(firstF && secondF && threeF && (firstF === secondF) && (firstF === threeF)) {
        data.winner = firstF;
    }

    //Second diagonal check
    let [ firstS, secondS, threeS ] = [ data.board[0][2], data.board[1][1], data.board[2][0] ];

    if(firstS && secondS && threeS && (firstS === secondS) && (firstS === threeS)) {
        data.winner = firstS;
    }

    if(data.winner) {
        modal.style.display = "block";
        gridPlace.innerHTML = "";
        data.board.length = 0;
        let newBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        data.board.push(...newBoard);
    }
}

export { computerStep, winnerCheck };