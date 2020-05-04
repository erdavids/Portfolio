p5.disableFriendlyErrors = true;

const opts = {
  // Generation Details
  Grid_Size: 15,
  Background: [255, 255, 255],
  Blocks: [255, 255, 255],
  Texture: [0, 100, 150],
  
  Steps: 100,
  Walkers: 3,
  Line_Width: 2,
  Diff: 8,
  
  // // Additional Functions
  GitHub: () => github(),
  YouTube: () => youtube(),
  Generate: () => randomize(),
  Save: () => save(),
  create: () => createPlant(),
};

window.onload = function() {
  var gui = new dat.GUI({width:300});
  gui.add(opts, 'Grid_Size', 3, 200).step(1)
  gui.add(opts, 'Steps')
  gui.add(opts, 'Walkers')
  gui.addColor(opts, 'Background')
  gui.addColor(opts, 'Blocks')
  gui.addColor(opts, 'Texture')
  gui.add(opts, 'Generate');
  gui.add(opts, 'Save');

  var made = gui.addFolder('Made by Eric Davidson')
  made.add(opts, 'GitHub')
  made.add(opts, 'YouTube')
                               

};

  
function github() {
  window.open('https://github.com/erdavids/Portfolio/tree/master/road-lattice')
}

function youtube() {
window.open('https://www.youtube.com/channel/UCUrmX3SvpPerq-KAfGBrgGQ')
}

function randomize() {
  setup();
}

function save() {
  save('photo.png');
}

// Number of quads
w = 900
h = 900

var grid_x
var grid_y

var sep_x
var sep_y

var grid

var current_grid

function setup()
{
  var canvasDiv = document.getElementById('sketchdiv');
  var width = w
  var height = h;
  
  grid = []
  
  grid_x = opts.Grid_Size
  grid_y = opts.Grid_Size
  
  var grid_x_pixels = .9 * w
  var grid_y_pixels = .9 * h

  sep_x = float(grid_x_pixels) / (grid_x - 1)
  sep_y = float(grid_y_pixels) / (grid_y - 1)
  
  pixelDensity(2);
  
  var cnv = createCanvas(w, h);
  cnv.parent('sketchdiv');
 
  
  background(opts.Background);
  strokeWeight(opts.Line_Width)
  
  for (var i = 0; i < grid_x; i++) {
    grid.push([])
    for (var j = 0; j < grid_y; j++) {
      grid[i].push(1)
    }
  }
  
  for (var i = 0; i < grid_y; i++) {
    for (var j = 0; j < grid_x; j++) {
      if (i < grid_y - 1) {
        if (random(1) < .3 && grid[i][j] == 1) {
          grid[i][j] = 3
          grid[i + 1][j] = 0
        }
      }
      if (j < grid_x - 1) {
        if (random(1) < .3 && grid[i][j] == 1 && grid[i][j + 1] != 0) {
          grid[i][j] = 2
          grid[i][j + 1] = 0
        }
      }
      if (i < grid_x - 1 && j < grid_y - 1) {
        if (random(1) < .2 && grid[i][j] == 1 && grid[i][j + 1] == 1 && grid[i + 1][j] == 1 && grid[i + 1][j + 1] == 1) {
          grid[i][j] = 4
          grid[i + 1][j] = 0
          grid[i][j + 1] = 0
          grid[i + 1][j + 1] = 0
        }
      }
    }
  }

  let short_x = sep_x - opts.Diff
  let long_x = sep_x * 2 - opts.Diff
  let short_y = sep_y - opts.Diff
  let long_y = sep_y * 2 - opts.Diff
  
  let cell
  
  var current_x = w/2.0 - grid_x_pixels/2.0
  var current_y = h/2.0 - grid_y_pixels/2.0
  for (var i = 0; i < grid_x; i++) {
    for (var j = 0; j < grid_y; j++) {
      cell = grid[j][i]
      
      if (cell == 1) {
        draw_textured_tile(current_x, current_y, short_x, short_y, opts.Steps, opts.Walkers)
      } 
      if (cell == 2) {
         draw_textured_tile(current_x + sep_x/2, current_y, long_x, short_y, opts.Steps, opts.Walkers)
      }
      if (cell == 3) {
         draw_textured_tile(current_x, current_y + sep_y/2, short_x, long_y, opts.Steps, opts.Walkers)
      }
      if (cell == 4) {
        draw_textured_tile(current_x + sep_x/2, current_y + sep_y/2, long_x, long_y, opts.Steps, opts.Walkers)
      }
      current_y += sep_y
    }
    current_y = h/2.0 - grid_y_pixels/2.0
    current_x += sep_x
  }
  
  
  //draw_textured_tile(w/2, h/2, 200, 200, 10000, 7)
}

function draw_textured_tile(x, y, xs, ys, steps, walkers) {
  push()
  
  translate(x, y)
  
  stroke(0, 0)
  fill(opts.Blocks)
  rect(-xs/2, -ys/2, xs, ys)
  
  stroke(opts.Texture[0], opts.Texture[1], opts.Texture[2], 12)
  for (var j = 0; j < walkers; j++) {
    let walk_x = random(-xs/2, xs/2)
    let walk_y = random(-ys/2, ys/2)

    let x_dir = xs * 2
    let y_dir = ys * 2

    let last_x = 0
    let last_y = 0

    for (var i = 0; i < steps; i++) {
      point(walk_x, walk_y)

      x_dir = xs * 2
      y_dir = ys * 2

      while (walk_x + x_dir >= xs/2 || walk_y + y_dir >= ys/2 || walk_x + x_dir < -xs/2 || walk_y + y_dir < -ys/2 || (x_dir == last_x && y_dir == last_y)) {
        if (random(1) < .5) {
          x_dir = random([-1, 1])
          y_dir = 0
        } else {
          y_dir = random([-1, 1])
          x_dir = 0
        }
      }

      walk_x += x_dir
      walk_y += y_dir

      last_x = -x_dir
      last_y = -y_dir
    }
  }
  
  pop()
}