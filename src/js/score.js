import data from "./data.js";

const scoreText = document.querySelector(".score_text");
const scoreNum = document.querySelector(".score_num");

function createScoreText() {
    let scoreC = document.createElement("p");
    let scoreD = document.createElement("p");
    let scoreP = document.createElement("p");

    scoreC.className = "score_text_p";
    scoreD.className = "score_text_p";
    scoreP.className = "score_text_p";

    scoreC.innerHTML = "Computer";
    scoreD.innerHTML = "Draws";
    scoreP.innerHTML = "Player";

    scoreText.append(scoreC);
    scoreText.append(scoreD);
    scoreText.append(scoreP);
}

function createScoreNum(computerS, drawS, playerS) {
    let computerNum = document.createElement("p");
    let drawNum = document.createElement("p");
    let playerNum = document.createElement("p");

    computerNum.className = "score_num_p";
    drawNum.className = "score_num_p";
    playerNum.className = "score_num_p";

    computerNum.innerHTML = computerS === null ? 0 : computerS;
    drawNum.innerHTML = drawS === null ? 0 : drawS;
    playerNum.innerHTML = playerS === null ? 0 : playerS;

    scoreNum.innerHTML = "";
    scoreNum.append(computerNum);
    scoreNum.append(drawNum);
    scoreNum.append(playerNum);
}

window.addEventListener("load", ()=> {
    createScoreText();
    createScoreNum(data.scoreComputer, data.scoreDraw, data.scorePlayer);
});

export default createScoreNum;