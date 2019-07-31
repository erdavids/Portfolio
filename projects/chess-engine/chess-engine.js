////////////////////////////
// The Crooked Rook
//    A chess engine created by Eric Davidson
//
// Primary Searching:
//  - Minimax with Alpha/Beta pruning
////////////////////////////

// Will be used to reference the piece images
let bB, bR, bK, bN, bP, bQ, wB, wK, wN, wP, wQ, wR;

// Adapts to screen size
let square_size;

// Stores the image references for pieces
let piece_list;

// 8x8 array of arrays representing the board
let board;

// Will be used for player and computer move
let moves;
let black_moves;

// Tracks the players input
let selected;
let selected_location;

// Booleans for controlling game flow
let player_move;
let computer_can_move;
let computer_now_moves;

// Used for checking captures
let before_capture_count;


// Used to determine if the engine should cheat
let crooked;

// Qualifying factors for castling
let castling;
let white_king_moved;
let black_king_moved;

let white_rook_left_moved;
let white_rook_right_moved;
let black_rook_left_moved;
let black_rook_right_moved;

let difficulty;


var white_pawn_eval_early = [
  [  0,   0,   0,   0,   0,   0,   0,   0],
  [-50, -50, -50, -50, -50, -50, -50, -50],
  [-10, -10, -20, -30, -30, -20, -10, -10],
  [ -5,  -5, -10, -25, -25, -10,  -5,  -5],
  [  0,   0,   0, -20, -20,   0,   0,   0],
  [ -5,   5,  10,   0,   0,  10,   5,  -5],
  [ -5, -10, -10,  20,  20, -10, -10,  -5],
  [  0,   0,   0,   0,   0,   0,   0,   0]
];

var black_pawn_eval_early = [
  [  0,   0,   0,   0,   0,   0,   0,   0],
  [  5,  10,  10, -20, -20,  10,  10,   5],
  [  5,  -5, -10,   0,   0, -10,  -5,   5],
  [  0,   0,   0,  20,  20,   0,   0,   0],
  [  5,   5,  10,  25,  25,  10,   5,   5],
  [ 10,  10,  20,  30,  30,  20,  10,  10],
  [ 50,  50,  50,  50,  50,  50,  50,  50],
  [  0,   0,   0,   0,   0,   0,   0,   0]
];

var white_knight_eval_early = [
  [ 50,  40,  30,  30,  30,  30,  40,  50],
  [ 40,  20,   0,   0,   0,   0,  20,  40],
  [ 30,   0, -10, -15, -15, -10,   0,  30],
  [ 30,  -5, -15, -20, -20, -15,  -5,  30],
  [ 30,   0, -15, -20, -20, -15,   0,  30],
  [ 30,  -5, -10, -15, -15, -10,  -5,  30],
  [ 40,  20,   0,  -5,  -5,   0,  20,  40],
  [ 50,  40,  30,  30,  30,  30,  40,  50]
];

var black_knight_eval_early = [
  [-50, -40, -30, -30, -30, -30, -40, -50],
  [-40, -20,   0,   0,   0,   0, -20, -40],
  [-30,   5,  10,  15,  15,  10,   5, -30],
  [-30,   0,  15,  20,  20,  15,   0, -30],
  [-30,   5,  15,  20,  20,  15,   5, -30],
  [-30,   0,  10,  15,  15,  10,   0, -30],
  [-40,  20,   0,  -5,  -5,   0,  20, -40],
  [-50, -40, -30, -30, -30, -30, -40, -50]
];

var white_bishop_eval_early = [
  [ 20,  10,  10,  10,  10,  10,  10,  20],
  [ 10,   0,   0,   0,   0,   0,   0,  10],
  [ 10,   0,  -5, -10, -10,  -5,   0,  10],
  [ 10,  -5,  -5, -10, -10,  -5,  -5,  10],
  [ 10,   0, -10, -10, -10, -10,   0,  10],
  [ 10, -10, -10, -10, -10, -10, -10,  10],
  [ 10,  -5,   0,   0,   0,   0,  -5,  10],
  [ 20,  10,  10,  10,  10,  10,  10,  20]
];

var black_bishop_eval_early = [
  [-20, -10, -10, -10, -10, -10, -10, -20],
  [-10,   5,   0,   0,   0,   0,   5, -10],
  [-10,  10,  10,  10,  10,  10,  10, -10],
  [-10,   0,  10,  10,  10,  10,   0, -10],
  [-10,   5,   5,  10,  10,   5,   5, -10],
  [-10,   0,   5,  10,  10,   5,   0, -10],
  [-10,   0,   0,   0,   0,   0,   0, -10],
  [-20, -10, -10, -10, -10, -10, -10, -20]
];

var white_rook_eval_early = [
  [  0,   0,   0,   0,   0,   0,   0,   0],
  [ -5, -10, -10, -10, -10, -10, -10,  -5],
  [  5,   0,   0,   0,   0,   0,   0,   5],
  [  5,   0,   0,   0,   0,   0,   0,   5],
  [  5,   0,   0,   0,   0,   0,   0,   5],
  [  5,   0,   0,   0,   0,   0,   0,   5],
  [  5,   0,   0,   0,   0,   0,   0,   5],
  [  0,   0,   0,  -5,  -5,   0,   0,   0]
];

