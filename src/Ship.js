export default class Ship {
  constructor(length) {
    this.length = length;
    this.health = length;
    this.alive = true;
  }

  hit() {
    this.health -= 1;
    return this;
  }

  isSunk() {
    if (this.health <= 0) this.alive = false;
    return !this.alive;
  }
}
