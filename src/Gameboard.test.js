import GameBoard from "./Gameboard";

test("placing a ship then testing hits", () => {
  const board = new GameBoard();
  board.placeShip("A1", "A3");

  expect(board.receiveAttack("A1")).toBe("Hit");
  expect(board.receiveAttack("A2")).toBe("Hit");
  expect(board.receiveAttack("A2")).toBe("Already struck");
  expect(board.receiveAttack("A3")).toBe("Hit");
  expect(board.receiveAttack("A4")).toBe("Miss");
});

test("Receive attack at coords with no ship", () => {
  const board = new GameBoard();
  expect(board.receiveAttack("E5")).toBe("Miss");
});

test("Check ship lives", () => {
  const board = new GameBoard();
  board.placeShip("A1", "A3");
  expect(board.shipsAlive()).toBe(1);
  board.placeShip("C1", "C2");
  expect(board.shipsAlive()).toBe(2);
  board.receiveAttack("C1");
  board.receiveAttack("C2");
  expect(board.shipsAlive()).toBe(1);
});

test("Check misses", () => {
  const board = new GameBoard();
  expect(board.getMissedAttacks()).toBe(0);
  board.receiveAttack("A1");
  expect(board.getMissedAttacks()).toBe(1);
  board.receiveAttack("A2");
  expect(board.getMissedAttacks()).toBe(2);
});

test("Check if all ships are sunk", () => {
  const board = new GameBoard();
  expect(board.allSinksSunk()).toBe(true);
  board.placeShip("A1", "A3");
  expect(board.allSinksSunk()).toBe(false);
});
