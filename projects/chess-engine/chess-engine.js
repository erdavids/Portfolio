
let r, g, b;
let bB, bR, bK, bN, bP, bQ, wB, wK, wN, wP, wQ, wR;
let square_size;
let piece_list;
let board;

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
  return [x*square_size, y*square_size];
}

function draw_piece_on_grid(piece, x, y) {
  var pix = grid_to_pixel(x, y);
  image(piece, pix[0], pix[1], square_size, square_size);
}

function grid_clicked(x, y) {
  return [int(mouseX / square_size), int(mouseY / square_size)];
}

function setup() {
  // Move the canvas so it’s inside our <div id="sketch-holder">.

  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth
  var height = width

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  square_size = width/8

  board = [
    [4, 2, 3, 5, 6, 3, 2, 4],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [7, 7, 7, 7, 7, 7, 7, 7],
    [10, 8, 9, 11, 12, 9, 8, 10]
  ]

  draw_empty_board();
  draw_initial_pieces();
}

function draw_empty_board() {
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
}



function draw_initial_pieces() {
  // Black pieces
  draw_piece_on_grid(bR, 0, 0);
  draw_piece_on_grid(bN, 1, 0);
  draw_piece_on_grid(bB, 2, 0);
  draw_piece_on_grid(bQ, 3, 0)
  draw_piece_on_grid(bK, 4, 0);
  draw_piece_on_grid(bB, 5, 0);
  draw_piece_on_grid(bN, 6, 0);
  draw_piece_on_grid(bR, 7, 0);
  for (let x = 0; x < 8; x++) {
    draw_piece_on_grid(bP, x, 1);
  }

  // White pieces
  draw_piece_on_grid(wR, 0, 7);
  draw_piece_on_grid(wN, 1, 7);
  draw_piece_on_grid(wB, 2, 7);
  draw_piece_on_grid(wQ, 3, 7)
  draw_piece_on_grid(wK, 4, 7);
  draw_piece_on_grid(wB, 5, 7);
  draw_piece_on_grid(wN, 6, 7);
  draw_piece_on_grid(wR, 7, 7);
  for (let x = 0; x < 8; x++) {
    draw_piece_on_grid(wP, x, 6);
  }
}

function draw() {
}


// Control the state
// move state?
function mouseClicked() {
  var grid_click = grid_clicked(mouseX, mouseY)
  if (grid_click[0] < 8 && grid_click[0] >= 0 && grid_click[1] < 8 && grid_click[1] >= 0) {
    var piece = board[grid_click[0]][grid_click[1]];
    fill(0, 0, 0, 0);
    stroke(230, 0, 0);
    rect(grid_to_pixel(grid_click[0]), grid_to_pixel(grid_click[1]), square_size, square_size);
  }
}
