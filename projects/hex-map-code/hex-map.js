p5.disableFriendlyErrors = true;

import * as dat from 'dat.gui';


var FizzyText = function() {
    this.message = 'dat.gui';
    this.speed = 0.8;
    this.displayOutline = false;
  };
  
  window.onload = function() {
    var text = new FizzyText();
    const gui = new dat.GUI();
    gui.add(text, 'message');
    gui.add(text, 'speed', -5, 5);
    gui.add(text, 'displayOutline');
  };

function setup()
{
  var canvasDiv = document.getElementById('sketchdiv');
  var width = canvasDiv.offsetWidth;
  var height = 1200;

  pixelDensity(2);
  
  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');
  frameRate(30);
  strokeWeight(1);
  stroke(0);
  
  draw_hexagon(30, 30, 30, 3);
  
  var hexagon_size = 10
  
  // var map_height = 8
  // var map_width = 7
  var map_height = int(1.5 * height / (.86 * hexagon_size))
  var map_width =  int(1.5 * width / (hexagon_size * 3))
  
  var hex_map = []
  for(i = 0; i < map_height ; i++) { 
    hex_map.push([])
  }
  
  var y = 0
  var x = 0

  for (i = 0; i < map_height; i++) {
    y = i * (.86 * hexagon_size)
    for (j = 0; j < map_width; j++) {
      if (i%2 == 0) {
        x = j * (hexagon_size * 3)
      } else {
        x = (hexagon_size * 1.5) + j * (hexagon_size * 3)
      }
      
      let noiseScale = .01
      let noiseVal = noise(x*noiseScale, y*noiseScale);
      hex_map[i].push([x, y, noiseVal])
    }
  }
  
  for (r = 0; r < hex_map.length; r++) {
    for (c = 0; c < hex_map[r].length; c++) {
      var t = hex_map[r][c]
      draw_hexagon(t[0], t[1], hexagon_size, t[2], 0)
    }
  }
  
}


function draw_hexagon(x, y, side, n, h) {
    let v = int(n * 255.0)
    
    fill(255)
    if (v < 30) {
      fill(120, 120, 225); 
    } else if(v < 60) {
      fill(150, 150, 255);
    } else if (v < 90) {
      fill(237, 201, 175);
    } else if (v < 120) {
      fill(207, 241, 135)
    } else if (v < 150) {
      fill(167, 201, 135)
    } else if (v < 170) {
      fill(170, 170, 170)
    }
    
    
    
    beginShape()
    vertex(x + side * sin(PI/2), y + side * cos(PI/2) - h)
    vertex(x + side * sin(PI/6), y + side * cos(PI/6) - h)
    vertex(x + side * sin(11 * PI/6), y + side * cos(11 * PI/6) - h)
    vertex(x + side * sin(3 * PI/2), y + side * cos(3 * PI/2) - h)
    vertex(x + side * sin(7 * PI/6), y + side * cos(7 * PI/6) - h)
    vertex(x + side * sin(5 * PI/6), y + side * cos(5 * PI/6) - h)
    endShape(CLOSE)
  
}