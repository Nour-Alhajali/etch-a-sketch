const gridElement = document.querySelector(".paint-paper__grid");

const colorControlsElement = document.querySelector(
  ".paint-paper__controls__color-controls"
);
const colorControlCustomElement = document.querySelector(
  "#color-control-custom"
);
const defaultPenColor1 = "#1f2024";
const defaultPenColor2 = "#8ae9ec";
let currentPenColor = defaultPenColor1;
let selectedColorControlId = "#";

const toolControlsElement = document.querySelector(
  ".paint-paper__controls__tool-controls"
);
const penActions = ["paint", "erase"];
let currentPenAction = penActions[0];
let selectedToolControlId = "#";

const canvasControlsElement = document.querySelector(
  ".paint-paper__controls__canvas-controls"
);

const topLayerElement = document.querySelector(".paint-paper__top-layer");
const newCanvasPopUp = document.querySelector(
  ".paint-paper__top-layer__new-canvas-popup"
);
const newCanvasSizeInput = document.querySelector(
  ".paint-paper__top-layer__new-canvas-popup__input-label__input"
);
const newCanvasButton = document.querySelector(
  ".paint-paper__top-layer__new-canvas-popup__new-canvas-button"
);
const newCanvasInfoLabel = document.querySelector(
  ".paint-paper__top-layer__new-canvas-popup__required-info-label"
);

constructPixelGrid(16);
handlePixelPainting();
preventBrowserDragBehaviour();
handleColorControls();
handleToolControls();
handleCanvasControls();
handleNewCanvasControls();

function constructPixelGrid(width, height = width) {
  deleteCanvas();

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

  function deleteCanvas() {
    const gridElementChildren = gridElement.children;
    const gridElementChildrenCount = gridElementChildren.length;

    for (let i = gridElementChildrenCount - 1; i >= 0; i--) {
      gridElement.removeChild(gridElementChildren[i]);
    }
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
    if (currentPenAction == penActions[0]) {
      event.target.style.backgroundColor = currentPenColor;
    } else {
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

function handleColorControls() {
  colorControlsElement.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "color-control-1":
        currentPenColor = defaultPenColor1;
        selectedColorControlId = e.target.id;
        innotateSelectedColorControl();
        break;
      case "color-control-2":
        currentPenColor = defaultPenColor2;
        selectedColorControlId = e.target.id;
        innotateSelectedColorControl();
        break;
    }
  });
  colorControlCustomElement.addEventListener("change", (e) => {
    currentPenColor = e.target.value;
    //Apply parent's id since the event occurs on the child input
    selectedColorControlId = e.target.parentElement.id;

    innotateSelectedColorControl();
  });

  function innotateSelectedColorControl() {
    const colorControlsElementChildren = colorControlsElement.children;

    for (let i = 0; i < colorControlsElementChildren.length; i++) {
      if (colorControlsElementChildren[i].id === selectedColorControlId) {
        colorControlsElementChildren[i].classList.add(
          "paint-paper__controls__color-controls__button--selected"
        );
      } else {
        colorControlsElementChildren[i].classList.remove(
          "paint-paper__controls__color-controls__button--selected"
        );
      }
    }
  }
}

function handleToolControls() {
  toolControlsElement.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "tool-control-pen":
        currentPenAction = penActions[0];
        selectedToolControlId = e.target.id;
        innotateSelectedToolControl();
        break;
      case "tool-control-eraser":
        currentPenAction = penActions[1];
        selectedToolControlId = e.target.id;
        innotateSelectedToolControl();
        break;
    }
  });

  function innotateSelectedToolControl() {
    const toolControlsElementChildren = toolControlsElement.children;

    for (let i = 0; i < toolControlsElementChildren.length; i++) {
      if (toolControlsElementChildren[i].id === selectedToolControlId) {
        toolControlsElementChildren[i].classList.add(
          "paint-paper__controls__tool-controls__button--selected"
        );
      } else {
        toolControlsElementChildren[i].classList.remove(
          "paint-paper__controls__tool-controls__button--selected"
        );
      }
    }
  }
}

function handleCanvasControls() {
  canvasControlsElement.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "canvas-control-clear":
        eraseCanvasPixels();
        break;
      case "canvas-control-new":
        displayNewCanvasPopUp();
        break;
    }
  });

  function eraseCanvasPixels() {
    const gridElementChildren = gridElement.children;

    for (let i = 0; i < gridElementChildren.length; i++) {
      gridElementChildren[i].style.backgroundColor = "#FFFFFF";
    }
  }

  function displayNewCanvasPopUp() {
    topLayerElement.style.zIndex = 0;
  }
}

function handleNewCanvasControls() {
  newCanvasButton.addEventListener("click", (e) => {
    const canvasSize = newCanvasSizeInput.value;
    if (canvasSize <= 60 && canvasSize >= 8) {
      constructPixelGrid(canvasSize);

      hideNewCanvasPopUp();
    } else {
      newCanvasInfoLabel.classList.add(
        "paint-paper__top-layer__new-canvas-popup__required-info-label--invalid"
      );
    }
  });

  function hideNewCanvasPopUp() {
    topLayerElement.style.zIndex = -1;
  }
}
