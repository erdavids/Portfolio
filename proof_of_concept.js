p5.disableFriendlyErrors = true;

const opts = {
  // Generation Details
  grid_height: 40,
  grid_width: 40,

  block_size: 10,
  block_height: 3,
  lines: 2,
  sw: 1,
  noise_scale: 0.05,
  noise_multiplier: 100,
  noise_dampener: 1,
  image_border_buff: 15,
  x_offset: 0,
  y_offset: 0,

  background: "#262833",
  cube: "#ffffff",

  // // Additional Functions
  GitHub: () => github(),
  YouTube: () => youtube(),
  Generate: () => randomize(),
  Save: () => save(),
  create: () => createPlant()
};


const pane = new Tweakpane({
    container: document.getElementById('grab-me'),
  });

pane.addInput(opts, "grid_height", {
  min: 1,
  max: 100,
  step: 1
});

pane.addInput(opts, "grid_width", {
  min: 1,
  max: 100,
  step: 1
});

pane.addInput(opts, "block_size", {
  min: 1,
  max: 30,
  step: 1
});

pane.addInput(opts, "block_height", {
  min: 1,
  max: 15,
  step: 1
});

pane.addInput(opts, "y_offset", {
  min: -300,
  max: 300,
  step: 10
});

pane.addInput(opts, "x_offset", {
  min: -600,
  max: 600,
  step: 10
});

pane.addInput(opts, "background");
pane.addInput(opts, "cube");

const generate_btn = pane.addButton({
  title: "Generate New Image"
});
generate_btn.on("click", () => {
  randomize();
});

const save_btn = pane.addButton({
  title: "Download"
});
save_btn.on("click", () => {
  save();
});

function github() {
  window.open("https://github.com/erdavids/Portfolio/tree/master/road-lattice");
}

function youtube() {
  window.open("https://www.youtube.com/channel/UCUrmX3SvpPerq-KAfGBrgGQ");
}

function randomize() {
  draw();
}

function save() {
  save("photo.png");
}

function draw_block(x, y, h) {
  beginShape();

  vertex(x - opts.block_size, y);
  vertex(x, y - opts.block_size / 2);
  vertex(x + opts.block_size, y);
  vertex(x, y + opts.block_size / 2);
  endShape(CLOSE);

  beginShape();
  vertex(x - opts.block_size, y);
  vertex(x, y + opts.block_size / 2);
  vertex(x, y + opts.block_height + opts.block_size / 2);
  vertex(x - opts.block_size, y + opts.block_height);
  endShape(CLOSE);

  line_sep = float(opts.block_height) / opts.lines;
  for (let l = 0; l < opts.lines; l++) {
    line(
      x - opts.block_size,
      y + l * line_sep,
      x,
      y + opts.block_size / 2 + l * line_sep
    );
  }

  beginShape();
  vertex(x + opts.block_size, y);
  vertex(x, y + opts.block_size / 2);
  vertex(x, y + opts.block_height + opts.block_size / 2);
  vertex(x + opts.block_size, y + opts.block_height);
  endShape(CLOSE);
}

function setup() {
  noLoop();
}

function draw() {
  noiseSeed(random(0, 10000));
  var canvasDiv = document.getElementById("sketchdiv");

  var iterations = 1;

  var myDiv = document.getElementById("grab-me");
  var myWidth = myDiv.clientWidth;
  var w = myWidth;
  // var w = opts.grid_width * opts.block_size + opts.grid_height * opts.block_size + opts.image_border_buff * opts.block_size
  var h = myDiv.clientHeight;
  // var h = opts.grid_height * opts.block_size/2 + opts.grid_width * opts.block_size/2 + (parseInt(noise(0, 0) * opts.noise_multiplier) / opts.noise_dampener * opts.block_height) + opts.image_border_buff * opts.block_size

  var start_block_x =
    w / 2 -
    (opts.grid_height / 2) * opts.block_size +
    (opts.grid_width / 2) * opts.block_size;
  var start_block_y =
    h / 2 -
    ((opts.grid_height / 2) * opts.block_size) / 2 -
    ((opts.grid_width / 2) * opts.block_size) / 2 +
    ((parseInt(noise(0, 0) * opts.noise_multiplier) / opts.noise_dampener) *
      opts.block_height) /
      2;

  var cnv = createCanvas(myWidth, h);
  cnv.parent("sketchdiv");

  pixelDensity(2);

  strokeWeight(opts.sw);

  background(opts.background);

  fill(opts.cube);

  for (let x = 0; x < opts.grid_height; x++) {
    for (let y = 0; y < opts.grid_width; y++) {
      cubes =
        int(
          noise(x * opts.noise_scale, y * opts.noise_scale) *
            opts.noise_multiplier
        ) / opts.noise_dampener;

      for (let i = parseInt(cubes) - 1; i < parseInt(cubes); i++) {
        draw_block(
          start_block_x +
            x * opts.block_size -
            y * opts.block_size +
            opts.x_offset,
          start_block_y +
            x * (opts.block_size / 2) +
            y * (opts.block_size / 2) -
            int(i) * opts.block_height +
            opts.y_offset,
          i
        );
      }
    }
  }
}