var black_rook_eval_early = [
  [  0,   0,   5,  10,  10,   5,   0,   0],
  [ -5,   0,   0,   0,   0,   0,   0,  -5],
  [ -5,   0,   0,   0,   0,   0,   0,  -5],
  [ -5,   0,   0,   0,   0,   0,   0,  -5],
  [ -5,   0,   0,   0,   0,   0,   0,  -5],
  [ -5,   0,   0,   0,   0,   0,   0,  -5],
  [  5,  10,  10,  10,  10,  10,  10,   5],
  [  0,   0,   0,   0,   0,   0,   0,   0],
];

var white_queen_eval_early = [
  [ 20,  10,  10,   5,   5,  10,  10,  20],
  [ 10,   0,   0,   0,   0,   0,   0,  10],
  [ 10,   0,  -5,  -5,  -5,  -5,   0,  10],
  [  5,   0,  -5,  -5,  -5,  -5,   0,   5],
  [  0,   0,  -5,  -5,  -5,  -5,   0,   5],
  [ 10,  -5,  -5,  -5,  -5,  -5,   0,  10],
  [ 10,   0,  -5,   0,   0,   0,   0,  10],
  [ 20,  10,  10,   5,   5,  10,  10,  20]
];

var black_queen_eval_early = [
  [-20, -10, -10,  -5,  -5, -10, -10, -20],
  [-10,   0,   5,   0,   0,   0,   0, -10],
  [-10,   5,   5,   5,   5,   5,   0, -10],
  [  0,   0,   5,   5,   5,   5,   0,  -5],
  [ -5,   0,   5,   5,   5,   5,   0,  -5],
  [-10,   0,   5,   5,   5,   5,   0, -10],
  [-10,   0,   0,   0,   0,   0,   0, -10],
  [-20, -10, -10,  -5,  -5, -10, -10, -20]
];

var white_king_eval_early = [
  [ 30,  40,  40,  50,  50,  40,  40,  30],
  [ 30,  40,  40,  50,  50,  40,  40,  30],
  [ 30,  40,  40,  50,  50,  40,  40,  30],
  [ 30,  40,  40,  50,  50,  40,  40,  30],
  [ 20,  30,  30,  40,  40,  30,  30,  20],
  [ 10,  20,  20,  20,  20,  20,  20,  10],
  [-20, -20,   0,   0,   0,   0, -20, -20],
  [-20, -30, -10,   0,   0, -10, -30, -20]
];

var black_king_eval_early = [
  [ 20,  30,  10,   0,   0,  10,  30,  20],
  [ 20,  20,   0,   0,   0,   0,  20,  20],
  [-10, -20, -20, -20, -20, -20, -20, -10],
  [-20, -30, -30, -40, -40, -30, -30, -20],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30]
];



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

// Uses the reactive square size to draw squares in the right place
function grid_to_pixel(r, c) {
  return [r*square_size, c*square_size];
}

// Uses the p5 image function to draw
function draw_piece_on_grid(piece, r, c) {
  var pix = grid_to_pixel(r, c);
  image(piece, pix[1], pix[0], square_size, square_size);
}

// Have to convert to the row/column format
function grid_clicked() {
  return [int(mouseY / square_size), int(mouseX / square_size)];
}

function setup() {

  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth
  var height = width

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  // Hopefully adjusts to screen size
  square_size = width/8

  // Used for drawing identical selected piece
  piece_list = [bP, bP, bN, bB, bR, bQ, bK, wP, wN, wB, wR, wQ, wK];

  // Initial board
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

  // Probably a better way to do this part
  selected = -1;
  selected_location = [-1, -1];

  // Starts off the visuals
  draw_empty_board();
  draw_initial_pieces();

  player_move = true;

  // Annoying setup, but necessary for now with p5.js drawing
  computer_can_move = false;
  computer_now_moves = false;

  // Castling conditions all start as false
  castling = false;
  white_king_moved = false;
  black_king_moved = false;

  white_rook_left_moved = false;
  white_rook_right_moved = false;
  black_rook_left_moved = false;
  black_rook_right_moved = false;

  // Positions evaluated by mini_max
  position_count = 0;

  // Counting enemy pieces
  before_capture_count = 0;

  // Usually between 1 and 5
  difficulty = 5;

  // Cheating (Can be turned off)
  crooked = true;
  root_cheat = false;

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

// Will be used heavily for evaluating future board positions
function get_board_copy(b) {
  return JSON.parse(JSON.stringify(b));
}

// Hardcoded for now
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

function redraw_entire_board() {
  draw_empty_board();
  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      if (board[r][c] != 0) {
        draw_piece_on_grid(piece_list[board[r][c]], r, c)
      }
    }
  }
}

// p5 method that occurs every frame
function draw() {
  if (computer_now_moves) {
    computer_can_move = false;
    computer_now_moves = false;
    computer_move();
  }
  if (computer_can_move) {
    computer_now_moves = true;
  }
}


