import GameBoard from "./Gameboard";

export default class Player {
  constructor(name = "Alan the AI", human = false) {
    this.name = name;
    this.human = human;
    this.board = new GameBoard();
  }
}
