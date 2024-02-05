import displayBoard from "./domHandler";
import { createPlayer, players } from "./storage";

const modalWindow = document.querySelector(".start-modal");
const modalForm = document.querySelector(".start-modal form");
const modalInput = document.querySelector(".start-modal input");

function addModalFormListener() {
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    modalWindow.style.display = "none";
    createPlayer(modalInput.value, "one", true);
    displayBoard();
  });
}

export default function initListeners() {
  // addModalButtonListner();
  addModalFormListener();
}
