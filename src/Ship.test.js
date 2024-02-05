import Ship from "./Ship";

test("Ship is alive", () => {
  const testShip = new Ship(4);
  expect(testShip.isSunk()).toBe(false);
});

test("Ship with 3 health hit thrice is sunk", () => {
  const testShip = new Ship(1);
  testShip.hit().hit().hit();
  expect(testShip.isSunk()).toBe(true);
});
