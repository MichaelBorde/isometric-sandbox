export class Size {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  static fromRaw(raw) {
    return new Size(raw.width, raw.height);
  }
}
