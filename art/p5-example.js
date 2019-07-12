function setup() {
  var canvas = createCanvas(100, 100);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-div');

  background(255, 0, 200);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
