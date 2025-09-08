fetch('./Components/sidebar.html')
.then(res => res.text())
.then(html => {
  document.getElementById('sidebar').innerHTML = html;

  // Now run your click logic
  const links = document.querySelectorAll(".selectable");

  links.forEach(link => {
    link.addEventListener("click", e => {
    //   e.preventDefault();

      links.forEach(l => l.classList.remove("selected"));
      link.classList.add("selected");
    });
  });
});