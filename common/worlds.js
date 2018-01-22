const simpleOrtho = {
  world: [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
  ],
  tiles: {
    0: 'grass',
    1: 'rock'
  },
  tileSize: {
    width: 64,
    height: 64
  }
};

const simpleIso = {
  world: [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
  ],
  tiles: {
    0: 'grass',
    1: 'rock',
    p: 'player'
  },
  tileSize: {
    width: 64,
    height: 32
  }
};

export const worlds = {
  simpleOrtho,
  simpleIso
};
