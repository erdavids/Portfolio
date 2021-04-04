p5.disableFriendlyErrors = true;

const opts = {
  // Generation Details
  Width: 300,
  Height: 100,
  OriginalPoints: [[20, 20], [40, 20], [20, 40]],
  Points: [],

  maxDistance: 10,
};

function setup()
{
  var canvasDiv = document.getElementById('sketchdiv');
  var width = opts.Width;
  var height = opts.Height;

  pixelDensity(2);
  
  var cnv = createCanvas(width, height);
  cnv.parent('sketchdiv');

  background('#54565D');
  stroke(255)

  // Deep Copy
  opts.Points = JSON.parse(JSON.stringify(opts.OriginalPoints));

}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))
}

function deformPoints() {
  for (var p in opts.Points) {
    let movement_x = getRandomArbitrary(-.1, .2)
    let movement_y = getRandomArbitrary(-.1, .2)

    if (getDistance([opts.Points[p][0] + movement_x, opts.Points[p][1] + movement_y], opts.OriginalPoints[p]) < opts.maxDistance) {
      opts.Points[p][0] += movement_x 
      opts.Points[p][1] += movement_y
    }
    
  }
}

function draw() {
  background('#54565D');
  beginShape()
  for (var p in opts.Points) {
    let c = opts.Points[p]
    vertex(c[0], c[1])
  }
  endShape(CLOSE)

  deformPoints()

}
