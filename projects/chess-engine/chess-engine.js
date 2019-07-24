
let r, g, b;
let bR;

function preload() {
  bR = loadImage('../projects/chess-engine/chess-images/bR.png');
}

function setup() {
  // Move the canvas so it’s inside our <div id="sketch-holder">.

  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth
  var height = width

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  var square_size = width/8

  // starts as white
  var square_color = 0
  for (let x = 0; x < width; x += square_size) {
    for (let y = 0; y < height; y += square_size) {
      if (square_color == 0) {
        fill(233, 227, 230);
        square_color = 1;
      } else {
        fill(144, 162, 172)
        square_color = 0;
      }
      rect(x, y, square_size, square_size);
    }
    if (square_color == 1) {
      square_color = 0;
    } else {
      square_color = 1;
    }
  }

  img(bR, 0, 0, square_size, square_size)

}

function draw() {
}
