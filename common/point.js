export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(offset) {
    return new Point(this.x + offset.x, this.y + offset.y);
  }
}
