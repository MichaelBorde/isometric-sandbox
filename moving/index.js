(function() {
  'use strict';

  const tiles = {
    0: 'grass',
    1: 'rock',
    2: 'player'
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
    width: 640,
    height: 480
  };

  const tileSize = {
    width: 64,
    height: 32
  };

  let playerPosition = { x: 2, y: 2 };

  bindControls();

  const offset = computeOffset();

  const canvas = document.getElementById('canvas');
  setCanvasSize();
  const context = canvas.getContext('2d');

  const imageCache = createImageCache();

  loop();

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawWorld();
    drawPlayer();
  }

  function bindControls() {
    bindMovement('up-button', { x: 0, y: -1 });
    bindMovement('down-button', { x: 0, y: 1 });
    bindMovement('left-button', { x: -1, y: 0 });
    bindMovement('right-button', { x: 1, y: 0 });
  }

  function bindMovement(id, movement) {
    const element = document.getElementById(id);
    element.addEventListener('click', () => movePlayer(movement));
  }

  function movePlayer(movement) {
    playerPosition = {
      x: playerPosition.x + movement.x,
      y: playerPosition.y + movement.y
    };
  }

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
        const position2d = { x: j, y: i };
        const position = convert2dToScreen(position2d, tileSize);
        const offseted = {
          x: position.x + offset.x,
          y: position.y + offset.y
        };
        drawTile(type, offseted);
      }
    }
  }

  function drawPlayer() {
    const position = convert2dToScreen(playerPosition, tileSize);
    const offseted = {
      x: position.x + offset.x,
      y: position.y + offset.y
    };
    drawTile('2', offseted);
  }

  function drawTile(type, position) {
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
    const x = (point.x - point.y) * tileSize.width / 2;
    const y = (point.x + point.y) * tileSize.height / 2;
    return { x, y };
  }
})();
