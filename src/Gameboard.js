import Ship from "./Ship";
import { COLUMNS, ROWS } from "./common";

const getArrayIndicies = (coords) => {
  const [col, row] = [
    COLUMNS.indexOf(String(coords[0]).toUpperCase()),
    parseInt(String(coords).slice(1)) - 1,
  ];

  if (col < 0 || col > 9 || row < 0 || row > 9)
    throw new Error("Invalid coordinates");

  return [col, row];
};

export default class GameBoard {
  constructor() {
    this.ships = 0;
    this.misses = 0;
    this.board = Array(COLUMNS.length);
    this.createBoard();
  }

  createBoard() {
    for (let i = 0; i < COLUMNS.length; i++) {
      this.board[i] = Array(ROWS.length);
      for (let j = 0; j < ROWS.length; j++) {
        this.board[i][j] = ""; //COLUMNS[i] + String(ROWS[j])
      }
    }
    // console.log(this.board);
  }

  randomlyPlaceShips() {
    const ships = [5, 4, 4, 3, 3, 3, 2, 2, 2, 2];
    ships.forEach((ship) => {
      while (true) {
        const direction = Math.ceil(Math.random() * 2);
        const startCol = COLUMNS[Math.floor(Math.random() * 10)];
        const startRow = ROWS[Math.floor(Math.random() * 10)];
        let endCol = "";
        let endRow = "";

        if (direction === 1) {
          // Horizontal
          endRow = startRow;
          endCol = COLUMNS[COLUMNS.indexOf(startCol) + ship - 1];
        } else {
          // Vertical
          endCol = startCol;
          endRow = ROWS.indexOf(startRow) + ship;
        }

        try {
          this.placeShip(startCol + startRow, endCol + endRow);
          console.log(
            `Placing ship of length ${ship} at ${startCol}${startRow}:${endCol}${endRow}`
          );
          break;
        } catch (err) {
          // console.log(err);
          console.log(
            `Placing again ${startCol}${startRow}:${endCol}${endRow}`
          );
        }
      }
    });
    console.dir(this.board);
  }

  placeShip(coordStart, coordEnd) {
    const [startCol, startRow] = getArrayIndicies(coordStart);
    const [endCol, endRow] = getArrayIndicies(coordEnd);

    if (startCol !== endCol && startRow !== endRow)
      throw new Error("Ship cannot be diagonal");

    if (startCol < endCol) {
      const ship = new Ship(endCol - startCol + 1);

      for (let i = 0; i < ship.length; i++) {
        if (this.board[startCol + i][startRow] !== "") {
          throw new Error("Ship in spot!");
        }
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[startCol + i][startRow] = ship;
      }
    } else {
      const ship = new Ship(endRow - startRow + 1);

      for (let i = 0; i < ship.length; i++) {
        if (this.board[startCol][startRow + i] !== "")
          throw new Error("Ship in spot!");
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[startCol][startRow + i] = ship;
      }
    }

    this.ships += 1;
  }

  receiveAttackV2(row, col) {
    const boardSquare = this.board[row][col];
    if (boardSquare === "") {
      this.board[row][col] = "O";
      this.misses += 1;
      return "O"; // true = valid movie
    } else if (boardSquare !== "X" && boardSquare !== "O") {
      boardSquare.hit();
      if (boardSquare.isSunk()) this.ships -= 1;
      this.board[row][col] = "X";
      return "X";
    }
  }

  receiveAttack(coords) {
    if (coords.length < 2 || typeof coords !== "string")
      throw new Error("Invalid Coordinates");
    const [col, row] = getArrayIndicies(coords);

    const boardSquare = this.board[col][row];
    if (boardSquare === "") {
      this.board[col][row] = "O";
      this.misses += 1;
      return "Miss";
    } else if (boardSquare !== "X" && boardSquare !== "O") {
      boardSquare.hit();
      if (boardSquare.isSunk()) this.ships -= 1;

      this.board[col][row] = "X";
      return "Hit";
    } else {
      return "Already struck";
    }
  }

  getMissedAttacks() {
    return this.misses;
  }

  shipsAlive() {
    return this.ships;
  }

  allSinksSunk() {
    return this.ships === 0;
  }
}
