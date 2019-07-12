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

  console.log(width)

  var cnv = createCanvas(width, 400);
  cnv.parent('sketchdiv');

  background(20, 20, 20);

  for (let i = 0; i < 100; i++) {
    let r = random(-50, 50);
    line(50, i, 50 + r, i);
  }
}

function draw() {
  
}
