
let r, g, b;
let bB, bR, bK, bN, bP, bQ, wB, wK, wN, wP, wQ, wR;
let square_size;
let piece_list;

let board;

let moves;

let selected;
let selected_location;

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

function grid_to_pixel(r, c) {
  return [r*square_size, c*square_size];
}

function draw_piece_on_grid(piece, r, c) {
  var pix = grid_to_pixel(r, c);
  image(piece, pix[1], pix[0], square_size, square_size);
}

function grid_clicked() {
  return [int(mouseY / square_size), int(mouseX / square_size)];
}

function setup() {
  // Move the canvas so it’s inside our <div id="sketch-holder">.

  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth
  var height = width

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  square_size = width/8

  // Used for drawing identical selected piece
  piece_list = [bP, bP, bN, bB, bR, bQ, bK, wP, wN, wB, wR, wQ, wK];

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

  selected = -1;
  selected_location = [-1, -1];

  draw_empty_board();
  draw_initial_pieces();

  state = 'neutral';
}

function draw_empty_board() {
  // starts as white
  var square_color = 0
  for (let r = 0; r < height; r += square_size) {
    for (let c = 0; c < width; c += square_size) {
      if (square_color == 0) {
        fill(233, 227, 230);
        square_color = 1;
      } else {
        fill(144, 162, 172)
        square_color = 0;
      }
      rect(r, c, square_size, square_size);
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
  draw_piece_on_grid(bN, 0, 1);
  draw_piece_on_grid(bB, 0, 2);
  draw_piece_on_grid(bQ, 0, 3)
  draw_piece_on_grid(bK, 0, 4);
  draw_piece_on_grid(bB, 0, 5);
  draw_piece_on_grid(bN, 0, 6);
  draw_piece_on_grid(bR, 0, 7);
  for (let c = 0; c < 8; c++) {
    draw_piece_on_grid(bP, 1, c);
  }

  // White pieces
  draw_piece_on_grid(wR, 7, 0);
  draw_piece_on_grid(wN, 7, 1);
  draw_piece_on_grid(wB, 7, 2);
  draw_piece_on_grid(wQ, 7, 3)
  draw_piece_on_grid(wK, 7, 4);
  draw_piece_on_grid(wB, 7, 5);
  draw_piece_on_grid(wN, 7, 6);
  draw_piece_on_grid(wR, 7, 7);
  for (let c = 0; c < 8; c++) {
    draw_piece_on_grid(wP, 6, c);
  }
}

function draw() {
}


// Control the state
// move state?
function mouseClicked() {
  var grid_click = grid_clicked(mouseX, mouseY);
  if (grid_click[0] < 8 && grid_click[0] >= 0 && grid_click[1] < 8 && grid_click[1] >= 0) {
    var piece = board[grid_click[0]][grid_click[1]]
    if (piece > 6) {
      selected = piece
      selected_location[0] = grid_click[0]
      selected_location[1] = grid_click[1]
      moves = get_moves(piece, grid_click)
      console.log(moves);
    } else if (selected != -1) {
      if (valid_move(moves, grid_click)) {

        // Update the board for the next moves
        board[grid_click[0]][grid_click[1]] = selected
        board[selected_location[0]][selected_location[1]] = 0

        // Cover the new location (capture piece)
        var pix = grid_to_pixel(grid_click[1], grid_click[0])
        if ((grid_click[0] % 2) == (grid_click[1] % 2)) {
          fill(233, 227, 230);
        } else {
          fill(144, 162, 172)
        }
        rect(pix[0], pix[1], square_size, square_size)

        // Draw the piece in it's new location
        draw_piece_on_grid(piece_list[selected], grid_click[0], grid_click[1]);

        // Cover the previous location (Need to actually draw the right color)
        var pix = grid_to_pixel(selected_location[1], selected_location[0])
        if ((selected_location[0] % 2) == (selected_location[1] % 2)) {
          fill(233, 227, 230);
        } else {
          fill(144, 162, 172)
        }
        rect(pix[0], pix[1], square_size, square_size)

        // Undo selection after successful move
        selected = -1
        selected_location[0] = -1
        selected_location[1] = -1
      }

    }
    console.log(board[grid_click[0]][grid_click[1]])
  }
}

// This will be a long one
function get_moves(p, grid_click) {
  var el = 0;
  var m = [];
  console.log("knight??");
  console.log(p);

  // White Pawn
  if (p == 7) {
    // Regular moves
    if (board[grid_click[0] - 1][grid_click[1]] == 0) {
      m[el] = [grid_click[0] - 1, grid_click[1]];
      el += 1;
    }
    if (grid_click[0] == 6 && board[grid_click[0] - 2][grid_click[1]] == 0) {
      m[el] = [grid_click[0] - 2, grid_click[1]]
      el += 1;
    }

    // Capturing
    if (grid_click[1] > 0 && board[grid_click[0] - 1][grid_click[1] - 1] < 7 && board[grid_click[0] - 1][grid_click[1] - 1] > 0) {
      m[el] = [grid_click[0] - 1, grid_click[1] - 1];
      el += 1;
    }
    if (grid_click[1] < 7 && board[grid_click[0] - 1][grid_click[1] + 1] < 7 && board[grid_click[0] - 1][grid_click[1] + 1] > 0) {
      m[el] = [grid_click[0] - 1, grid_click[1] + 1];
      el += 1;
    }

  // White Knight
  } else if (p == 8) {
    console.log("knight");
    if (board[grid_click[0] - 2][grid_click[1] - 1] < 6) {
      m[el] = [grid_click[0] - 2, grid_click[1] - 1];
      el += 1;
    }
    if (board[grid_click[0] - 2][grid_click[1] + 1] < 6) {
      m[el] = [grid_click[0] - 2, grid_click[1] + 1];
      el += 1;
    }

  }
  return m;
}

function valid_move(moves, grid_click) {
  for (var i = 0; i < moves.length; i++) {
      if (moves[i][0] == grid_click[0] && moves[i][1] == grid_click[1]) {
          return true;   // Found it
      }
  }
  return false;
}