// The meat of the computer's brain
function mini_max_root(depth, alpha, beta) {
  var best_move = -100000;

  var t_p = -1;
  var t_r = -1;
  var t_c = -1;
  var t_nr = -1;
  var t_nc = -1;

  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      root_cheat = true;
      var black_moves = get_black_moves(board, board[r][c], r, c);
      root_cheat = false;
      for (var i = 0; i < black_moves.length; i++) {
        var temp_board = get_board_copy(board);
        temp_board[black_moves[i][0]][black_moves[i][1]] = temp_board[r][c]
        temp_board[r][c] = 0

        // Upgrade pawn to queen (for evaluation)
        if (temp_board[black_moves[i][0]][black_moves[i][1]] == 1 && black_moves[i][0] == 7) {
          temp_board[black_moves[i][0]][black_moves[i][1]] = 5
        }

        var value = 0;

        if (black_king_check(temp_board) == true) {
          value = -100000;
        } else {
          value = mini_max(depth - 1, temp_board, alpha, beta, false);
        }
        // var value = mini_max(depth - 1, temp_board, alpha, beta, false);

        // We must assign an alpha in the ROOT for proper pruning
        alpha = Math.max(value, alpha);

        if (value >= best_move) {
          best_move = value;

          t_p = board[r][c];
          t_r = r;
          t_c = c;
          t_nr = black_moves[i][0];
          t_nc = black_moves[i][1];
        }
      }
    }
  }
  console.log(position_count);
  return [t_p, t_r, t_c, t_nr, t_nc];
}



// Will eventually need to supplement this with Quiescent Search (Search a few levels deeper on higher activity paths)
// How do I define higher activity?
//      - Maybe track most recent evaluation remaining enemy pieces, do 1-2 more levels searching for captures
function mini_max(depth, b, alpha, beta, is_max) {
  position_count += 1;

  if (depth == 0) {
    // if (get_player_pieces(b) < before_capture_count) {
    //   quiet_search(depth, b, alpha, beta)
    // } else {
    //   return evaluate_board(b);
    // }
    return evaluate_board(b);
  }

  // Maximizing player (Crooked Rook)
  if (is_max) {
    var best_move = -100000;
    for (var r = 0; r < 8; r++) {
      for (var c = 0; c < 8; c++) {
        var black_moves = get_black_moves(b, b[r][c], r, c);
        for (var i = 0; i < black_moves.length; i++) {
          var temp_board = get_board_copy(b);
          temp_board[black_moves[i][0]][black_moves[i][1]] = temp_board[r][c]
          temp_board[r][c] = 0

          // Upgrade pawn to queen (for evaluation)
          if (temp_board[black_moves[i][0]][black_moves[i][1]] == 1 && black_moves[i][0] == 7) {
            temp_board[black_moves[i][0]][black_moves[i][1]] = 5
          }

          // if (black_king_check(temp_board) == true) {
          //   best_move = -99999;
          // } else {
          //   best_move = Math.max(best_move, mini_max(depth - 1, temp_board, alpha, beta, !is_max));
          // }
          best_move = Math.max(best_move, mini_max(depth - 1, temp_board, alpha, beta, !is_max));


          alpha = Math.max(alpha, best_move);
          if (alpha > beta) {
            return best_move;
          }
        }
      }
    }
  return best_move;
  // Minimizing player (Human)
  } else {
    var best_move = 100000;
    for (var r = 0; r < 8; r++) {
      for (var c = 0; c < 8; c++) {
        var white_moves = get_moves(b, b[r][c], r, c);
        for (var i = 0; i < white_moves.length; i++) {
          var temp_board = get_board_copy(b);
          temp_board[white_moves[i][0]][white_moves[i][1]] = temp_board[r][c]
          temp_board[r][c] = 0

          // Upgrade pawn to queen (for evaluation)
          if (temp_board[white_moves[i][0]][white_moves[i][1]] == 7 && white_moves[i][0] == 0) {
            temp_board[white_moves[i][0]][white_moves[i][1]] = 11
          }

          // if (white_king_check(temp_board) == true) {
          //   best_move = 99999;
          // } else {
          //   best_move = Math.min(best_move, mini_max(depth - 1, temp_board, alpha, beta, !is_max));
          // }
          best_move = Math.min(best_move, mini_max(depth - 1, temp_board, alpha, beta, !is_max));

          beta = Math.min(beta, best_move);
          if (alpha > beta) {
            return best_move;
          }
        }
      }
    }
    return best_move;
  }
}

// Probably a shallow Q-Search
function quiet_search(depth, b, alpha, beta) {
  return false;
}


// Converts mouse clicks to potential player moves
function mouseClicked() {
  var grid_click = grid_clicked(mouseX, mouseY);
  if (player_move && grid_click[0] < 8 && grid_click[0] >= 0 && grid_click[1] < 8 && grid_click[1] >= 0) {
    var piece = board[grid_click[0]][grid_click[1]]
    if (piece > 6) {
      selected = piece
      selected_location[0] = grid_click[0]
      selected_location[1] = grid_click[1]
      moves = get_moves(board, piece, grid_click[0], grid_click[1])
    } else if (selected != -1) {
      if (valid_move(moves, grid_click)) {

        // Make sure we aren't putting king in check
        var temp_board = get_board_copy(board);
        temp_board[grid_click[0]][grid_click[1]] = selected;
        temp_board[selected_location[0]][selected_location[1]] = 0;

        if (white_king_check(temp_board) == false) {

          // Update player stats
          var captured_piece = board[grid_click[0]][grid_click[1]];
          console.log(captured_piece);

          // Update the board for the next moves
          board[grid_click[0]][grid_click[1]] = selected

          // Upgrade pawn to queen
          if (selected == 7 && grid_click[0] == 0) {
            board[grid_click[0]][grid_click[1]] = 11
          }

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

          // Computer's turn
          player_move = false;

          if (black_king_check(board) == true) {
            console.log("He should be able to move");
            if (black_king_checkmate(board) == true) {
              document.getElementById("status").textContent = "Checkmate - WHITE wins";
              console.log("Game over - White wins");
              return;
            }
          }

          computer_can_move = true;
          document.getElementById("status").textContent = "BLACK to move";

        } else {
          document.getElementById("status").textContent = "Your move cannot leave the king in check";
        }
      } else {
        selected = -1;
        selected_location[0] = -1
        selected_location[1] = -1
      }

    }
  }
}

