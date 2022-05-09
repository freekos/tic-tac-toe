import data from "./data.js";
import { createSquare, squareCount } from "./grid.js";
import { computerStep } from "./gameBasic.js";
import createScoreNum from "./score.js"

const modal = document.querySelector(".modal");
const gridPlace = document.querySelector(".grid");

function createMenu() {
    modal.style.display = "block";
    let menu = document.createElement("div");
    let chooseItem = document.createElement("div");
    let chooseX = document.createElement("p");
    let chooseO = document.createElement("p");
    let play = document.createElement("button");
    let noticeContainer = document.createElement("div");
    let notice = document.createElement("p");

    chooseItem.className = "menu_choose_item";
    chooseX.className = "menu_choose";
    chooseO.className = "menu_choose";

    play.className = "menu_play";
    menu.className = "menu";
    
    noticeContainer.className = "menu_notice_container";
    notice.className = "menu_notice";

    chooseX.innerHTML = "Choose X";
    chooseO.innerHTML = "Choose O";

    play.innerHTML = "Play";

    notice.innerHTML = "you must choose one of the options!!!";

    chooseX.addEventListener("click", () => {
        if(data.player === undefined) {
            data.player = 1;
            data.computer = 2;
            chooseX.style.textDecoration = "underline";
        }
        if(data.player === 2) {
            data.player = 1;
            data.computer = 2;
            chooseX.style.textDecoration = "underline";
            chooseO.style.textDecoration = "none";
        }
    });

    chooseO.addEventListener("click", () => {
        if(data.player === undefined) {
            data.player = 2;
            data.computer = 1;
            chooseO.style.textDecoration = "underline";
        }
        if(data.player === 1) {
            data.player = 2;
            data.computer = 1;
            chooseX.style.textDecoration = "none";
            chooseO.style.textDecoration = "underline";
        }
    });

    play.addEventListener("click", () => {
        if(data.player) {
            modal.style.display = "none";
            for(let i=0; i < squareCount / 3; i++) {
                for(let y=0; y < squareCount / 3; y++) {
                    createSquare(i, y);
                }
            }
            
            if(data.computer === 1) {
                computerStep()
            }
        }else {
            noticeContainer.append(notice);
            menu.prepend(noticeContainer)

            setTimeout(() => {
                noticeContainer.remove();
            }, 3500);
        }
    });

    chooseItem.append(chooseX);
    chooseItem.append(chooseO);
    menu.append(chooseItem);
    menu.append(play);
    modal.insertAdjacentElement("afterbegin", menu);

    return menu;
}

window.addEventListener("load", () => {
    let menu = createMenu();

    let winner = document.createElement("p");
    winner.className = "winner";
    menu.prepend(winner);
    setInterval(() => {
        if(modal.style.display !== "block") {
            let full = 0;
            for(let i=0; i < data.board.length; i++) {
                for(let y=0; y < data.board.length; y++) {
                    if(data.board[i][y] === 0) {
                        full += 1;
                    }
                }
            }

            if(full === 0 && !data.winner) {
                modal.style.display = "block";
                gridPlace.innerHTML = "";
                data.board.length = 0;
                let newBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                data.board.push(...newBoard);
                data.scoreDraw += 1;
                createScoreNum(data.scoreComputer, data.scoreDraw, data.scorePlayer);
            }
        }

        if(data.winner) {
            let won = data.winner === data.player ? "Player" : "Computer";
            if(won === "Player") {
                data.scorePlayer += 1;
                createScoreNum(data.scoreComputer, data.scoreDraw, data.scorePlayer);
            }else if(won === "Computer") {
                data.scoreComputer += 1;
                createScoreNum(data.scoreComputer, data.scoreDraw, data.scorePlayer);
            }
            winner.innerHTML = `Winner ${won}`;

            setTimeout(() => {
                data.winner = undefined;
                winner.innerHTML = ""; 
            }, 1500);
        }
    }, 2000)
});