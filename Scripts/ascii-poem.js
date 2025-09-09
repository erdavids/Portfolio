const poemarea = document.getElementById("poem-area");

const textarea = document.getElementById("ascii-area");
const rows = textarea.rows;
const cols = textarea.cols;

const chars = "!@#$%^&*.:[{}<>,/?~`]    "; // characters to insert


function fillArea() {
    
    // Character to fill
    const fillChar = "$";
    
    // Create a string with the full grid
    let content = "";
    for (let r = 0; r < rows; r++) {
      content += fillChar.repeat(cols) + "\n";
    }
    
    textarea.value = content.trimEnd();
}


function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function calculateAscii() {
    // Probably need to set it all back to the beginning each time
    fillArea()

    const rows = textarea.rows;
    const cols = textarea.cols;
    typeRandomly()
    typeCharacterAtPos(2, 8, '%')

    drawCircle(10, 10, 5)
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function drawCircle(x, y, r) {
    const c = ' '

    // start x
    let current_x = x - r;
    let current_y = y - r;
    while(current_x < x + r) {
        while (current_y < y + r) {
            // Make sure it fits the circle
            if (getDistance(current_x, current_y, x, y) < r) {
                typeCharacterAtPos(current_x, current_y, c)
            }
            current_y += 1;
        }
        current_x += 1;
        current_y = y - r;
    }
}

function typeCharacterAtPos(x, y, c) {
    const text = textarea.value;

  // Pick a random position
  if (x > cols || x < 0 || y < 0 || y > rows) { return }
  const pos = (y * (cols) + y) + x;

  // Get the character at that position
  const currentChar = text[pos];

  // Only replace if it's not a newline
  if (currentChar !== "\n") {
    const char = chars[randomInt(chars.length)];

    // Replace the character at pos
    textarea.value = text.slice(0, pos) + c + text.slice(pos + 1);
  }
}

function typeRandomly() {
  console.log("RNADOM");
  const text = textarea.value;

  // Pick a random position
  const pos = randomInt(text.length);

  // Get the character at that position
  const currentChar = text[pos];

  // Only replace if it's not a newline
  if (currentChar !== "\n") {
    const char = chars[randomInt(chars.length)];

    // Replace the character at pos
    textarea.value = text.slice(0, pos) + char + text.slice(pos + 1);
  }

  // Move the cursor to a new random spot
  const newPos = randomInt(textarea.value.length + 1);
  // textarea.focus();
  textarea.setSelectionRange(newPos, newPos);
}

// Run every 500ms
// setInterval(typeRandomly, 1);
fillArea()