

function setup() {

  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth
  var height = 600

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  background(206, 200, 176);
}

function draw() {
  let x = random(width);
  let y = random(height);
  fill(random(255), random(255), random(255), 10);
  ellipse(x, y, random(20), random(20));
}
