p5.disableFriendlyErrors = true;

const opts = {
    // Generation Details
    grid_height: 40,
    grid_width: 40,

    block_size: 10,
    block_height: 3,
    lines: 2,
    sw: 1,
    noise_scale: .05,
    noise_multiplier: 100,
    noise_dampener: 1,
    image_border_buff: 15,
    
    // // Additional Functions
    GitHub: () => github(),
    YouTube: () => youtube(),
    Generate: () => randomize(),
    Save: () => save(),
    create: () => createPlant(),
  };
  
  window.onload = function() {
    var gui = new dat.GUI({width:300});
    gui.add(opts, 'grid_height', 3, 200).step(1)
    gui.add(opts, 'grid_width', 3, 200).step(1)
    gui.add(opts, 'block_size', 2, 30).step(1)
    gui.add(opts, 'block_height', 1, 6).step(1)
    gui.add(opts, 'lines', 1, 4).step(1)
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


function draw_block(x, y, h) {
    beginShape()
    
    vertex(x - opts.block_size, y)
    vertex(x, y - opts.block_size/2)
    vertex(x + opts.block_size, y)
    vertex(x, y + opts.block_size/2)
    endShape(CLOSE)
    
    beginShape()
    vertex(x - opts.block_size, y)
    vertex(x, y + opts.block_size/2)
    vertex(x, y + opts.block_height + opts.block_size/2)
    vertex(x - opts.block_size, y + opts.block_height)
    endShape(CLOSE)
    
    line_sep = float(opts.block_height)/opts.lines
    for (let l = 0; l < opts.lines; l++) {
        line(x - opts.block_size, y + (l * line_sep), x, y + opts.block_size/2 + (l * line_sep))
    }
    
    beginShape()
    vertex(x + opts.block_size, y)
    vertex(x, y + opts.block_size/2)
    vertex(x, y + opts.block_height + opts.block_size/2)
    vertex(x + opts.block_size, y + opts.block_height)
    endShape(CLOSE)
    
}

function setup(){
  
      noiseSeed(random(0, 10000));
      var canvasDiv = document.getElementById('sketchdiv');

    var iterations = 1
      var w = opts.grid_width * opts.block_size + opts.grid_height * opts.block_size + opts.image_border_buff * opts.block_size
    var h = opts.grid_height * opts.block_size/2 + opts.grid_width * opts.block_size/2 + (parseInt(noise(0, 0) * opts.noise_multiplier) / opts.noise_dampener * opts.block_height) + opts.image_border_buff * opts.block_size

    var start_block_x = w/2 - opts.grid_height/2 * opts.block_size + opts.grid_width/2 * opts.block_size
    var start_block_y = h/2 - opts.grid_height/2 * opts.block_size/2 - opts.grid_width/2 * opts.block_size/2 + (parseInt(noise(0, 0) * opts.noise_multiplier) / opts.noise_dampener * opts.block_height/2)

    var cnv = createCanvas(w, h);
    cnv.parent('sketchdiv');
    background(255)
  
    pixelDensity(1)
    
    strokeWeight(opts.sw)

    for (let g = 0; g < iterations; g++) {
        
      for (let x = 0; x < opts.grid_height; x++) {
            for (let y = 0; y < opts.grid_width; y++) {
                
                cubes = int(noise((x + g) * opts.noise_scale, y * opts.noise_scale) * opts.noise_multiplier) / opts.noise_dampener
                
              for (let i = parseInt(cubes) - 1; i < parseInt(cubes); i++) {
                    draw_block((start_block_x + x*opts.block_size) - y*opts.block_size, (start_block_y + x*(opts.block_size/2)) + y*(opts.block_size/2) - int(i)*(opts.block_height), i)
            }
      }
      }
    }
}