
let r, g, b;

function setup() {
  // Move the canvas so it’s inside our <div id="sketch-holder">.

  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth
  var height = width

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  var square_size = width/8

  for (let x = 0; x < width; x += square_size) {
    for (let y = 0; y < height; y += square_size) {
      r = random(255);
      g = random(255);
      b = random(255);
      rect(x, y, square_size, square_size);
    }
  }

}

function draw() {
}
