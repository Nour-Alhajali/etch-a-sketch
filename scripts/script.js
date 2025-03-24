const gridElement = document.querySelector(".paint-paper__grid");

constructPixelGrid(16);

function getNewPixel(gridWidthInPixels, gridHeightInPixels) {
  //Get pixel width and height according to actual canvas size the the size in pixel elements
  const gridWidth = gridElement.getBoundingClientRect().width;
  const gridHeight = gridElement.getBoundingClientRect().height;

  let pixelWidth = gridWidth / gridWidthInPixels;
  const pixelHeight = gridHeight / gridHeightInPixels;

  const pixelElement = document.createElement("div");
  pixelElement.classList.add("pixel");
  pixelElement.style.cssText = `width: ${pixelWidth}px; height: ${pixelHeight}px; flex: 0 0 auto`;

  // plugClickEventListener(pixelElement);
  return pixelElement;
}

function constructPixelGrid(width, height = width) {
  // Spawn pixel elements the size of the canvas
  for (let i = 0; i < width * height; i++) {
    gridElement.appendChild(getNewPixel(width, height));
  }
}
//function plugClickEventListener(pixelElement) {
//  pixelElement.addEventListener("mouseenter", (event) => onPixelClicked(event));
//}

function checkIfElementIsPixel(e) {}

function handlePixelPainting() {
  //To allow click and drag/paint over multiple pixels instead of only allowing one pixel
  //to be clicked/painted with each click

  gridElement.addEventListener("mousedown", allowPainting);
  gridElement.addEventListener("mouseup", disallowPainting);

  function allowPainting(e) {
    gridElement.addEventListener("mousemove", onPixelClicked);
  }
  function disallowPainting(e) {
    gridElement.removeEventListener("mousemove", onPixelClicked);
  }

  function onPixelClicked(event) {
    event.target.classList.add("pixel--clicked");
  }
}
