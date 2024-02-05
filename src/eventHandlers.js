const modalWindow = document.querySelector(".start-modal");
const modalForm = document.querySelector(".start-modal form");
const modalInput = document.querySelector(".start-modal input");

function addModalFormListener() {
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    modalWindow.style.display = "none";
  });
}

export default function initListeners() {
  // addModalButtonListner();
  addModalFormListener();
}
