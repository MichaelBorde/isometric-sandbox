import { Point } from './point.js';
import { Size } from './size.js';

export function computeOffsetToCenterOrthoWorld(
  worldDescription,
  viewPortSize
) {
  const { tileSize, world } = worldDescription;
  const boundingBox = new Size(
    world[0].length * tileSize.width,
    world.length * tileSize.height
  );
  return new Point(
    (viewPortSize.width - boundingBox.width) / 2,
    (viewPortSize.height - boundingBox.height) / 2
  );
}

export function computeOffsetToCenterIsoWorld(worldDescription, viewPortSize) {
  const { tileSize, world } = worldDescription;
  const boundingBox = new Size(
    world[0].length * tileSize.width,
    world.length * tileSize.height
  );
  return new Point(
    (viewPortSize.width - boundingBox.width) / 2 +
      boundingBox.width / 2 -
      tileSize.width / 2,
    (viewPortSize.height - boundingBox.height) / 2
  );
}
