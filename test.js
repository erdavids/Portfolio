let grid_height = 30
let grid_width = 60

let block_size = 10
let block_height = 3

let noise_scale = .05
let noise_multiplier = 100
let noise_dampener = 1



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
  frameRate(30)

  strokeWeight(1)
  stroke(0)
}

function draw() {
  background(255)

  start_block_x = width/2 - grid_height/2 * block_size + grid_width/2 * block_size
  start_block_y = height/2 - grid_height/2 * block_size/2 - grid_width/2 * block_size/2 + (int(noise(0, 0) * noise_multiplier) / noise_dampener * block_height/2)


  for ( let x = 0; x < grid_height; x++) {
    for ( let y = 0; y < grid_width; y++) {

        cubes = parseInt(noise((x + frameCount) * noise_scale, y * noise_scale) * noise_multiplier) / noise_dampener

        draw_block((start_block_x + x*block_size) - y*block_size, (start_block_y + x*(block_size/2)) + y*(block_size/2) - int(cubes)*(block_height), cubes)

        }
    }
}

// function draw() {

// }

