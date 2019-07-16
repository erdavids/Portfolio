

colors = [(127, 199, 175), (218, 216, 167), (167, 219, 216), (237, 118, 112), (92,97,130), (79,164,165), (202,166,122), (212,117,100),
  (139,169,135), (244,107,99), (100,161,165)]

function setup() {
  // Move the canvas so it’s inside our <div id="sketch-holder">.

  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth
  var height = 600;

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  cnv.background(random(colors))

  var section_size = height/5


  for (let i = 1; i < 6; i++) {
    fill(random(colors));
    beginShape();
    for (let j = -50; j < width+50; j += 5) {
      curveVertex(j, i * section_size + random(-5, 5));
    }
    endShape();
  }

}

function draw() {
}

function mousePressed() {
  console.log(img.height)
}
