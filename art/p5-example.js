function setup() {
  var myCanvas = createCanvas(640, 480);
  myCanvas.parent("sketch-div");
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
