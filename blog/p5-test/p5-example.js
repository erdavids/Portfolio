

function setup() {
  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth
  var height = 600

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  console.log("The sketch is setting up")

  background(206, 200, 176);
}

function draw() {
  let x = random(width);
  let y = random(height);

  noStroke();
  fill(random(255), random(255), random(255), 120);

  var s = random(100)
  ellipse(x, y, s, s);
}
