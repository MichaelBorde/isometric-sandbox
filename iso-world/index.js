(function() {
  "use strict";

  const tiles = {
    0: "grass",
    1: "rock"
  };

  const world = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
  ];

  const viewPortSize = {
    width: 400,
    height: 400
  };

  const tileSize = {
    width: 64,
    height: 32
  };

  const offset = computeOffset();

  const canvas = document.getElementById("canvas");
  setCanvasSize();
  const context = canvas.getContext("2d");

  drawWorld();

  function computeOffset() {
    const boundingBox = {
      width: world[0].length * tileSize.width,
      height: world.length * tileSize.height
    };
    return {
      x:
        (viewPortSize.width - boundingBox.width) / 2 +
        boundingBox.width / 2 -
        tileSize.width / 2,
      y: (viewPortSize.height - boundingBox.height) / 2
    };
  }

  function setCanvasSize() {
    canvas.width = viewPortSize.width;
    canvas.height = viewPortSize.height;
  }

  function drawWorld() {
    for (let i = 0; i < world.length; i++) {
      for (let j = 0; j < world[0].length; j++) {
        const type = world[i][j];
        const image = createTileImage(type);
        const position2d = { x: j, y: i };
        const position = convert2dToScreen(position2d);
        image.onload = () =>
          context.drawImage(
            image,
            position.x + offset.x,
            position.y + offset.y,
            tileSize.width,
            tileSize.height
          );
      }
    }
  }

  function createTileImage(type) {
    const image = new Image();
    image.src = `tiles/${tiles[type]}.png`;
    return image;
  }

  function convert2dToScreen(point) {
    const x = (point.x - point.y) * tileSize.width / 2;
    const y = (point.x + point.y) * tileSize.height / 2;
    return { x, y };
  }
})();
