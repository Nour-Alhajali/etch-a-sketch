const gridElement = document.querySelector(".paint-paper__grid");

constructPixelGrid(16);

function getNewPixel(gridWidthInPixels, gridHeightInPixels) {
  //Get pixel width and height according to actual canvas size the the size in pixel elements
  const gridWidth = gridElement.getBoundingClientRect().width;
  const gridHeight = gridElement.getBoundingClientRect().height;

  let pixelWidth = gridWidth / gridWidthInPixels;
  const pixelHeight = gridHeight / gridHeightInPixels;

  const pixelElement = document.createElement("div");
  pixelElement.style.cssText = `border: 1px solid #1f2024; width: ${pixelWidth}px; height: ${pixelHeight}px; flex: 0 0 auto`;
  return pixelElement;
}

function constructPixelGrid(width, height = width) {
  // Spawn pixel elements the size of the canvas
  for (let i = 0; i < width * height; i++) {
    gridElement.appendChild(getNewPixel(width, height));
  }
}
