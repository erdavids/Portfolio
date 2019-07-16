
let r, g, b;

function setup() {
  // Move the canvas so it’s inside our <div id="sketch-holder">.

  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth
  var height = 600;

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  r = random(255);
  g = random(255);
  b = random(255);
  cnv.background(r, g, b);

  var section_size = height/5


  for (let i = 1; i < 6; i++) {
    r = random(255);
    g = random(255);
    b = random(255);
    fill(r, g, b);
    print(str(r) + "," + str(g) + "," + str(b))
    stroke(r, g, b);
    beginShape();
    for (let j = -50; j < width+50; j += 15) {
      curveVertex(j, i * section_size + random(-5, 5));
    }
    curveVertex(width+50, height);
    curveVertex(0, height);
    curveVertex(-50, i * section_size);

    endShape(CLOSE);
  }


  fill(35, 35, 35);
  stroke(255, 255, 255);
  strokeWeight(8)
  beginShape();

  let start_point = 550
  for (let j = -50; j < width+50; j += 45) {
    curveVertex(j, start_point + random(-40, 20))
    start_point -= 15
  }

  curveVertex(width+50, height);
  curveVertex(width/2, height+200);
  curveVertex(0, height+200);
  curveVertex(-50, i * section_size);
  endShape(CLOSE);
}

function draw() {
}

function keyTyped() {
  if (key === 'r') {
    setup()
  }

function mousePressed() {
  console.log(img.height)
}
