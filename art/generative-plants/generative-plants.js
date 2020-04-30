p5.disableFriendlyErrors = true;

const opts = {
  // Generation Details
  Iterations: 5,
  Length: 300,
  Angle: 25,
  Angle_Drift: 5,
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
  
  // Additional Functions
  Generate: () => randomize(),
  Save: () => save(),
  create: () => createPlant(),
};

window.onload = function() {
  var gui = new dat.GUI({width:300});
  // gui.remember(opts)
  gui.add(opts, 'Iterations', 1, 7).step(1).onChange(setup);
  gui.add(opts, 'Length').onChange(updateRules);
  gui.add(opts, 'Angle').onChange(updateRules);
  gui.add(opts, 'Angle_Drift').onChange(updateRules);
  gui.add(opts, 'rule0a').onChange(updateRules);
  gui.add(opts, 'rule0b').onChange(updateRules);
  gui.add(opts, 'rule1a').onChange(updateRules);
  gui.add(opts, 'rule1b').onChange(updateRules);
  gui.addColor(opts, 'Background')
  gui.addColor(opts, 'Shape')
  gui.addColor(opts, 'Fruit')
  gui.add(opts, 'Red_Drift');
  gui.add(opts, 'Green_Drift');
  gui.add(opts, 'Blue_Drift');
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
      stroke(0, random(100, 200));
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
  var width = 1200;
  var height = 800;

  pixelDensity(2);
  
  ang = radians(opts.Angle);
  len = opts.Length
  
  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');
 
  
  
  strokeWeight(1);
  background(211, 206, 194);
  
  sentence = axiom
  createPlant();
  
}

function createPlant() {
  for (var i = 0; i < int(opts.Iterations); i++) {
    generate(i);
  }
}
