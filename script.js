document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".selectable");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      // Remove 'selected' class from all links
      links.forEach(l => l.classList.remove("selected"));

      // Add 'selected' to the clicked link
      link.classList.add("selected");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".left-side");
  const toggleBtn = document.querySelector(".sidebar-toggle");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
});