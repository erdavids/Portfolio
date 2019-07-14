// function setup() {
//   var cnv = createCanvas(400, 400);
//   var x = (windowWidth - width) / 2;
//   var y = (windowHeight - height) / 2;
//   cnv.position(x, y);
//   background(255, 0, 200);
// }

function preload() {
  img = loadImage('pixel-bezier/example.jpg');
}

function setup() {
  // Move the canvas so it’s inside our <div id="sketch-holder">.

  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth

  img.resize(width, 0);

  var height = img.height;

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  strokeWeight(3)
}

function draw() {
  let x = floor(random(img.width));
  let y = floor(random(img.height));
  let pix = img.get(x, y);
  fill(pix, 128);

  beginShape();
  curveVertex(84, 91);
  curveVertex(84, 91);
  curveVertex(68, 19);
  curveVertex(21, 17);
  curveVertex(32, 91);
  curveVertex(32, 91);
  // curveVertex(x + random(-30, 30), y + random(-30, 30));
  // curveVertex(x, y);
  // curveVertex(x + random(-30, 30), y + random(-30, 30));
  endShape();
}

function mousePressed() {
  console.log(img.height)
}
