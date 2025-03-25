const gridElement = document.querySelector(".paint-paper__grid");

const defaultPenColor1 = "#1f2024";
const defaultPenColor2 = "#8ae9ec";
let currentPenColor = defaultPenColor1;

constructPixelGrid(16);
handlePixelPainting();
preventBrowserDragBehaviour();

function constructPixelGrid(width, height = width) {
  // Spawn pixel elements the size of the canvas
  for (let i = 0; i < width * height; i++) {
    gridElement.appendChild(getNewPixel(width, height));
  }

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
}

function handlePixelPainting() {
  //To allow click and drag/paint over multiple pixels instead of only allowing one pixel
  //to be clicked/painted with each click

  gridElement.addEventListener("mousedown", allowPainting);
  gridElement.addEventListener("mouseup", disallowPainting);

  function allowPainting(event) {
    if (checkIfElementIsPixel(event)) {
      onPixelClicked(event);

      gridElement.addEventListener("mousemove", onPixelClicked);
    }
  }
  function disallowPainting(event) {
    if (checkIfElementIsPixel(event)) {
      gridElement.removeEventListener("mousemove", onPixelClicked);
    }
  }

  function onPixelClicked(event) {
    if (event.button === 0) {
      event.target.style.backgroundColor = currentPenColor;
    } else if (event.button === 1) {
      event.target.style.backgroundColor = "#FFFFFF";
    }
  }

  function checkIfElementIsPixel(event) {
    if (event.target.className.includes("pixel")) {
      return true;
    }
    return false;
  }
}

function preventBrowserDragBehaviour() {
  document.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });
}
