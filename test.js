let w;
let columns;
let rows;
let board;
let next;
let r, g, b;

let block_size = 20
let block_height = 10

function draw_block(x, y) {
    
    beginShape()
        
    // Top Face
    vertex(x - block_size, y)
    vertex(x, y - block_size/2)
    vertex(x + block_size, y)
    vertex(x, y + block_size/2)
    endShape(CLOSE)

    // Left Face
    beginShape()
    vertex(x - block_size, y)
    vertex(x, y + block_size/2)
    vertex(x, y + block_height + block_size/2)
    vertex(x - block_size, y + block_height)
    endShape(CLOSE)

    // Add lines to left face (Helps with depth)
    // line_sep = float(block_height)/lines
    // for l in range(lines):
    //     line(x - block_size, y + (l * line_sep), x, y + block_size/2 + (l * line_sep))

    // Right Face
    beginShape()
    vertex(x + block_size, y)
    vertex(x, y + block_size/2)
    vertex(x, y + block_height + block_size/2)
    vertex(x + block_size, y + block_height)
    endShape(CLOSE)

}

function setup() {
  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth
  var height = 800

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  r = random(255);
  g = random(255);
  b = random(255);

  draw_block(width/2, height/2)
  rect(10, 10, 10, 10)

  frameRate(20);
  init();
}

function draw() {
  background(255);
  generate();
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if ((board[i][j] == 1)) fill(0);
      else fill(r, g, b);
      stroke(0);
      rect(i * w, j * w, w-1, w-1);
    }
  }

}

// reset board when mouse is pressed
function mousePressed() {
  init();
}