// The Cheating AI (The Crooked Rook!)
function computer_move() {

  position_count = 0;

  var d = new Date().getTime();
  var mtt = mini_max_root(difficulty, -100000, 100000);
  var d2 = new Date().getTime();

  // Log the number of seconds
  console.log("Time for move: " + str((d2 - d)/1000));

  var best_piece = mtt[0];
  var best_r = mtt[1];
  var best_c = mtt[2];
  var new_r = mtt[3];
  var new_c = mtt[4];


  // Upgrade pawn to queen
  console.log("Best Piece");
  console.log(best_piece);
  if (best_piece == 1 && new_r == 7) {
    best_piece = 5;
  }
  board[new_r][new_c] = best_piece

  board[best_r][best_c] = 0

  // Cover the new location (capture piece)
  var pix = grid_to_pixel(new_c, new_r)
  if ((new_r % 2) == (new_c % 2)) {
    fill(233, 227, 230);
  } else {
    fill(144, 162, 172)
  }
  rect(pix[0], pix[1], square_size, square_size)

  // Draw the piece in it's new location
  draw_piece_on_grid(piece_list[best_piece], new_r, new_c);

  // Cover the previous location (Need to actually draw the right color)
  var pix = grid_to_pixel(best_c, best_r)
  if ((best_r % 2) == (best_c % 2)) {
    fill(233, 227, 230);
  } else {
    fill(144, 162, 172)
  }
  rect(pix[0], pix[1], square_size, square_size)

  if (white_king_check(board) == true) {
    if (white_king_checkmate(board) == true) {
      document.getElementById("status").textContent = "Checkmate - BLACK wins";
      console.log("Game over - Black wins");
      return;
    }
  }

  // Return to player move
  player_move = true;
  document.getElementById("status").textContent = "WHITE to move";


}

// Check for white king check in this board
function white_king_check(b) {
  var white_king_location = [-1, -1];
  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      if (b[r][c] == 12) {
        white_king_location[0] = r;
        white_king_location[1] = c;
      }
    }
  }

  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      var black_moves = get_black_moves(b, b[r][c], r, c);
      for (var j = 0; j < black_moves.length; j++) {
        if (black_moves[j][0] == white_king_location[0] && black_moves[j][1] == white_king_location[1]) {
          return true;
        }
      }
    }
  }
  return false;
}

// Check for white king checkmate
function white_king_checkmate(b) {
  var checkmate = true;
  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      var white_moves = get_moves(b, b[r][c], r, c);
      for (var j = 0; j < white_moves.length; j++) {
        var temp_board = get_board_copy(b);
        temp_board[white_moves[j][0]][white_moves[j][1]] = temp_board[r][c]
        temp_board[r][c] = 0

        if (white_king_check(temp_board) == false) {
          checkmate = false;
        }
      }
    }
  }
  return checkmate;
}


// Check for black king check in this board
function black_king_check(b) {
  var black_king_location = [-1, -1];
  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      if (b[r][c] == 6) {
        black_king_location[0] = r;
        black_king_location[1] = c;
      }
    }
  }

  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      var white_moves = get_moves(b, b[r][c], r, c);
      for (var j = 0; j < white_moves.length; j++) {
        if (white_moves[j][0] == black_king_location[0] && white_moves[j][1] == black_king_location[1]) {
          return true;
        }
      }
    }
  }
  return false;
}

// Check for black king checkmate
function black_king_checkmate(b) {
  var checkmate = true;
  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      var black_moves = get_black_moves(b, b[r][c], r, c);
      for (var j = 0; j < black_moves.length; j++) {
        var temp_board = get_board_copy(b);
        temp_board[black_moves[j][0]][black_moves[j][1]] = temp_board[r][c]
        temp_board[r][c] = 0

        if (black_king_check(temp_board) == false) {
          checkmate = false;
        }
      }
    }
  }
  return checkmate;
}

