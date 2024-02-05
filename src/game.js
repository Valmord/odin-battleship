import Player from "./Player";

export const players = { one: "", two: "" };

function createPlayer(name, player, isHuman) {
  players[player] = new Player(name, isHuman);
  players[player].board.randomlyPlaceShips();
  console.log(players);
}

export function createPlayers(p1Name) {
  createPlayer(p1Name, "one", true);
  createPlayer("Computer", "two", true);
}
