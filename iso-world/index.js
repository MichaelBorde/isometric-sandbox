import {
  computeOffsetToCenterIsoWorld,
  convertGridToIso,
  createImageCache,
  Point,
  setCanvasSize,
  Size,
  worlds
} from '../common/index.js';

const { world, tiles, tileSize: rawTileSize } = worlds.simpleIso;
const tileSize = Size.fromRaw(rawTileSize);

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const viewPortSize = new Size(640, 480);
setCanvasSize(canvas, viewPortSize);

const offset = computeOffsetToCenterIsoWorld({ tileSize, world }, viewPortSize);

const imageCache = createImageCache();

drawWorld();

function drawWorld() {
  for (let i = 0; i < world.length; i++) {
    for (let j = 0; j < world[0].length; j++) {
      const type = world[i][j];
      const position2d = new Point(j, i);
      const position = convertGridToIso(position2d, tileSize);
      const offseted = position.add(offset);
      imageCache
        .get(`tiles/${tiles[type]}.png`)
        .then(image =>
          context.drawImage(
            image,
            offseted.x,
            offseted.y,
            tileSize.width,
            tileSize.height
          )
        );
    }
  }
}
