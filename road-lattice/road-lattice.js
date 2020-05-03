p5.disableFriendlyErrors = true;

const opts = {
    // Generation Details
    Grid_Size: 50,
    Shading: 3,
    Background: [255, 255, 255],
    Steps: 900,
    Line_Width: 2,
    
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
    gui.add(opts, 'Shading', 0, 20).step(1)
    gui.add(opts, 'Steps')
    gui.add(opts, 'Line_Width')
    gui.add(opts, 'Generate');
    gui.add(opts, 'Save');
    var made = gui.addFolder('Made by Eric Davidson')
    made.add(opts, 'GitHub')
    made.add(opts, 'YouTube')
                                 
  
  };
  
  function github() {
      window.open('https://www.erdavids.com/road-lattice/')
  }

  function youtube() {
    window.open('https://www.youtube.com/channel/UCUrmX3SvpPerq-KAfGBrgGQ?view_as=subscriber')
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
  
  var bottom_grid
  var top_grid
  
  var current_grid
  
  function setup()
  {
    var canvasDiv = document.getElementById('sketchdiv');
    var width = w
    var height = h;
    
    grid_x = opts.Grid_Size
    grid_y = opts.Grid_Size
    
    var grid_x_pixels = .9 * w
    var grid_y_pixels = .9 * h
  
    sep_x = float(grid_x_pixels) / (grid_x - 1)
    sep_y = float(grid_y_pixels) / (grid_y - 1)
    
    pixelDensity(2);
    
    var cnv = createCanvas(w, h);
    cnv.parent('sketchdiv');
   
    
    background(255, 255, 255);
    stroke(0)
    strokeWeight(opts.Line_Width)
    
    bottom_grid = []
    top_grid = []
    
    for (var i = 0; i < grid_x; i++) {
        bottom_grid.push([])
        top_grid.push([])
        for (var j = 0; j < grid_y; j++) {
          bottom_grid[i].push(0)
          top_grid[i].push(0)
        }
    }
  
    
    
    // Random Walk Algorithm Test
    walk_x = int(random(2, grid_x - 2))
    while(walk_x%2 != 0) walk_x = int(random(2, grid_x - 2))
    walk_y = int(random(2, grid_x - 2))
    while(walk_y%2 != 0) walk_y = int(random(2, grid_x - 2))
    
    let last_x = 0
    let last_y = 0
    
    let x_dir = 0
    let y_dir = 0
    
    current_grid = 'bottom'
    // Bottom GRID
    for (var j = 0; j < opts.Steps; j++) {
      // Exit Condition - Closed loop
      bottom_grid[walk_y + y_dir][walk_x + x_dir] = 1
      bottom_grid[walk_y + y_dir * 2][walk_x + x_dir * 2] = 1
      
      walk_y += y_dir * 2
      walk_x += x_dir * 2
      
      x_dir = grid_x * 2
      y_dir = grid_y * 2
      
      // Find a new direction
      while (walk_x + x_dir * 2 >= grid_x || walk_y + y_dir * 2 >= grid_y || walk_x + x_dir * 2 < 0 || walk_y + y_dir * 2 < 0 || (x_dir == last_x && y_dir == last_y)) {
         if (random(1) < .5) {
            x_dir = random([-1, 1])
            y_dir = 0
          } else {
            y_dir = random([-1, 1])
            x_dir = 0
          }
     
      }
      
      last_x = -x_dir
      last_y = -y_dir
    }
    
    var current_x = w/2.0 - grid_x_pixels/2.0
    var current_y = h/2.0 - grid_y_pixels/2.0
    for (var i = 0; i < grid_x; i++) {
        for (var j = 0; j < grid_y; j++) {
          
          push()
          translate(current_x, current_y)
          
          // rect(0 - sep_x/2, 0 - sep_y/2, sep_x, sep_y)
          noFill();
          
          let UP = Boolean(j > 0 && bottom_grid[j - 1][i]) 
          let DOWN = Boolean(j < grid_y - 1 && bottom_grid[j + 1][i] == 1)
          let RIGHT = Boolean(i < grid_x - 1 && bottom_grid[j][i + 1] == 1)
          let LEFT = Boolean(i > 0 && bottom_grid[j][i - 1] == 1)
          
         
          
          if (bottom_grid[j][i] == 1) {
            if (DOWN && UP && !RIGHT && !LEFT) {
              draw_tile(-2)
            }
            
            if (RIGHT && LEFT && !UP && !DOWN) {
              draw_tile(-1)
            }
            
            if (LEFT && UP && !RIGHT && !DOWN) {
              draw_tile(4)
            }
            if (RIGHT && UP && !DOWN && !LEFT) {
              draw_tile(1)
            }
            if (RIGHT && DOWN && !UP && !LEFT) {
              draw_tile(2)
            }
            if (LEFT && DOWN && !UP && !RIGHT) {
              draw_tile(3)
            }
            // Right, Up, Down
            if (RIGHT && UP && DOWN && !LEFT) {
              draw_tile(6)
            }
            if (RIGHT && DOWN && LEFT && !UP) {
              draw_tile(7)
            }
            if (LEFT && DOWN && UP && !RIGHT) {
              draw_tile(8)
            }
            if (LEFT && !DOWN && UP && RIGHT) {
              draw_tile(9)
            }
            if (LEFT && DOWN && UP && RIGHT) {
              draw_tile(10)
            }
            if (!LEFT && !DOWN && !UP && RIGHT) {
              draw_tile(11)
            }
            if (DOWN && !RIGHT && !LEFT && !UP) {
              draw_tile(12)
            }
            if (LEFT && !RIGHT && !DOWN && !UP) {
              draw_tile(13)
            }
            if (UP && !DOWN && !RIGHT && !LEFT) {
              draw_tile(14)
            }
          }
          
          pop()
          current_y += sep_y
        }
        current_y = h/2.0 - grid_y_pixels/2.0
        current_x += sep_x
    }
   
    walk_x = int(random(2, grid_x - 2))
    while(walk_x%2 != 1) walk_x = int(random(2, grid_x - 2))
    walk_y = int(random(2, grid_x - 2))
    while(walk_y%2 != 1) walk_y = int(random(2, grid_x - 2))
    
    last_x = 0
    last_y = 0
    
    x_dir = 0
    y_dir = 0
    
    current_grid = 'top'
    // TOP GRID
    for (var j = 0; j < opts.Steps; j++) {
      // Exit Condition - Closed loop
      top_grid[walk_y + y_dir][walk_x + x_dir] = 1
      top_grid[walk_y + y_dir * 2][walk_x + x_dir * 2] = 1
      
      walk_y += y_dir * 2
      walk_x += x_dir * 2
      
      x_dir = grid_x * 2
      y_dir = grid_y * 2
      
      while (walk_x + x_dir * 2 >= grid_x || walk_y + y_dir * 2 >= grid_y || walk_x + x_dir * 2 < 0 || walk_y + y_dir * 2 < 0 || (x_dir == last_x && y_dir == last_y)) {
         if (random(1) < .5) {
            x_dir = random([-1, 1])
            y_dir = 0
          } else {
            y_dir = random([-1, 1])
            x_dir = 0
          }
     
      }
      
      last_x = -x_dir
      last_y = -y_dir
    }
    
  var current_x = w/2.0 - grid_x_pixels/2.0
  var current_y = h/2.0 - grid_y_pixels/2.0
  for (var i = 0; i < grid_x; i++) {
    for (var j = 0; j < grid_y; j++) {
          
          push()
          translate(current_x, current_y)
          
          noFill();
          
          let UP = Boolean(j > 0 && top_grid[j - 1][i]) 
          let DOWN = Boolean(j < grid_y - 1 && top_grid[j + 1][i] == 1)
          let RIGHT = Boolean(i < grid_x - 1 && top_grid[j][i + 1] == 1)
          let LEFT = Boolean(i > 0 && top_grid[j][i - 1] == 1)
          
          let OTHER = Boolean(bottom_grid[j][i] == 1)
          
          if (top_grid[j][i] == 1) {
            if (DOWN && UP && !RIGHT && !LEFT) {
              draw_tile(-2)
              
              if (OTHER && random(1) < .5) {
                draw_tile(-1)
              }
            }
            
            if (RIGHT && LEFT && !UP && !DOWN) {
              draw_tile(-1)
            }
            
            if (LEFT && UP && !RIGHT && !DOWN) {
              draw_tile(4)
            }
            if (RIGHT && UP && !DOWN && !LEFT) {
              draw_tile(1)
            }
            if (RIGHT && DOWN && !UP && !LEFT) {
              draw_tile(2)
            }
            if (LEFT && DOWN && !UP && !RIGHT) {
              draw_tile(3)
            }
            // Right, Up, Down
            if (RIGHT && UP && DOWN && !LEFT) {
              draw_tile(6)
            }
            if (RIGHT && DOWN && LEFT && !UP) {
              draw_tile(7)
            }
            if (LEFT && DOWN && UP && !RIGHT) {
              draw_tile(8)
            }
            if (LEFT && !DOWN && UP && RIGHT) {
              draw_tile(9)
            }
            if (LEFT && DOWN && UP && RIGHT) {
              draw_tile(10)
            }
            if (RIGHT && !DOWN && !LEFT && !UP) {
              draw_tile(11)
            }
            if (DOWN && !RIGHT && !LEFT && !UP) {
              draw_tile(12)
            }
            if (LEFT && !RIGHT && !DOWN && !UP) {
              draw_tile(13)
            }
            if (UP && !DOWN && !RIGHT && !LEFT) {
              draw_tile(14)
            }
          }
          
          pop()
          current_y += sep_y
        }
        current_y = h/2.0 - grid_y_pixels/2.0
        current_x += sep_x
    }
  
  
  }
  
  function draw_tile(tile_type) {
    if (tile_type == 1) {
      for (var j = 0; j < opts.Shading; j++) {
       arc(sep_x/2, -sep_y/2, sep_x * 1.5, sep_y * 1.5 + j, HALF_PI, PI);
      }
      for (var j = 0; j < opts.Shading; j++) {
        arc(sep_x/2, -sep_y/2, sep_x * .5 - j, sep_y * .5, HALF_PI, PI);
      }
      
      
      
    } else if (tile_type == 2) {
     
      for (var j = 0; j < opts.Shading; j++) {
        arc(sep_x/2, sep_y/2, sep_x * .5 - j, sep_y * .5 - j, PI, TWO_PI - HALF_PI);
      }
      arc(sep_x/2, sep_y/2, sep_x * 1.5, sep_y * 1.5, PI, TWO_PI - HALF_PI);
      
      
    } else if (tile_type == 3) {
      for (var j = 0; j < opts.Shading; j++) {
        arc(-sep_x/2, sep_y/2, sep_x * .5, sep_y * .5 - j, TWO_PI - HALF_PI, TWO_PI);
      }
      for (var j = 0; j < opts.Shading; j++) {
        arc(-sep_x/2, sep_y/2, sep_x * 1.5 + j, sep_y * 1.5, TWO_PI - HALF_PI, TWO_PI);
      }
      
      
    } else if (tile_type == 4) {
      arc(-sep_x/2, -sep_y/2, sep_x * .5, sep_y * .5, TWO_PI, HALF_PI);
      for (var j = 0; j < opts.Shading; j++) {
        arc(-sep_x/2, -sep_y/2, sep_x * 1.5 + j, sep_y * 1.5 + j, TWO_PI, HALF_PI);
      }
      
      
    } else if (tile_type == 5) {
      for (var j = 0; j < opts.Shading; j++) {
        arc(sep_x/2, -sep_y/2, sep_x * .5 - j, sep_y * .5, HALF_PI, PI);
      }
      for (var j = 0; j < opts.Shading; j++) {
        arc(sep_x/2, sep_y/2, sep_x * .5 - j, sep_y * .5 - j, PI, TWO_PI - HALF_PI);
      }
      for (var j = 0; j < opts.Shading; j++) {
        arc(-sep_x/2, sep_y/2, sep_x * .5, sep_y * .5 - j, TWO_PI - HALF_PI, TWO_PI);
      }
      arc(-sep_x/2, -sep_y/2, sep_x * .5, sep_y * .5, TWO_PI, HALF_PI);
      
      // RIGHT UP DOWN
    } else if (tile_type == 6) {
      for (var j = 0; j < opts.Shading; j++) {
        arc(sep_x/2, -sep_y/2, sep_x * .5 - j, sep_y * .5, HALF_PI, PI);
      }
          for (var j = 0; j < opts.Shading; j++) {
        arc(sep_x/2, sep_y/2, sep_x * .5 - j, sep_y * .5 - j, PI, TWO_PI - HALF_PI);
      }
      line(-sep_x * .25, -sep_y/2, -sep_x * .25, sep_y/2)
      
      // RIGHT DOWN LEFT
    } else if (tile_type == 7) {
      line(-sep_x/2, -sep_y * .25, sep_x/2, -sep_y * .25)
      for (var j = 0; j < opts.Shading; j++) {
        arc(sep_x/2, sep_y/2, sep_x * .5 - j, sep_y * .5 - j, PI, TWO_PI - HALF_PI);
      }
      for (var j = 0; j < opts.Shading; j++) {
        arc(-sep_x/2, sep_y/2, sep_x * .5, sep_y * .5 - j, TWO_PI - HALF_PI, TWO_PI);
      }
      
      // LEFT DOWN UP
    } else if (tile_type == 8) {
      for (var j = 0; j < opts.Shading; j++) {
        arc(-sep_x/2, sep_y/2, sep_x * .5, sep_y * .5 - j, TWO_PI - HALF_PI, TWO_PI);
      }
      arc(-sep_x/2, -sep_y/2, sep_x * .5, sep_y * .5, TWO_PI, HALF_PI);
  
      
      
      for (var j = 0; j < opts.Shading/2; j++) {
        line(sep_x * .25 + j, -sep_y/2, sep_x * .25 + j, sep_y/2)
      }
      // LEFT UP RIGHT
    } else if (tile_type == 9) {
      arc(-sep_x/2, -sep_y/2, sep_x * .5, sep_y * .5, TWO_PI, HALF_PI);
      for (var j = 0; j < opts.Shading; j++) {
        arc(sep_x/2, -sep_y/2, sep_x * .5 - j, sep_y * .5, HALF_PI, PI);
      }
      
      for (var j = 0; j < opts.Shading/2; j++) {
        line(-sep_x/2, sep_y * .25 + j, sep_x/2, sep_y * .25 + j)
      }
      // LEFT RIGHT
      
    } else if (tile_type == 10) {
      for (var j = 0; j < opts.Shading; j++) {
        arc(sep_x/2, -sep_y/2, sep_x * .5 - j, sep_y * .5, HALF_PI, PI);
      }
      arc(-sep_x/2, -sep_y/2, sep_x * .5, sep_y * .5, TWO_PI, HALF_PI);
      for (var j = 0; j < opts.Shading; j++) {
        arc(sep_x/2, sep_y/2, sep_x * .5 - j, sep_y * .5 - j, PI, TWO_PI - HALF_PI);
      }
      for (var j = 0; j < opts.Shading; j++) {
        arc(-sep_x/2, sep_y/2, sep_x * .5, sep_y * .5 - j, TWO_PI - HALF_PI, TWO_PI);
      }
    } else if (tile_type == 11) {
      line(sep_x/2, -sep_y * .25, sep_x/2, sep_y * .25)
    } else if (tile_type == 12) {
      line(-sep_x * .25, sep_y/2, sep_x * .25, sep_y/2)
    } else if (tile_type == 13) {
      for (var j = 0; j < opts.Shading/2; j++) {
         line(-sep_x/2 - j, -sep_y * .25, -sep_x/2 - j, sep_y * .25)
      }
    } else if (tile_type == 14) {
      for (var j = 0; j < opts.Shading/2; j++) {
         line(-sep_x * .25, -sep_y/2 - j, sep_x * .25, -sep_y/2 - j)
      }
    } else if (tile_type == -1) {
      fill(opts.Background)
      noStroke()
      rect(-sep_x/2, -sep_y * .25, sep_x, sep_y * .5)
      stroke(0)
      noFill()
      line(-sep_x/2, -sep_y * .25, sep_x/2, -sep_y * .25)
      for (var j = 0; j < opts.Shading/2; j++) {
        line(-sep_x/2, sep_y * .25 + j, sep_x/2, sep_y * .25 + j)
      }
      
      
      
    } else if (tile_type == -2) {
      fill(opts.Background)
      noStroke()
      rect(-sep_x * .25, -sep_y/2, sep_x * .5, sep_y)
      stroke(0)
      noFill()
      for (var j = 0; j < opts.Shading/2; j++) {
        line(sep_x * .25 + j, -sep_y/2, sep_x * .25 + j, sep_y/2)
      }
      line(-sep_x * .25, -sep_y/2, -sep_x * .25, sep_y/2)
    }
  }
  