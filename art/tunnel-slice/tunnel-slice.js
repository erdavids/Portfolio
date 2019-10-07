
let r, g, b;

function setup() {
  // Move the canvas so it’s inside our <div id="sketch-holder">.

  var canvasDiv = document.getElementById('sketchdiv')
  var width = canvasDiv.offsetWidth
  var height = 600;

  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');


}

function draw() {

}

function keyTyped() {
  if (key === 'r') {
    setup()
  }
}
