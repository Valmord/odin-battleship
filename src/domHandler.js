import { COLUMNS, ROWS } from "./common";
import { players } from "./game";

function createBoard(player, shown) {
  const table = document.createElement("table");
  table.dataset.player = player;

  // Create Table Header
  const headerRow = document.createElement("tr");
  const firstRow = document.createElement("th");
  headerRow.appendChild(firstRow);
  for (let i = 0; i < COLUMNS.length; i++) {
    const colHeader = document.createElement("th");
    colHeader.textContent = COLUMNS[i];
    headerRow.appendChild(colHeader);
  }
  table.appendChild(headerRow);

  // Create Table Body
  for (let i = 0; i < ROWS.length; i++) {
    const row = document.createElement("tr");
    const rowHeader = document.createElement("th");
    rowHeader.textContent = i + 1;
    row.appendChild(rowHeader);
    for (let j = 0; j < COLUMNS.length; j++) {
      const col = document.createElement("td");
      if (shown && players[player].board.board[i][j]) col.textContent = "S";
      else col.textContent = "";
      col.dataset.col = j;
      col.dataset.row = i;
      row.appendChild(col);
    }
    table.appendChild(row);
  }
  return table;
}

function createBoardContainer(player, show) {
  const playerBoard = document.createElement("div");
  playerBoard.classList.add("player-one-board");
  playerBoard.appendChild(createBoard(player, show));

  const tableOwner = document.createElement("h4");
  tableOwner.textContent = `Player: ${players[player].name}`;
  playerBoard.appendChild(tableOwner);

  return playerBoard;
}

export default function displayBoard() {
  const player1 = createBoardContainer("one", true);
  const player2 = createBoardContainer("two", true);

  const boardContainer = document.querySelector(".board-container");
  boardContainer.appendChild(player1);
  boardContainer.appendChild(player2);
}
