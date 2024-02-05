import Ship from "./Ship";

const COLUMNS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const getArrayIndicies = (coords) => {
  const [col, row] = [
    COLUMNS.indexOf(coords[0].toUpperCase()),
    parseInt(coords.slice(1)) - 1,
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

  placeShip(coordStart, coordEnd) {
    const [startCol, startRow] = getArrayIndicies(coordStart);
    const [endCol, endRow] = getArrayIndicies(coordEnd);

    if (startCol !== endCol && startRow !== endRow)
      throw new Error("Ship cannot be diagonal");
    if (startCol < endCol && startRow !== endRow)
      throw new Error("Ship cannot be diagonal");

    if (endCol - startCol > 0) {
      const ship = new Ship(endCol - startCol + 1);
      for (let i = 0; i < ship.length; i++) {
        this.board[startCol + i][startRow] = ship;
      }
    } else {
      const ship = new Ship(endRow - startRow + 1);
      for (let i = 0; i < ship.length; i++) {
        this.board[startCol][startRow + i] = ship;
      }
    }

    this.ships += 1;
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
