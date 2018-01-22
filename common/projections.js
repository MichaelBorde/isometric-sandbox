import { Point } from './point.js';

export function convertGridTo2d(point, tileSize) {
  return new Point(point.x * tileSize.width, point.y * tileSize.height);
}

export function convertGridToIso(point, tileSize) {
  return new Point(
    (point.x - point.y) * tileSize.width / 2,
    (point.x + point.y) * tileSize.height / 2
  );
}
