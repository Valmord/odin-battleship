import { display } from "./domHandler";
import { takeMove, createPlayers, players } from "./game";

const modalWindow = document.querySelector(".start-modal");
const modalForm = document.querySelector(".start-modal form");
const modalInput = document.querySelector(".start-modal input");

function addModalFormListener() {
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    modalWindow.style.display = "none";
    createPlayers(modalInput.value);
    display.activePlayer();
    display.board();
    gameListeners();
  });
}

function addSquareListeners() {
  const squares = document.querySelectorAll("td");
  squares.forEach((square) => {
    square.addEventListener(
      "click",
      (event) => {
        const player = square.parentElement.parentElement.dataset.player;
        console.log(players.current, player);

        if (players.current === player) return; // Wrong player field
        square.classList.add("clicked");
        const [row, col] = [square.dataset.row, square.dataset.col];
        square.textContent = takeMove(row, col, player);
      },
      { once: true }
    );
  });
}

export function startUpListeners() {
  addModalFormListener();
}

export function gameListeners() {
  addSquareListeners();
}
