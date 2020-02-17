
$.get("/side-bar.html", function(data){
    $("#side-placeholder").replaceWith(data);
});

function dark_mode() {
    document.body.style.backgroundColor = '#303030';
document.body.style.color = "#ffffff"
}

var myArray = ['#d47564', '#CAA67A', '#4fa4a5'];

var elements = document.getElementsByClassName("color-text");
var c = ''
var last_c = ''
for(var i=0; i<elements.length; i++) {
    c = myArray[Math.floor(Math.random() * myArray.length)];
    while (c == last_c) {
        c = myArray[Math.floor(Math.random() * myArray.length)];
    }
    elements[i].style.color = c;
}

var links = document.getElementsByTagName("a");
for(var i=0;i<links.length;i++)
{
    if(links[i].href)
    {
        links[i].style.color = myArray[Math.floor(Math.random() * myArray.length)];
    }
}