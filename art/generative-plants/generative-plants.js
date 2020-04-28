p5.disableFriendlyErrors = true;

const opts = {
  // Generation Details
  iterations: 4,
  length: 300,
  ang: 25,
  
  // Additional Functions
  randomize: () => randomize(),
  save: () => save(),
  create: () => createPlant(),
};

window.onload = function() {
  var gui = new dat.GUI({width:300});
  // gui.remember(opts)
  gui.add(opts, 'iterations', 1, 7).step(1).onChange(setup);
  gui.add(opts, 'randomize')
  gui.add(opts, 'save');

};

var angle;
var axiom = "F"
var sentence = axiom
var len = opts.length;

var rules = []
rules[0] = {
    a: 'F',
    b: 'Go[-F]S[+G+F*][+F]S[-G-F*]'
};

rules[1] = {
    a: 'G',
    b: 'G[+F]G[-F]S'
};

function randomize() {
  noiseSeed()
  createPlant()
}

function save() {
  save('photo.png');
}

function generate(iter) {
  var nextSentence = "";
  
  len *= 0.5;
 
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
  
  background(211, 206, 194);
  
  fill(182, 187, 183)
  noStroke()
  circle(width/2, height/2, 500)
  
  stroke(0, 100)
  resetMatrix();
  translate(width / 2, height);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current == 'F' || current == 'G') {
      stroke(0, 100);
      line(0, 0, 0, -len)
      translate(0, -len);
    } else if (current == '+') {
      angle = radians(random(10, 30))
      rotate(angle);
    } else if (current == '-') {
      angle = radians(random(10, 30))
      rotate(-angle);
    } else if (current == '[') {
      push();
    } else if (current == ']') {
      pop();
    } else if (current == 'S') {
      translate(0, -len/4);
    } else if (current == '*') {
      noFill()
      if (random(1) < .4) {
        fill(200, 100, 100, random(50, 255))
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
  var height = 700;

  pixelDensity(2);
  
  angle = radians(opts.angle);
  
  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');
  
  strokeWeight(1);
  background(211, 206, 194);
  
  len = opts.length
  sentence = axiom
  createPlant();
  
}

function createPlant() {
  for (var i = 0; i < int(opts.iterations); i++) {
    generate(i);
  }
}
