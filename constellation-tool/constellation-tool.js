p5.disableFriendlyErrors = true;

const opts = {
  // Generation Details
  Width: 1200,
  Height: 1200,

  Grid_Width: 3,
  Grid_Height: 3,
  Background: [0, 0, 0],
  Star: [255, 255, 255],
  Map: [0, 0, 0],
  Border: true,
  Border_Width: 2,
  Border_Angle: 6,

  Star_Count: 10000,
  Star_Dist: 5,
  Map_Size: 500,
  Constellation_Size: 3,
  Constellation_Width: 1,

  // Additional Functions
  Next: () => next_constellation(),
  Undo: () => undo(),
  GitHub: () => github(),
  YouTube: () => youtube(),
  randomize: () => randomize(),
  redra: () => redra(),
  save: () => save(),
  Patreon: () => patreon(),
};

window.onload = function () {
  var gui = new dat.GUI({ width: 400 });
  // gui.remember(opts)
  var general = gui.addFolder("Generation Details");
  general.open();
  general.add(opts, "Width", 500, 1500);
  general.add(opts, "Height", 700, 1600);
  general.add(opts, "Star_Count", 2000, 30000);
  general.add(opts, "Star_Dist");
  general.add(opts, "Border")
  general.add(opts, "Border_Width")
  general.add(opts, "Border_Angle", 1, 90)

  var col = gui.addFolder("Constellation Details");
  col.open();
  col.addColor(opts, "Background").onChange(redra);
  col.addColor(opts, "Map").onChange(redra);
  col.addColor(opts, "Star").onChange(redra);
  col.add(opts, "Constellation_Size", 1, 6)
  col.add(opts, "Constellation_Width", 1, 6)
  
  var controls = gui.addFolder("Controls")
  controls.open()
  controls.add(opts, "Next").name("Next Constellation");
  controls.add(opts, "Undo").name("Undo")
  controls.add(opts, "redra").name("Redraw")  
  controls.add(opts, "randomize").name("Randomize");
  controls.add(opts, "save").name("Save Image");

  var made = gui.addFolder("Made by Eric Davidson");
  made.add(opts, "GitHub");
  made.add(opts, "YouTube");
  made.add(opts, "Patreon");
};

function github() {
  window.open("https://github.com/erdavids/Portfolio/tree/master/constellation-tool");
}

function youtube() {
  
  window.open("https://www.youtube.com/channel/UCUrmX3SvpPerq-KAfGBrgGQ");
}

function patreon() {
  
    window.open("https://www.patreon.com/thebuffed");
  }

function redra() {
  background(opts.Background);
  
  // Create Texture

  
  
  strokeWeight(opts.Border_Width);
  stroke(opts.Star);
  fill(opts.Map);
  
    if (opts.Border) {
    push()

    translate(opts.Width/2, opts.Height/2)
    circle(0, 0, opts.Map_Size * 2 + 40)

    let r = opts.Border_Angle
    for (var i = 0; i < 360; i += r) {
      rotate(radians(r))

      line(0, -opts.Map_Size, 0, -opts.Map_Size - 20)
    }

    pop()
  }
  circle(opts.Width / 2, opts.Height / 2, opts.Map_Size * 2);
  
  
  draw_stars()
  
  draw_constellations()
}


function randomize() {
  setup();
  //   background(0, 0, 0)
  //   draw_stars()

  //   constellation = shuffle(constellation)
  //   draw_constellation()
}


function save() {
  save("photo.png");
}

var stars = [];

var grid = [];

var cell_width;
var cell_height;

var constellations = [];
var current_constellation

function next_constellation() {
  constellations.push([])
  current_constellation += 1
}

function undo() {
  if (constellations[current_constellation].length > 0) {
      constellations[current_constellation].pop()
  }
  
  redra()
}

function distance(x1, y1, x2, y2) {
  return sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
}

function setup() {
  stars = [];
  grid = [];
  constellations = [];
  constellations.push([])
  current_constellation = 0
  
  var canvasDiv = document.getElementById("sketchdiv");
  var cnv = createCanvas(opts.Width, opts.Height);
  cnv.parent("sketchdiv");

  cell_width = float(opts.Width) / opts.Grid_Width;
  cell_height = float(opts.Height) / opts.Grid_Height;

  for (var i = 0; i < opts.Grid_Height; i++) {
    grid.push([]);
    for (var j = 0; j < opts.Grid_Width; j++) {
      grid[i].push([]);
    }
  }

  redra()
  

  

  for (var s = 0; s < opts.Star_Count; s++) {
    let x = random(opts.Width);
    let y = random(opts.Height);

    let valid = true;

    if (distance(x, y, opts.Width / 2, opts.Height / 2) > opts.Map_Size) {
      valid = false;
    }

    for (var j = 0; j < stars.length; j++) {
      if (distance(x, y, stars[j][0], stars[j][1]) < opts.Star_Dist) {
        valid = false;
      }
    }

    if (valid) {
      let s = random(1, 3)
      stars.push([x, y, s]);
      grid[int(y / cell_height)][int(x / cell_width)].push([x, y, s]);
    }
  }

  draw_stars();
}

function draw_stars() {
  noStroke();
  fill(opts.Star);
  stars.forEach(function (s) {
    circle(s[0], s[1], s[2]);
  });
}

var constellation = [];

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);

  return array;
}

function draw_constellations() {
  noFill();
  strokeJoin(ROUND)
  strokeWeight(opts.Constellation_Width)
  stroke(opts.Star);
  for (var i = 0; i < constellations.length; i++) {
     beginShape();
    for (var j = 0; j < constellations[i].length; j++) {
      vertex(constellations[i][j][0], constellations[i][j][1])
      fill(opts.Star)
      circle(constellations[i][j][0], constellations[i][j][1], opts.Constellation_Size + random(-1, 1))
      noFill()
    }
    
    endShape();
  }
}

function mouseClicked() {
  if (mouseX > 0 && mouseX < opts.Width && mouseY > 0 && mouseY < opts.Height && distance(mouseX, mouseY, opts.Width/2, opts.Height/2) < opts.Map_Size) {
    let min = 1000;
    var add = [0, 0];
    for (
      var i = 0;
      i < grid[int(mouseY / cell_height)][int(mouseX / cell_width)].length;
      i++
    ) {
      var s_x = grid[int(mouseY / cell_height)][int(mouseX / cell_width)][i][0];
      var s_y = grid[int(mouseY / cell_height)][int(mouseX / cell_width)][i][1];

      var d = distance(s_x, s_y, mouseX, mouseY);
      if (d < min) {
        min = d;
        add = [s_x, s_y];
      }
    }

    noFill();
    stroke(opts.Star);
    strokeWeight(1)
    constellations[current_constellation].push(add);
  }
  
  draw_constellations()
}

function keyPressed() {
  if (keyCode === 67) {
    next_constellation()
  }
}