fetch('./Components/top-home-link.html')
.then(res => res.text())
.then(html => {
  document.getElementById('top-home-link').innerHTML = html;
})