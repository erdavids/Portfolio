p5.disableFriendlyErrors = true;

// Distance Size rotation rings
var planets = []
var sun = []

// pos - size
var stars = []


const opts = {
    // Generation Details
    Width: 1500,
    Height: 1400,
    Planets: 10,
    Distance: 110,
    Sun: 200,
    Stars: 15000,
    Hue_Change: 70,
    Saturation: 30,
    Brightness: 100,
    Star_Brightness: 70,
    Star_Drift: 20,
    Star_Size: 2,
    
  
  
    GitHub: () => github(),
    YouTube: () => youtube(),
    Generate: () => randomize(),
    Save: () => save(),
    Patreon: () => patreon(),
};

window.onload = function() {
  var gui = new dat.GUI({width:300});
  var img = gui.addFolder('Image Settings');
  img.add(opts, 'Width', 800, 2000).step(1).onChange(setup);
  img.add(opts, 'Height', 800, 2000).step(1).onChange(setup);
  
  var gen = gui.addFolder('Generation Settings')
  gen.add(opts, 'Planets')
  gen.add(opts, 'Distance')
  gen.add(opts, 'Sun')
  gen.add(opts, 'Stars')
  gen.add(opts, 'Star_Size')
  
  var col = gui.addFolder('Color Settings')
  col.add(opts, 'Hue_Change', 0, 360)
  col.add(opts, 'Saturation', 0, 100)
  col.add(opts, 'Brightness', 0, 100)
  col.add(opts, 'Star_Brightness', 0, 100)
  col.add(opts, 'Star_Drift', 0, 100)
  
  var made = gui.addFolder('Made by Eric Davidson')
  made.add(opts, 'GitHub')
  made.add(opts, 'YouTube')
  made.add(opts, "Patreon");
  
  gui.add(opts, 'Generate');
  gui.add(opts, 'Save');
                               

};

function github() {
    window.open('https://github.com/erdavids/Portfolio/tree/master/generative-orbit')
}

function youtube() {
  window.open('https://www.youtube.com/channel/UCUrmX3SvpPerq-KAfGBrgGQ')
}

function patreon() {
  
    window.open("https://www.patreon.com/thebuffed");
  }

function randomize() {
  randomSeed(random(10000))
  setup()
}

function save() {
  save('photo.png');
}

function distance(x1, y1, x2, y2) {
    return sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2))
}

function setup() {
    var canvasDiv = document.getElementById("sketchdiv");


    var cnv = createCanvas(opts.Width, opts.Height);
    cnv.parent("sketchdiv")
  
    planets = []
    stars = []
    sun = []

    pixelDensity(3)

    colorMode(HSB, 360, 100, 100)
    background(0, 0, 0)

    c = int(random(360))
    sun.push(c)

    // Create the stars
    for (var i = 0; i < opts.Stars; i++) {
        ran_x = random(opts.Width) 
        ran_y = random(opts.Height)

        let valid = true
        if (distance(ran_x, ran_y, opts.Width / 2, opts.Height / 2) >= (opts.Sun + (opts.Planets - 1) * opts.Distance)/2) {
            valid = false
        } 
        for (var j = 0; j < stars.length; j++) {
            if (distance(ran_x, ran_y, stars[j][0], stars[j][1]) < 3) {
                valid = false
            }
        }

        if (valid == true) {
            stars.push([ran_x, ran_y])
        }
    }


    // Create the planets (Distance Size rotation color rings)
    for (var i = 1; i < opts.Planets; i++) {
        c = c % 360
        planets.push(
            [opts.Sun + i * opts.Distance,
             random(20, 60),
             int(random(360)),
             c = c,
             false
            ])
        c += opts.Hue_Change
    }
    

    background(0, 0, 0)

    // Draw the Stars
    noStroke()
    for (var j = 0; j < stars.length; j++) {
        fill(120, 0, opts.Star_Brightness + random(-opts.Star_Drift, opts.Star_Drift))
        circle(stars[j][0], stars[j][1], opts.Star_Size)
    }

    translate(opts.Width / 2, opts.Height / 2)

    // Draw the Sun
    fill(sun[0], opts.Saturation, opts.Brightness)
    circle(0, 0, opts.Sun)

    // Draw/Update the planets (Distance Size rotation color rings)
    for (var j = 0; j < planets.length; j++) {
        //console.log(planets[j])
        c = planets[j][3]
        push()
        noFill()
        stroke(c, opts.Saturation, opts.Brightness)
        strokeWeight(2)
        circle(0, 0, planets[j][0])

        noStroke()

        rotate(radians(planets[j][2]))
        translate(0, -planets[j][0] / 2)
        fill(0, 0, 0)
        circle(0, 0, planets[j][1] + 20)
        fill(c, opts.Saturation, opts.Brightness)
        circle(0, 0, planets[j][1])

        pop()

    }

}
