function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}
const utils = {
  generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  generateRandomNumber(min = 0, max = 1) {
    return min + Math.round(Math.random() * max);
  },

  generateShapeId: idGenerator(),

  getShapeSizes(shapes = [], leftSide = false) {
    return shapes.reduce((total, current) => {
      const left = leftSide ? 50 - current.left : current.left;

      total += current.weight * left;

      return total;
    }, 0);
  }
};

export default utils;
