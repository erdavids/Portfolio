p5.disableFriendlyErrors = true;

const opts = {
  // Generation Details
  Width: 1200,
  Height: 800,
  Iterations: 5,
  Length: 300,
  Angle: 25,
  Angle_Drift: 5,
  Line_Width: 1,
  rule0a: 'F',
  rule0b: 'Go[-F]S[+G+F*][+F]S[-G-F*]',
  rule1a: 'G',
  rule1b: 'G[+F]G[-F]S',
  Background: [211, 206, 194],
  Shape: [172, 187, 173],
  Fruit: [200, 140, 100],
  Red_Drift: 20,
  Green_Drift: 20,
  Blue_Drift: 20,
  Line_Color: [0, 0, 0],
  Line_Width: 1,
  Line_Opacity: 150,
  Opacity_Drift: 50,
  
  // Additional Functions
  Generate: () => randomize(),
  Save: () => save(),
  create: () => createPlant(),
};

window.onload = function() {
  var gui = new dat.GUI({width:300});
  var img = gui.addFolder('Image Settings');
  img.add(opts, 'Width', 300, 1400).step(1).onChange(setup);
  img.add(opts, 'Height', 300, 1400).step(1).onChange(setup);
  
  var gen = gui.addFolder('Generation Settings')
  gen.add(opts, 'Iterations', 1, 10).step(1).onChange(setup);
  gen.add(opts, 'Length').onChange(updateRules);
  gen.add(opts, 'Angle').onChange(updateRules);
  gen.add(opts, 'Angle_Drift').onChange(updateRules);
  gen.add(opts, 'rule0a').onChange(updateRules);
  gen.add(opts, 'rule0b').onChange(updateRules);
  gen.add(opts, 'rule1a').onChange(updateRules);
  gen.add(opts, 'rule1b').onChange(updateRules);
  var col = gui.addFolder("Color Settings")
  col.addColor(opts, 'Background')
  col.addColor(opts, 'Shape')
  col.addColor(opts, 'Fruit')
  col.add(opts, 'Red_Drift');
  col.add(opts, 'Green_Drift');
  col.add(opts, 'Blue_Drift');
  col.addColor(opts, 'Line_Color')
  col.add(opts, 'Line_Width', 1, 5).step(1);
  col.add(opts, 'Line_Opacity', 0, 255).step(1);
  col.add(opts, 'Opacity_Drift').step(1);
  gui.add(opts, 'Generate');
  gui.add(opts, 'Save');
                               

};

var ang;
var axiom = "F"
var sentence = axiom
var len = opts.Length;

var rules = []
rules[0] = {
    a: opts.rule0a,
    b: opts.rule0b
};

rules[1] = {
    a: opts.rule1a,
    b: opts.rule1b,
};

function randomize() {
  randomSeed(random(10000))
  updateRules()
  setup()
}

function save() {
  save('photo.png');
}

function updateRules() {
  rules[0] = {
    a: opts.rule0a,
    b: opts.rule0b
  };
  
  rules[1] = {
      a: opts.rule1a,
      b: opts.rule1b,
  };
  
  len = opts.Length
}

function generate(iter) {
  var nextSentence = "";
  
  len *= random(0.48, 0.52);
 
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  
  turtle(iter);
}


function turtle(iter) {
  
  background(opts.Background);
  
  fill(opts.Shape)
  noStroke()
  // pushMatrix()
  translate(width/2, height/2)
  rotate(random(PI))
  rect(-200, -200, 400, 400)
  // popMatrix()
  
  stroke(0, 100)
  resetMatrix();
  translate(width / 2, height);
  
  var circle_calls = 0
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current == 'F' || current == 'G') {
      stroke(opts.Line_Color, opts.Line_Opacity + random(-opts.Opacity_Drift, opts.Opacity_Drift));
      line(0, 0, 0, -len)
      translate(0, -len);
    } else if (current == '+') {
      ang = radians(random(opts.Angle - opts.Angle_Drift, opts.Angle + opts.Angle_Drift))
      rotate(ang);
    } else if (current == '-') {
      ang = radians(random(opts.Angle - opts.Angle_Drift, opts.Angle + opts.Angle_Drift))
      rotate(-ang);
    } else if (current == '[') {
      push();
    } else if (current == ']') {
      pop();
    } else if (current == 'S') {
      translate(0, -len/4);
    } else if (current == '*') {
      noFill()
      circle_calls += 1
      if (circle_calls > 50 && random(1) < .4) {
        fill(opts.Fruit[0] + random(-opts.Red_Drift, opts.Red_Drift), opts.Fruit[1] + random(-opts.Green_Drift, opts.Green_Drift), opts.Fruit[2] + random(-opts.Blue_Drift, opts.Blue_Drift))
        circle(0, 0, random(4, 13))
      }
    }
  }
  
  resetMatrix()
}

function setup()
{
  var canvasDiv = document.getElementById('sketchdiv');
  var width = opts.Width;
  var height = opts.Height;

  pixelDensity(2);
  
  ang = radians(opts.Angle);
  len = opts.Length
  
  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');
 
  
  
  strokeWeight(opts.Line_Width);
  background(211, 206, 194);
  
  sentence = axiom
  createPlant();
  
}

function createPlant() {
  for (var i = 0; i < int(opts.Iterations); i++) {
    generate(i);
  }
}
