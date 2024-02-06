import Player from "./Player";
import { display } from "./domHandler";

export const players = { current: "one", one: "", two: "", winner: "" };

function createPlayer(name, player, isHuman) {
  players[player] = new Player(name, isHuman);
  players[player].board.randomlyPlaceShips();
  console.log(players);
}

export function createPlayers(p1Name) {
  createPlayer(p1Name, "one", false);
  createPlayer("Computer", "two", false);
}

function takeRandomMove(player) {
  const otherPlayer = players.current === "two" ? "one" : "two";
  while (true) {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    const success = takeMove(row, col, otherPlayer);
    if (success !== undefined) {
      const tds = document.querySelectorAll(`.player-${otherPlayer}-board td`);
      tds.forEach((td) => {
        if (+td.dataset.col === col && +td.dataset.row === row) {
          td.textContent = success;
        }
      });
      break;
    }
  }
}

export function changePlayer() {
  const player1Board = document.querySelector(".player-one-board");
  const player2Board = document.querySelector(".player-two-board");
  player1Board.classList.toggle("inactive");
  player2Board.classList.toggle("inactive");

  players.current = players.current === "one" ? "two" : "one";

  display.activePlayer();
}

export function takeMove(row, col, otherPlayer) {
  if (players.winner !== "") return;

  const marker = players[otherPlayer].board.receiveAttackV2(row, col);
  if (marker === undefined) return;
  if (players[otherPlayer].board.shipsAlive() === 0) {
    players.winner = players.current;
    display.winner();
    return marker;
  }
  changePlayer();
  if (!players[players.current].human) setTimeout(takeRandomMove, 0);

  return marker;
}
