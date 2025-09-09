const textarea = document.getElementById("ascii-area");
const chars = "!@#$%^&*.:[{}<>,/?~`]    "; // characters to insert

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

// Pick a random position
const pos = randomInt(text.length);

// Get the character at that position
const currentChar = text[pos];

// Only replace if it's not a newline
if (currentChar !== '\n') {
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
setInterval(typeRandomly, 1);