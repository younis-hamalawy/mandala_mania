export const rotation = (x, y, n, axes) => ({
    x: x * Math.cos(2 * n * Math.PI / axes) - y * Math.sin(2 * n * Math.PI / axes),
    y: x * Math.sin(2 * n * Math.PI / axes) + y * Math.cos(2 * n * Math.PI / axes),
  });
