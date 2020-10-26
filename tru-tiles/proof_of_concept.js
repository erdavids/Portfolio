// GLOBAL VARIABLES 

var start_time;
var timing = false;
var time_left
let orig = []
let solution = []

// All possible tile types
let possible_tiles = [-1, 0, 1, 2, 3, 4]
var solved_levels
let level_data = [
  [2, 30, 1,2],
  [2, 20, 3,3],
  [2, 15, 4,4],
  [3, 40, 3,4],
  [3, 40, 4,6],
  [3, 35, 6,7],
  [3, 40, 8,9]
    
]

var total_time = level_data[0][1]
// Solid tiles (all white, all black)
let solid_tiles = [-1, 0]

// Number of rows/columns
var grid_size = level_data[0][0]

// Number of tiles
var min_tiles = level_data[0][2]
var max_tiles = level_data[0][3]

var block_size
var block_space
var width_pad
var originY
var originX
var block_y

var location_x
var location_y

// Size of the individual cells
var cell_size
var cs

// drag 
var drag_count = 0
let press_ind = false
let clear_ind_click = false

var center_tile_x, center_tile_y;
var offsetX, offsetY;
var drag
var double_click = false
var w = 1;
var solved
var next_level = document.getElementById("next_level");
var restart_level = document.getElementById("restart_level");
var start_game = document.getElementById("start_page");
var run




function update_level_text() {

    document.getElementById("level_text").innerHTML = "Level " + (solved_levels + 1);
}

function update_rotation_text(rotation_amount) {
    document.getElementById("rotation_text").innerHTML = "Rotate " + (rotation_amount) + " Degrees Clockwise";
}



function check_solution() {
    var solved = true
    for (i = 0; i < grid_size; i++) {
        for (j = 0; j < grid_size; j++) {
            if (player_grid[i][j] != solution[i][j]) {
                solved = false
                //console.log(solved)
            }
        }
    }
    if(solved == true){
        
        solved_text()
    }

    //console.log(solution)
    //console.log(player_grid)

}

function solved_text(){
    next_level.style.visibility = "visible";
    run = false
    
}

function startGame(){
    
        grid_size = level_data[solved_levels][0]
        clear_grid()
        setup()
        update_level_text()
        start_game.style.visibility = "hidden";
        start_timing()
    
    
}

function nextLevel() {

        
        solved_levels += 1
        grid_size = level_data[solved_levels][0]
        clear_grid()
        setup()
        update_level_text()
        next_level.style.visibility = "hidden";
        loop()
        start_timing()


}

function time_up(){
    
        restart_level.style.visibility = "visible";
        run = false
    
    
}

function restartLevel(){
        grid_size = level_data[solved_levels][0]
        clear_grid()
        setup()
        update_level_text()
        restart_level.style.visibility = "hidden";
        start_timing()
    
}

    // Draw the tiles based on the contents of the orig list
    // s - shape to draw, x, y - origin of block, cs - cell size t - tile type
    function draw_shape(s, x, y, cs) {

        fill(0)
        for (i = 0; i < grid_size; i++) {
            for (j = 0; j < grid_size; j++) {
                switch (s[j][i]) {
                    // Solid black
                    case -1:
                        rect(x + cs * i, y + cs * j, cs, cs)
                        break;
                        // Flipped from 3
                    case 1:
                        triangle(x + cs * i, y + cs * j, x + cs * i + cs, y + cs * j, x + cs * i, y + cs * j + cs)
                        break;
                    case 2:
                        triangle(x + cs * i, y + cs * j, x + cs * i + cs, y + cs * j, x + cs * i + cs, y + cs * j + cs)
                        break;
                        // Flipped from 1
                    case 3:
                        triangle(x + cs * i + cs, y + cs * j, x + cs * i + cs, y + cs * j + cs, x + cs * i, y + cs * j + cs)
                        break;
                    case 4:
                        triangle(x + cs * i, y + cs * j, x + cs * i + cs, y + cs * j + cs, x + cs * i, y + cs * j + cs)
                        break;

                    default:
                        //console.log("Still worked")
                        break;
                }
            }
        }
    }

    // Crawls through the orig list to assign tile values

