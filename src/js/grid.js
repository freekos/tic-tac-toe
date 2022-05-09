import { computerStep, winnerCheck } from "./gameBasic.js";
import data from "./data.js"

const gridPlace = document.querySelector(".grid");

const squareCount = 9;

function createSquare(row, col) {
    let squareContainer = document.createElement("div");
    let square = document.createElement("div");

    squareContainer.classList.add("square_container");
    squareContainer.dataset.row = row;
    squareContainer.dataset.col = col
    square.className = "square";

    square.addEventListener("click", (e) => {
        let target = e.target;
        let container = target.closest(".square_container");
        let inner = target.innerHTML;
        
        let symbol = document.createElement("p");

        if(inner === '') {
            if(data.player === 1) {
                symbol.className = "symbol_x"
                symbol.innerHTML = "X";
                target.append(symbol);

            }else {
                symbol.className = "symbol_o"
                symbol.innerHTML = "O";
                target.append(symbol);
            }

            let row = container.dataset.row;
            let col = container.dataset.col;

            data.board[row][col] = data.player;
            winnerCheck()
            computerStep();
            winnerCheck();
        }
    })

    squareContainer.append(square);
    gridPlace.append(squareContainer);
}

export { createSquare, squareCount };
