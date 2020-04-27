p5.disableFriendlyErrors = true;

var angle;
var axiom = "F"
var sentence = axiom
var len = 300;

var rules = []
rules[0] = {
    a: 'F',
    b: 'Go[-F]S[+G+F][+F]S[-G-F]*'
};

rules[1] = {
    a: 'G',
    b: 'G[+F]G[-F]S'
};

const opts = {
  // Generation Details
  height: 1200,
  
  // Additional Functions
  randomize: () => randomize(),
  save: () => save()
};

window.onload = function() {
  var gui = new dat.GUI({width:300});
  // gui.remember(opts)
  var general = gui.addFolder('Generation Details')
  general.add(opts, 'height', 500, 2000).onChange(setup);

};

function randomize() {
  noiseSeed()
  setup()
}

function save() {
  save('photo.png');
}

function generate() {
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
  createP(sentence);
  
  turtle();
}


function turtle() {
  
  background(211, 206, 194);
  
  fill(182, 187, 183)
  noStroke()
  circle(width/2, height/2, 400)
  
 
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
      if (random(1) < .5) {
        circle(0, 0, 10)
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
  
  angle = radians(25);
  
  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');
  
  strokeWeight(1);
  background(211, 206, 194);
  
  var button = createButton("generate");
  button.mousePressed(generate)
  
}
