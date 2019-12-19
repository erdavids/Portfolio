var d = new Date(); // for now
var h = d.getHours(); // => 9
var m = d.getMinutes(); // =>  30

var highlight_color = '#FFFFFF'

var hl = []

hl.push(document.getElementById("it"))
hl.push(document.getElementById("is"))
hl.push(document.getElementById("oclock"))

if (m > 50) {
  hl.push(document.getElementById("almost"))
  h += 1
} else if (m >= 45) {
  hl.push(document.getElementById("a"))
  hl.push(document.getElementById("quarter"))
  hl.push(document.getElementById("to"))
  h += 1
} else if (m >= 40) {
  hl.push(document.getElementById("twenty"))
  hl.push(document.getElementById("minutes"))
  hl.push(document.getElementById("to"))
  h += 1
} else if (m >= 30) {
  hl.push(document.getElementById("half"))
  hl.push(document.getElementById("past"))
} else if (m >= 20) {
  hl.push(document.getElementById("twenty"))
  hl.push(document.getElementById("minutes"))
  hl.push(document.getElementById("past"))
} else if (m >= 14) {
  hl.push(document.getElementById("a"))
  hl.push(document.getElementById("quarter"))
  hl.push(document.getElementById("past"))
} else {
  hl.push(document.getElementById("just"))
  hl.push(document.getElementById("past"))
}

hl.push(document.getElementById(h))





// Run after determining time and compliment
hl.forEach((item, index)=>{
    if (item != null) {
        item.style.color = highlight_color
    }
});