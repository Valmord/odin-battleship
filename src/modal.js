export default function createStartWindow() {
  const modalWindow = document.createElement("div");
  const container = document.createElement("div");
  modalWindow.classList.add("start-modal");

  const welcomeText = document.createElement("h2");
  welcomeText.textContent = "Welcome to battleship!";

  const inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", "name");
  inputLabel.textContent = "Input player name";
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Dwayne Pipe";
  input.id = "name";
  input.name = "name";
  input.requred = true;
  input.minLength = 2;
  inputLabel.appendChild(input);

  const button = document.createElement("button");
  button.textContent = "Start Game!";

  container.appendChild(welcomeText);
  container.appendChild(inputLabel);
  container.appendChild(button);

  document
    .querySelector("body")
    .appendChild(modalWindow)
    .appendChild(container);
}
