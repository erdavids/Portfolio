p5.disableFriendlyErrors = true;

const opts = {
  // Generation Details
  Width: 300,
  Height: 70,
  OriginalPoints: [[300/2 - 40, 100/2 - 40], [300/2 + 40, 100/2 - 40], [300/2 + 60, 100/2 - 20]],
  Points: [],

  maxDistance: 30,
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
  stroke('#eedfc8')
  strokeWeight(2)
  fill('#D9A06A')

  // Deep Copy
  // opts.Points = JSON.parse(JSON.stringify(opts.OriginalPoints));

  opts.Points = [[opts.Width/2 - 75, opts.Height/2], [opts.Width/2 - 25, opts.Height/2], [opts.Width/2 + 25, opts.Height/2], [opts.Width/2 + 75, opts.Height/2]]

  for (var p in opts.Points) {
    let c = opts.Points[p]
    fill('#D9A06A')
    circle(c[0], c[1], 30)
    noFill()
    stroke('#eedfc8')
    strokeWeight(2)
    
    let movement_x = getRandomArbitrary(-15, 15)
    let movement_y = getRandomArbitrary(-15, 15)

    circle(c[0] + movement_x, c[1] + movement_y, 30)

  }

}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))
}

function deformPoints() {
  for (var p in opts.Points) {
    let movement_x = getRandomArbitrary(-.2, .3)
    let movement_y = getRandomArbitrary(-.2, .3)

    if (getDistance([opts.Points[p][0] + movement_x, opts.Points[p][1] + movement_y], opts.OriginalPoints[p]) < opts.maxDistance) {
      opts.Points[p][0] += movement_x 
      opts.Points[p][1] += movement_y
    }
    
  }
}

// function draw() {
//   background('#54565D');
//   beginShape()
//   for (var p in opts.Points) {
//     let c = opts.Points[p]
//     vertex(c[0], c[1])
//   }
//   endShape(CLOSE)

//   deformPoints()

// }
