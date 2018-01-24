(function() {
  'use strict';

  const tiles = {
    0: 'grass',
    1: 'rock'
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
    width: 384,
    height: 384
  };

  const tileSize = {
    width: 64,
    height: 64
  };

  const canvas = document.getElementById('canvas');
  setCanvasSize();
  const context = canvas.getContext('2d');

  const imageCache = createImageCache();

  drawWorld();

  function setCanvasSize() {
    canvas.width = viewPortSize.width;
    canvas.height = viewPortSize.height;
  }

  function drawWorld() {
    for (let i = 0; i < world.length; i++) {
      for (let j = 0; j < world[0].length; j++) {
        const type = world[i][j];
        const position2d = { x: j, y: i };
        const position = convert2dToScreen(position2d);
        imageCache
          .get(type)
          .then(image =>
            context.drawImage(
              image,
              position.x,
              position.y,
              tileSize.width,
              tileSize.height
            )
          );
      }
    }
  }

  function createImageCache() {
    const cache = {};
    return { get };

    function get(type) {
      if (!cache[type]) {
        const image = new Image();
        image.src = `tiles/${tiles[type]}.png`;
        cache[type] = new Promise(resolve => {
          image.onload = () => resolve(image);
        });
      }
      return cache[type];
    }
  }

  function convert2dToScreen(point) {
    return {
      x: point.x * tileSize.width,
      y: point.y * tileSize.height
    };
  }
})();
