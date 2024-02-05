import Player from "./Player";

export const players = { one: "", two: "" };

export function createPlayer(name, player, isHuman) {
  players[player] = new Player(name, isHuman);
}

// player: {name: 'John', board: {}, score: [wins, losses, draws]};
//
//
