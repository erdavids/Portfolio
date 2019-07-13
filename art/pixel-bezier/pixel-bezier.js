// function setup() {
//   var cnv = createCanvas(400, 400);
//   var x = (windowWidth - width) / 2;
//   var y = (windowHeight - height) / 2;
//   cnv.position(x, y);
//   background(255, 0, 200);
// }

function setup() {
  // Move the canvas so it’s inside our <div id="sketch-holder">.

  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth
  var height = 600

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  img = loadImage('pixel-bezier/example.jpg');
}

function draw() {
  image(img, 0, 0);
}
