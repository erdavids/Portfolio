fetch('./Components/sidebar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('sidebar').innerHTML = html;

    // Now select links and sections
    const links = document.querySelectorAll(".selectable");
    const sections = document.querySelectorAll(".page-section");

    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault(); // stop page navigation

        // Remove selected class from all
        links.forEach(l => l.classList.remove("selected"));
        link.classList.add("selected");

        // Get the target from data attribute
        const targetId = link.getAttribute("data-target");

        // Hide all sections
        sections.forEach(section => section.style.display = "none");

        // Show the matching section
        if (targetId) {
          document.getElementById(targetId).style.display = "block";
        }
      });
    });
  });