function create_original_shape() {
    // Fill out the 2D list with 0 values (blank tiles)
    orig = []
    for (i = 0; i < grid_size; i++) {
        orig.push([])
        for (j = 0; j < grid_size; j++) {
            orig[i].push(0)

            }
        }

        // Create Top Left (will be used for bottom right)
        for (i = 0; i < grid_size; i++) {
            for (j = 0; j < grid_size - i - 1; j++) {
                orig[i][j] = possible_tiles[Math.floor(Math.random() * possible_tiles.length)];
            }
        }

        // Create middle line with only solid black or white tiles
        i = 0
        for (j = grid_size - 1; j >= 0; j--) {
            orig[i][j] = solid_tiles[Math.floor(Math.random() * solid_tiles.length)];

            i++;
        }

        // Tricky, assign tiles to bottom right based on top left, flip when necessary for symmetry
        for (i = 0; i < grid_size; i++) {
            for (j = 0; j < grid_size - i - 1; j++) {
                shape = orig[j][i]
                if (shape == 1 || shape == 3) {
                    shape = (shape + 2) % 4
                }
                orig[grid_size - 1 - i][grid_size - 1 - j] = shape
            }
        }
    
    // Check for non-solid grid
    let valid = false
    let valid_num_tiles = false
    let num_tiles = 0
    min_tiles = level_data[solved_levels][2]
    max_tiles = level_data[solved_levels][3]
    
    for (i = 0; i < grid_size; i++) {
        for (j = 0; j < grid_size; j++) {
            
            if( orig[j][i]!= 0){
                num_tiles = num_tiles + 1
                
            }
            if (orig[j][i] != 0 && orig[j][i] != -1) {
                
                valid = true
            }
        }
    }
    //console.log(orig)
    console.log(num_tiles)
    if(num_tiles >= min_tiles && num_tiles <= max_tiles){
                    valid_num_tiles = true
    }
                
    if (!valid || !valid_num_tiles) {
        create_original_shape()
    }
}


    // Pass in the grid list - l
    function rotate_grid_ninety_degrees(l) {

        // Copy original by value
        o = l.slice()
        r = []

        // Fill every spot of the solution with 0 (blank tiles)
        for (i = 0; i < grid_size; i++) {
            r.push([])
            for (j = 0; j < grid_size; j++) {
                r[i].push(0)

            }
        }


        // Grab the 
        for (i = 0; i < grid_size; i++) {
            for (j = 0; j < grid_size; j++) {
                v = o[grid_size - j - 1][i]

                if (v > 0) {
                    v += 1

                    if (v > 4) {
                        v %= 4
                    }
                }

                r[i][j] = v


            }
        }

        return r

    }


    function createBase() {


        var block_x = (width_pad + block_size + block_space);

        // Origin for goal grid
        var goal_grid_x = width_pad
        var goal_grid_y = 50



        /////////////////
        // Original Shape
        /////////////////

        noFill()
        stroke(0)

        square(goal_grid_x, goal_grid_y, block_size);
        //Draw original grid
        for (i = 1; i < grid_size; i++) {
            beginShape()
            vertex(goal_grid_x + cell_size * i, block_y);
            vertex(goal_grid_x + cell_size * i, block_y + block_size);
            endShape(CLOSE)

            beginShape()
            vertex(goal_grid_x, block_y + cell_size * i);
            vertex(goal_grid_x + block_size, block_y + cell_size * i);
            endShape(CLOSE)
        }



        // Fill the orig list with tile values

        // Draw all the tiles in the orig list
        draw_shape(orig, goal_grid_x, goal_grid_y, cell_size)


        //////////////
        // Player Grid
        //////////////
        noFill()

        square(block_x, block_y, block_size);

        //Draw goal grid
        for (i = 1; i < grid_size; i++) {
            beginShape()
            vertex(block_x + cell_size * i, block_y);
            vertex(block_x + cell_size * i, block_y + block_size);
            endShape(CLOSE)

            beginShape()
            vertex(block_x, block_y + cell_size * i);
            vertex(block_x + block_size, block_y + cell_size * i);
            endShape(CLOSE)
        }



        noStroke();
        drawTile(w, center_tile_x, center_tile_y)

    }


    function clear_grid() {
        player_grid = []
        for (i = 0; i < grid_size; i++) {
            player_grid.push([])
            for (j = 0; j < grid_size; j++) {
                player_grid[i][j] = 0

            }
        }
    }


    //////////////
    // Rotate Tile
    //////////////

    function rotateTile(w) {
        if(run == true){
        loop()
        fill(255);
        noStroke();
        square(center_tile_x, center_tile_y, cs);
        drawTile(w, center_tile_x, center_tile_y)
        }
        

    }

    function mousePressed() {
        if (mouseX >= center_tile_x && mouseX < center_tile_x + cs && mouseY >= center_tile_y && mouseY < center_tile_y + cs) {
            drag = true
            drag_count++
            offsetx = center_tile_x - mouseX
            offsety = center_tile_y - mouseY


        }

    }


    function mouseClicked() {
        press_ind = true
        clear_ind_click = true


        if (mouseX >= center_tile_x && mouseX < center_tile_x + cs && mouseY >= center_tile_y && mouseY < center_tile_y + cs) {
            w++
            console.log(w)
            if (w == 0) {
                w = 1
            }
            if (w > 4) {
                w = -1
            }
        }

        rotateTile(w)

    }

    //////////////
    // Drag Tile 
    //////////////



    function draw() {

       if(run == true){
           if (timing) {
            update_time()
        }
        background(255);


        fill(0, 255, 255, 200);
        createBase();
        fill_grid();
        conVerter();



        player();

        let drop_x
        let drop_y
        if (drag == true) {

            drop_x = mouseX + offsetx
            drop_y = mouseY + offsety

        }
        drawTile(w, drop_x, drop_y);
             
       } 
    }



    
   
    



    var dropX = 0;
    var dropY = 0;

    function mouseReleased() {

        drag = false;

        dropX = mouseX
        dropY = mouseY
        if (mouseX < originX | mouseY < originY | mouseX > originX + cs * grid_size | mouseY > originX + cs * grid_size) {
            drag_count = 0
        }
    }


    let player_grid = []
    for (i = 0; i < grid_size; i++) {
        player_grid.push([])
        for (j = 0; j < grid_size; j++) {
            player_grid[i][j] = 0

        }
    }


    function fill_grid() {


        if (drag == false && press_ind == true && drag_count > 0) {

            for (i = 0; i < (grid_size); i++) {

                for (j = 0; j < grid_size; j++) {
                    if (mouseX > originX + cs * i && mouseX < originX + cs * (i + 1) &&
                        mouseY > originY + cs * j && mouseY < originY + cs * (j + 1)) {
                        player_grid[j][i] = w
                        check_solution()
                        press_ind = false

                    }
                }
            }
        }
        if (double_click == true) {
            player_grid[location_y][location_x] = 0
            double_click = false
        }
        return player_grid

    }





    function conVerter() {


        for (i = 0; i < (grid_size); i++) {

            for (j = 0; j < grid_size; j++) {
                if (mouseX > originX + cs * i && mouseX < originX + cs * (i + 1) &&
                    mouseY > originY + cs * j && mouseY < originY + cs * (j + 1)) {
                    location_x = i
                    location_y = j


                }
            }
        }

    }


    function doubleClicked(event) {


        if (mouseX > originX + cs * location_x && mouseX < originX + cs * (location_x + 1) &&
            mouseY > originY + cs * location_y && mouseY < originY + cs * (location_y + 1)) {
            double_click = true


        }
        return player_grid

    }

    function player() {

        draw_shape(player_grid, originX, originY, cs)


    }
    //////////////
    // Draw Tile 
    //////////////

    function drawTile(tile_type, x, y) {
        fill(0)
        noStroke()
        switch (tile_type) {
            // Solid black
            case -1:
                rect(x, y, cs, cs)
                break;
                // Flipped from 3
            case 1:
                triangle(x, y, x + cs, y, x, y + cs)
                break;
            case 2:
                triangle(x, y, x + cs, y, x + cs, y + cs)
                break;
                // Flipped from 1
            case 3:
                triangle(x + cs, y, x + cs, y + cs, x, y + cs)
                break;
            case 4:
                triangle(x, y, x, y + cs, x + cs, y + cs)
                break;

            default:
                //console.log("Still worked")
                break;
        }
    }

    function start_timing() {
        startTime = new Date();
        timing = true;
    };

    function update_time() {
        endTime = new Date();
        var timeDiff = Math.round((endTime - startTime) / 1000);
        total_time = level_data[solved_levels][1]

        time_left =  total_time - timeDiff

        var min = Math.floor(time_left / 60)
        var sec = Math.floor(time_left % 60)

        // This is where we would stop the game or call another function
        if (time_left < 0) {
            timing = false
            time_up()
            return
        }

        if (sec < 10) {
            sec = "0" + sec

        }


        if (min == 0 && sec < 10) {
            document.getElementById("timer_button").style.color = "red"

        }


        document.getElementById("timer_button").value = String(min) + ":" + String(sec);
    }


    function setup() {
        var canvasDiv = document.getElementById('sketchdiv');

        var width = canvasDiv.offsetWidth;
        var height = 1000;

        var cnv = createCanvas(width, height);
        cnv.parent('sketchdiv');

        block_space = width / 5;
        block_size = width / 3;
        width_pad = (width - ((block_size * 2) + block_space)) / 2;
        originY = 50;
        originX = (width_pad + block_size + block_space);
        block_y = 50;

        orig = []

        solution = []

        drawn_shapes = false

        if (solved_levels == null) {

            solved_levels = 0
        }

        grid_size = level_data[solved_levels][0]

        

        cell_size = block_size / grid_size
        cs = cell_size
        run =true

        center_tile_x = (width / 2) - cs / 2;
        center_tile_y = (block_size / 2) + block_y - (cs / 2);


        pixelDensity(2);

        frameRate(30);
        strokeWeight(1);
        stroke(0);
        background(255);
        create_original_shape();
        // Creates and stores the solution grid by converting original
        var rotation_amount = Math.floor(Math.random() * Math.floor(3));
        solution = rotate_grid_ninety_degrees(orig);
        
        for (j = 0; j < rotation_amount; j++) {
            solution = rotate_grid_ninety_degrees(solution);
        }
        
        update_rotation_text(90 + 90 * rotation_amount);
        
        createBase();

        drawn_shapes = true

    }
