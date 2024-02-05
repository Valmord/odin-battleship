import displayBoard from "./domHandler";
import { createPlayers, players } from "./game";

const modalWindow = document.querySelector(".start-modal");
const modalForm = document.querySelector(".start-modal form");
const modalInput = document.querySelector(".start-modal input");

function addModalFormListener() {
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    modalWindow.style.display = "none";
    createPlayers(modalInput.value);
    displayBoard();
    addSquareListeners();
  });
}

function addSquareListeners() {
  const squares = document.querySelectorAll("td");
  squares.forEach((square) => {
    square.addEventListener("click", (event) => {
      if (square.textContent === "X" || square.textContent === "O") {
        alert("Invalid Move");
        return;
      }
      const player = square.parentElement.parentElement.dataset.player;
      const [row, col] = [square.dataset.row, square.dataset.col];
      const move = players[player].board.receiveAttackV2(row, col);
      square.textContent = move;
    });
  });
}

export function startUpListeners() {
  addModalFormListener();
}

export function gameListeners() {
  addSquareListeners();
}
