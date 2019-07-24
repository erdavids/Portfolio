
let r, g, b;
let bB, bR, bK, bN, bP, bQ, wB, wK, wN, wP, wQ, wR;
let square_size;

function preload() {
  bB = loadImage('../projects/chess-engine/chess-images/bB.png');
  bR = loadImage('../projects/chess-engine/chess-images/bR.png');
  bK = loadImage('../projects/chess-engine/chess-images/bK.png');
  bN = loadImage('../projects/chess-engine/chess-images/bN.png');
  bP = loadImage('../projects/chess-engine/chess-images/bP.png');
  bQ = loadImage('../projects/chess-engine/chess-images/bQ.png');
  wB = loadImage('../projects/chess-engine/chess-images/wB.png');
  wK = loadImage('../projects/chess-engine/chess-images/wK.png');
  wN = loadImage('../projects/chess-engine/chess-images/wN.png');
  wP = loadImage('../projects/chess-engine/chess-images/wP.png');
  wQ = loadImage('../projects/chess-engine/chess-images/wQ.png');
  wR = loadImage('../projects/chess-engine/chess-images/wR.png');
}

function grid_to_pixel(x, y) {
  console.log(x)
  console.log(s)
  return [x*square_size, y*square_size];
}

function draw_piece_on_grid(piece, x, y, s) {
  var pix = grid_to_pixel(x, y);
  console.log(pix);
  image(piece, pix[0], pix[1], square_size, square_size);
}

function setup() {
  // Move the canvas so it’s inside our <div id="sketch-holder">.

  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth
  var height = width

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  square_size = width/8

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

  draw_initial_board();
  // Piece placement (Rather long but a one time deal)
  //draw_piece_on_grid(bR, 0, 0, square_size);
}

function draw_initial_board() {
  draw_piece_on_grid(bR, 0, 0);
}

function draw() {
}

function mouseClicked() {
  // remove the background
  image(bR, 200, 200, square_size, square_size);
}