// Moves for White
function get_moves(b, p, r, c) {
  var el = 0;
  var m = [];

  // White Pawn
  if (p == 7) {
    // Regular moves
    if (r > 0 && b[r - 1][c] == 0) {
      m[el] = [r - 1, c];
      el += 1;
    }
    if (r == 6 && b[r - 2][c] == 0) {
      m[el] = [r - 2, c]
      el += 1;
    }

    // Capturing
    if (c > 0 && r > 0 && b[r - 1][c - 1] < 7 && b[r - 1][c - 1] > 0) {
      m[el] = [r - 1, c - 1];
      el += 1;
    }
    if (c < 7 && r > 0 && b[r - 1][c + 1] < 7 && b[r - 1][c + 1] > 0) {
      m[el] = [r - 1, c + 1];
      el += 1;
    }

  // White Knight
  } else if (p == 8) {
    // Tall Moves
    if (r > 1 && c > 0 && b[r - 2][c - 1] < 7) {
      m[el] = [r - 2, c - 1];
      el += 1;
    }
    if (r > 1 && c < 7 && b[r - 2][c + 1] < 7) {
      m[el] = [r - 2, c + 1];
      el += 1;
    }
    if (r < 6 && c < 7 && b[r + 2][c + 1] < 7) {
      m[el] = [r + 2, c + 1];
      el += 1;
    }
    if (r < 6 && c > 0 && b[r + 2][c - 1] < 7) {
      m[el] = [r + 2, c - 1];
      el += 1;
    }

    //Wide Moves
    if (r > 0 && c > 1 && b[r - 1][c - 2] < 7) {
      m[el] = [r - 1, c - 2];
      el += 1;
    }
    if (r > 0 && c < 6 && b[r - 1][c + 2] < 7) {
      m[el] = [r - 1, c + 2];
      el += 1;
    }
    if (r < 7 && c < 6 && b[r + 1][c + 2] < 7) {
      m[el] = [r + 1, c + 2];
      el += 1;
    }
    if (r < 7 && c > 1 && b[r + 1][c - 2] < 7) {
      m[el] = [r + 1, c - 2];
      el += 1;
    }
  // White Rook
  } else if (p == 10) {
    // Up
    var ri = 1;
    while (r - ri >= 0 && b[r-ri][c] == 0) {
      m[el] = [r - ri, c];
      el += 1;
      ri += 1;
    }
    if (r - ri >= 0 && b[r - ri][c] < 7 && b[r - ri][c] > 0) {
      m[el] = [r - ri, c];
      el += 1;
    }

    // Down
    ri = 1
    while (r + ri <= 7 && b[r + ri][c] == 0) {
      m[el] = [r + ri, c];
      el += 1;
      ri += 1;
    }
    if (r + ri <= 7 && b[r + ri][c] < 7 && b[r + ri][c] > 0) {
      m[el] = [r + ri, c];
      el += 1;
    }

    // Right
    var ci = 1
    while (c + ci <= 7 && b[r][c + ci] == 0) {
      m[el] = [r, c + ci];
      el += 1;
      ci += 1;
    }
    if (c + ci <= 7 && b[r][c + ci] < 7 && b[r][c + ci] > 0) {
      m[el] = [r, c + ci];
      el += 1;
    }

    // Left
    ci = 1
    while (c - ci >= 0 && b[r][c - ci] == 0) {
      m[el] = [r, c - ci];
      el += 1;
      ci += 1;
    }
    if (c + ci >= 0 && b[r][c - ci] < 7 && b[r][c - ci] > 0) {
      m[el] = [r, c - ci];
      el += 1;
    }
  // White Bishop
  } else if (p == 9) {
    var ri = 1;
    var ci = 1;

    // Northwest
    while (r - ri >= 0 && c - ci >= 0 && b[r - ri][c - ci] == 0) {
      m[el] = [r - ri, c - ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r - ri >= 0 && c - ci >= 0 && b[r - ri][c - ci] < 7 && b[r - ri][c - ci] > 0) {
      m[el] = [r - ri, c - ci]
      el += 1;
    }

    // Northeast
    ri = 1;
    ci = 1;
    while (r - ri >= 0 && c + ci <= 7 && b[r - ri][c + ci] == 0) {
      m[el] = [r - ri, c + ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r - ri >= 0 && c + ci <= 7 && b[r - ri][c + ci] < 7 && b[r - ri][c + ci] > 0) {
      m[el] = [r - ri, c + ci]
      el += 1;
    }

    // Southeast
    ri = 1;
    ci = 1;
    while (r + ri <= 7 && c + ci <= 7 && b[r + ri][c + ci] == 0) {
      m[el] = [r + ri, c + ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r + ri <= 7 && c + ci <= 7 && b[r + ri][c + ci] < 7 && b[r + ri][c + ci] > 0) {
      m[el] = [r + ri, c + ci]
      el += 1;
    }

    // Southwest
    ri = 1;
    ci = 1;
    while (r + ri <= 7 && c - ci >= 0 && b[r + ri][c - ci] == 0) {
      m[el] = [r + ri, c - ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r + ri <= 7 && c - ci >= 0 && b[r + ri][c - ci] < 7 && b[r + ri][c - ci] > 0) {
      m[el] = [r + ri, c - ci]
      el += 1;
    }
  // White Queen
  } else if (p == 11) {
    // Up
    var ri = 1;
    while (r - ri >= 0 && b[r-ri][c] == 0) {
      m[el] = [r - ri, c];
      el += 1;
      ri += 1;
    }
    if (r - ri >= 0 && b[r - ri][c] < 7 && b[r - ri][c] > 0) {
      m[el] = [r - ri, c];
      el += 1;
    }

    // Down
    ri = 1
    while (r + ri <= 7 && b[r + ri][c] == 0) {
      m[el] = [r + ri, c];
      el += 1;
      ri += 1;
    }
    if (r + ri <= 7 && b[r + ri][c] < 7 && b[r + ri][c] > 0) {
      m[el] = [r + ri, c];
      el += 1;
    }

    // Right
    var ci = 1
    while (c + ci <= 7 && b[r][c + ci] == 0) {
      m[el] = [r, c + ci];
      el += 1;
      ci += 1;
    }
    if (c + ci <= 7 && b[r][c + ci] < 7 && b[r][c + ci] > 0) {
      m[el] = [r, c + ci];
      el += 1;
    }

    // Left
    ci = 1
    while (c - ci >= 0 && b[r][c - ci] == 0) {
      m[el] = [r, c - ci];
      el += 1;
      ci += 1;
    }
    if (c - ci >= 0 && b[r][c - ci] < 7 && b[r][c - ci] > 0) {
      m[el] = [r, c - ci];
      el += 1;
    }


    ri = 1;
    ci = 1;

    // Northwest
    while (r - ri >= 0 && c - ci >= 0 && b[r - ri][c - ci] == 0) {
      m[el] = [r - ri, c - ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r - ri >= 0 && c - ci >= 0 && b[r - ri][c - ci] < 7 && b[r - ri][c - ci] > 0) {
      m[el] = [r - ri, c - ci]
      el += 1;
    }

    // Northeast
    ri = 1;
    ci = 1;
    while (r - ri >= 0 && c + ci <= 7 && b[r - ri][c + ci] == 0) {
      m[el] = [r - ri, c + ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r - ri >= 0 && c + ci <= 7 && b[r - ri][c + ci] < 7 && b[r - ri][c + ci] > 0) {
      m[el] = [r - ri, c + ci]
      el += 1;
    }

    // Southeast
    ri = 1;
    ci = 1;
    while (r + ri <= 7 && c + ci <= 7 && b[r + ri][c + ci] == 0) {
      m[el] = [r + ri, c + ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r + ri <= 7 && c + ci <= 7 && b[r + ri][c + ci] < 7 && b[r + ri][c + ci] > 0) {
      m[el] = [r + ri, c + ci]
      el += 1;
    }

    // Southwest
    ri = 1;
    ci = 1;
    while (r + ri <= 7 && c - ci >= 0 && b[r + ri][c - ci] == 0) {
      m[el] = [r + ri, c - ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r + ri <= 7 && c - ci >= 0 && b[r + ri][c - ci] < 7 && b[r + ri][c - ci] > 0) {
      m[el] = [r + ri, c - ci]
      el += 1;
    }
  // White King
} else if (p == 12) {
    var ri = 1;
    var ci = 1;

    if (r - ri >= 0 && b[r - ri][c] < 7) {
      m[el] = [r - ri, c];
      el += 1;
    }
    if (r + ri <= 7 && b[r + ri][c] < 7) {
      m[el] = [r + ri, c];
      el += 1;
    }
    if (c + ci <= 7 && b[r][c + ci] < 7) {
      m[el] = [r, c + ci];
      el += 1;
    }
    if (c - ci >= 0 && b[r][c - ci] < 7) {
      m[el] = [r, c - ci];
      el += 1;
    }

    if (r - ri >= 0 && c - ci >= 0 && b[r - ri][c - ci] < 7) {
      m[el] = [r - ri, c - ci]
      el += 1;
    }
    if (r - ri >= 0 && c + ci <= 7 && b[r - ri][c + ci] < 7) {
      m[el] = [r - ri, c + ci]
      el += 1;
    }
    if (r + ri <= 7 && c + ci <= 7 && b[r + ri][c + ci] < 7) {
      m[el] = [r + ri, c + ci]
      el += 1;
    }
    if (r + ri <= 7 && c - ci >= 0 && b[r + ri][c - ci] < 7) {
      m[el] = [r + ri, c - ci]
      el += 1;
    }
  }

  return m;
}

// Moves for Black
function get_black_moves(b, p, r, c) {
  var el = 0;
  var m = [];

  // Black Pawn
  if (p == 1) {
    // Regular moves
    if (r < 7 && b[r + 1][c] == 0) {
      m[el] = [r + 1, c];
      el += 1;
    }
    if (r == 1 && b[r + 2][c] == 0) {
      m[el] = [r + 2, c]
      el += 1;
    }

    // Capturing
    if (c > 0 && r < 7 && b[r + 1][c - 1] > 6) {
      m[el] = [r + 1, c - 1];
      el += 1;
    }
    if (c < 7 && r < 7 && b[r + 1][c + 1] > 6) {
      m[el] = [r + 1, c + 1];
      el += 1;
    }

  // Black Knight
  } else if (p == 2) {
    // Tall Moves
    if (r > 1 && c > 0 && (b[r - 2][c - 1] > 6 || b[r - 2][c - 1] == 0)) {
      m[el] = [r - 2, c - 1];
      el += 1;
    }
    if (r > 1 && c < 7 && (b[r - 2][c + 1] > 6 || b[r - 2][c + 1] == 0)) {
      m[el] = [r - 2, c + 1];
      el += 1;
    }
    if (r < 6 && c < 7 && (b[r + 2][c + 1] > 6 || b[r + 2][c + 1] == 0)) {
      m[el] = [r + 2, c + 1];
      el += 1;
    }
    if (r < 6 && c > 0 && (b[r + 2][c - 1] > 6 || b[r + 2][c - 1] == 0)) {
      m[el] = [r + 2, c - 1];
      el += 1;
    }

    //Wide Moves
    if (r > 0 && c > 1 && (b[r - 1][c - 2] > 6 || b[r - 1][c - 2] == 0)) {
      m[el] = [r - 1, c - 2];
      el += 1;
    }
    if (r > 0 && c < 6 && (b[r - 1][c + 2] > 6 || b[r - 1][c + 2] == 0)) {
      m[el] = [r - 1, c + 2];
      el += 1;
    }
    if (r < 7 && c < 6 && (b[r + 1][c + 2] > 6 || b[r + 1][c + 2] == 0)) {
      m[el] = [r + 1, c + 2];
      el += 1;
    }
    if (r < 7 && c > 1 && (b[r + 1][c - 2] > 6 || b[r + 1][c - 2] == 0)) {
      m[el] = [r + 1, c - 2];
      el += 1;
    }

    // Cheating moves
    if (crooked == true && root_cheat == true && random(1) < .05) {
      // Straight up
      if (r > 1 && (b[r - 2][c] > 6 || b[r - 2][c] == 0)) {
        m[el] = [r - 2, c];
        el += 1;
      }
    }
  // Black Rook
  } else if (p == 4) {
    // Up
    var ri = 1;
    while (r - ri >= 0 && b[r-ri][c] == 0) {
      m[el] = [r - ri, c];
      el += 1;
      ri += 1;
    }
    if (r - ri >= 0 && b[r - ri][c] > 6) {
      m[el] = [r - ri, c];
      el += 1;
    }

    // Down
    ri = 1
    while (r + ri <= 7 && b[r + ri][c] == 0) {
      m[el] = [r + ri, c];
      el += 1;
      ri += 1;
    }
    if (r + ri <= 7 && b[r + ri][c] > 6) {
      m[el] = [r + ri, c];
      el += 1;
    }

    // Right
    var ci = 1
    while (c + ci <= 7 && b[r][c + ci] == 0) {
      m[el] = [r, c + ci];
      el += 1;
      ci += 1;
    }
    if (c + ci <= 7 && b[r][c + ci] > 6) {
      m[el] = [r, c + ci];
      el += 1;
    }

    // Left
    ci = 1
    while (c - ci >= 0 && b[r][c - ci] == 0) {
      m[el] = [r, c - ci];
      el += 1;
      ci += 1;
    }
    if (c + ci >= 0 && b[r][c - ci] > 6) {
      m[el] = [r, c - ci];
      el += 1;
    }
  // Black Bishop
  } else if (p == 3) {
    var ri = 1;
    var ci = 1;

    // Northwest
    while (r - ri >= 0 && c - ci >= 0 && b[r - ri][c - ci] == 0) {
      m[el] = [r - ri, c - ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r - ri >= 0 && c - ci >= 0 && b[r - ri][c - ci] > 6) {
      m[el] = [r - ri, c - ci]
      el += 1;
    }

    // Northeast
    ri = 1;
    ci = 1;
    while (r - ri >= 0 && c + ci <= 7 && b[r - ri][c + ci] == 0) {
      m[el] = [r - ri, c + ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r - ri >= 0 && c + ci <= 7 && b[r - ri][c + ci] > 6) {
      m[el] = [r - ri, c + ci]
      el += 1;
    }

    // Southeast
    ri = 1;
    ci = 1;
    while (r + ri <= 7 && c + ci <= 7 && b[r + ri][c + ci] == 0) {
      m[el] = [r + ri, c + ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r + ri <= 7 && c + ci <= 7 && b[r + ri][c + ci] > 6) {
      m[el] = [r + ri, c + ci]
      el += 1;
    }

    // Southwest
    ri = 1;
    ci = 1;
    while (r + ri <= 7 && c - ci >= 0 && b[r + ri][c - ci] == 0) {
      m[el] = [r + ri, c - ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r + ri <= 7 && c - ci >= 0 && b[r + ri][c - ci] > 6) {
      m[el] = [r + ri, c - ci]
      el += 1;
    }
  // Black Queen
  } else if (p == 5) {
    // Up
    var ri = 1;
    while (r - ri >= 0 && b[r-ri][c] == 0) {
      m[el] = [r - ri, c];
      el += 1;
      ri += 1;
    }
    if (r - ri >= 0 && b[r - ri][c] > 6) {
      m[el] = [r - ri, c];
      el += 1;
    }

    // Down
    ri = 1
    while (r + ri <= 7 && b[r + ri][c] == 0) {
      m[el] = [r + ri, c];
      el += 1;
      ri += 1;
    }
    if (r + ri <= 7 && b[r + ri][c] > 6) {
      m[el] = [r + ri, c];
      el += 1;
    }

    // Right
    var ci = 1
    while (c + ci <= 7 && b[r][c + ci] == 0) {
      m[el] = [r, c + ci];
      el += 1;
      ci += 1;
    }
    if (c + ci <= 7 && b[r][c + ci] > 6) {
      m[el] = [r, c + ci];
      el += 1;
    }

    // Left
    ci = 1
    while (c - ci >= 0 && b[r][c - ci] == 0) {
      m[el] = [r, c - ci];
      el += 1;
      ci += 1;
    }
    if (c + ci >= 0 && b[r][c - ci] > 6) {
      m[el] = [r, c - ci];
      el += 1;
    }

    ri = 1;
    ci = 1;

    // Northwest
    while (r - ri >= 0 && c - ci >= 0 && b[r - ri][c - ci] == 0) {
      m[el] = [r - ri, c - ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r - ri >= 0 && c - ci >= 0 && b[r - ri][c - ci] > 6) {
      m[el] = [r - ri, c - ci]
      el += 1;
    }

    // Northeast
    ri = 1;
    ci = 1;
    while (r - ri >= 0 && c + ci <= 7 && b[r - ri][c + ci] == 0) {
      m[el] = [r - ri, c + ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r - ri >= 0 && c + ci <= 7 && b[r - ri][c + ci] > 6) {
      m[el] = [r - ri, c + ci]
      el += 1;
    }

    // Southeast
    ri = 1;
    ci = 1;
    while (r + ri <= 7 && c + ci <= 7 && b[r + ri][c + ci] == 0) {
      m[el] = [r + ri, c + ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r + ri <= 7 && c + ci <= 7 && b[r + ri][c + ci] > 6) {
      m[el] = [r + ri, c + ci]
      el += 1;
    }

    // Southwest
    ri = 1;
    ci = 1;
    while (r + ri <= 7 && c - ci >= 0 && b[r + ri][c - ci] == 0) {
      m[el] = [r + ri, c - ci];
      el += 1;
      ri += 1;
      ci += 1;
    }
    if (r + ri <= 7 && c - ci >= 0 && b[r + ri][c - ci] > 6) {
      m[el] = [r + ri, c - ci]
      el += 1;
    }
  // Black King
  } else if (p == 6) {
    var ri = 1;
    var ci = 1;

    if (r - ri >= 0 && (b[r - ri][c] > 6 || b[r - ri][c] == 0)) {
      m[el] = [r - ri, c];
      el += 1;
    }
    if (r + ri <= 7 && (b[r + ri][c] > 6 || b[r + ri][c] == 0)) {
      m[el] = [r + ri, c];
      el += 1;
    }
    if (c + ci <= 7 && (b[r][c + ci] > 6 || b[r][c + ci] == 0)) {
      m[el] = [r, c + ci];
      el += 1;
    }
    if (c - ci >= 0 && (b[r][c - ci] > 6 || b[r][c - ci] == 0)) {
      m[el] = [r, c - ci];
      el += 1;
    }

    if (r - ri >= 0 && c - ci >= 0 && (b[r - ri][c - ci] > 6 || b[r - ri][c - ci] == 0)) {
      m[el] = [r - ri, c - ci]
      el += 1;
    }
    if (r - ri >= 0 && c + ci <= 7 && (b[r - ri][c + ci] > 6 || b[r - ri][c + ci] == 0)) {
      m[el] = [r - ri, c + ci]
      el += 1;
    }
    if (r + ri <= 7 && c + ci <= 7 && (b[r + ri][c + ci] > 6 || b[r + ri][c + ci] == 0)) {
      m[el] = [r + ri, c + ci]
      el += 1;
    }
    if (r + ri <= 7 && c - ci >= 0 && (b[r + ri][c - ci] > 6 || b[r + ri][c - ci] == 0)) {
      m[el] = [r + ri, c - ci]
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

// Used to evaluate if there has been a capture
function get_player_pieces(b) {
  var p = 0;
  var total_pieces = 0;
  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      p = b[r][c];

      if (p > 6) {
        total_pieces += 1;
      }
    }
  }

  return total_pieces;
}

function evaluate_board(b) {
  var p = 0;
  var total_position = 0;
  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      // Iterate through each piece
      p = b[r][c];

      // Evaluate with static value for now (need to consider position on board)
      if (p == 1) {
        total_position += 100 + black_pawn_eval_early[r][c];
      } else if (p == 2) {
        total_position += 320 + black_knight_eval_early[r][c];
      } else if (p == 3) {
        total_position += 330 + black_bishop_eval_early[r][c];
      } else if (p == 4) {
        total_position += 500 + black_rook_eval_early[r][c];
      } else if (p == 5) {
        total_position += 900 + black_queen_eval_early[r][c];
      } else if (p == 6) {
        total_position += 20000 + black_king_eval_early[r][c];
      } else if (p == 7) {
        total_position -= 100 + white_pawn_eval_early[r][c];
      } else if (p == 8) {
        total_position -= 320 + white_bishop_eval_early[r][c];
      } else if (p == 9) {
        total_position -= 330 + white_bishop_eval_early[r][c];
      } else if (p == 10) {
        total_position -= 500 + white_rook_eval_early[r][c];
      } else if (p == 11) {
        total_position -= 900 + white_queen_eval_early[r][c];
      } else if (p == 12) {
        total_position -= 20000 + white_king_eval_early[r][c];
      }
    }
  }
  return total_position;
}

function set_difficulty_one() {
  difficulty = 1;
}

function set_difficulty_two() {
  difficulty = 2;
}

function set_difficulty_three() {
  difficulty = 3;
}

function set_difficulty_four() {
  difficulty = 4;
}

function set_difficulty_five() {
  difficulty = 5;
}

function toggle_cheating() {
  if (crooked == false) {
    crooked = true;
    document.getElementById("cheating-btn").style.backgroundColor = '#303030';
  } else {
    document.getElementById("cheating-btn").style.backgroundColor = '#CAA67A';
    crooked = false;
  }


}

function set_difficulty_five() {
  difficutly = 5;
}

function reset_game() {
  setup();
}

function command() {
  var cmd = document.getElementById("player_command").value;
  if (cmd == 'difficulty 1') {
    difficulty = 1;
  } else if (cmd == 'difficulty 2') {
    difficulty = 2;
  } else if (cmd == 'difficulty 3') {
    difficulty = 3;
  } else if (cmd == 'difficulty 4') {
    difficulty = 4;
  } else if (cmd == 'difficulty 5') {
    difficulty = 5;
  } else if (cmd == 'cheating on') {
    crooked = true;
  } else if (cmd == 'cheating off') {
    crooked = false;
  } else if (cmd == '4 8 15 16 23 42' || cmd == '4, 8, 15, 16, 23, 42' || cmd == '4815162342') {
    for (var r = 0; r < 8; r++) {
      for (var c = 0; c < 8; c++) {
        p = board[r][c];
        if (p > 6 && p != 12) {
          // Turn all the player's pieces to queens
          board[r][c] = 11;
          redraw_entire_board();
        }
      }
    }
  } else if (cmd == 'reset') {
    setup();
  }
  document.getElementById("player_command").value = "";
}
