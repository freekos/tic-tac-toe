import { computerStep, winnerCheck } from "./gameBasic.js"
import data from "./data.js";

const resetPlace = document.querySelector(".reset");
const modal = document.querySelector(".modal");
const gridPlace = document.querySelector(".grid");

function createReset() {
    let reset = document.createElement("p");
    reset.className = "reset_p";
    reset.innerHTML = "reset";

    reset.addEventListener("click", () => {
        modal.style.display = "block";
        gridPlace.innerHTML = "";
        data.board.length = 0;
        let newBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        data.board.push(...newBoard);
    })

    resetPlace.append(reset);
}

window.addEventListener("load", () => {
    createReset();
})