export function createImageCache() {
  const cache = {};
  return { get };

  function get(src) {
    if (!cache[src]) {
      const image = new Image();
      image.src = src;
      cache[src] = new Promise(resolve => {
        image.onload = () => resolve(image);
      });
    }
    return cache[src];
  }
}
