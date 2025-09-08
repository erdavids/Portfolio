const textarea = document.getElementById("ascii-area");
const chars = "abcdefghijklmnopqrstuvwxyz "; // characters to insert

const rows = textarea.rows;
const cols = textarea.cols;

// Character to fill
const fillChar = "$";

// Create a string with the full grid
let content = "";
for (let r = 0; r < rows; r++) {
  content += fillChar.repeat(cols) + "\n";
}

textarea.value = content.trimEnd();

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function typeRandomly() {
  const text = textarea.value;
  
  // Pick a random position in the text
  const pos = randomInt(text.length + 1);
  
  // Pick a random character
  const char = chars[randomInt(chars.length)];

  // Insert the character at that position
  textarea.value = text.slice(0, pos - 1) + char + text.slice(pos);

  // Move the cursor to a new random spot
  const newPos = randomInt(textarea.value.length + 1);
  textarea.focus();
  textarea.setSelectionRange(newPos, newPos);
}

// Run every 500ms
// setInterval(typeRandomly, 500);