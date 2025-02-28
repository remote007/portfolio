
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const extraOffset = 55; // Additional offset to ensure visibility

        window.scrollTo({
            top: targetElement.offsetTop - navbarHeight - extraOffset,
            behavior: 'smooth'
        });
    });
});


// Unified Observer for Scroll Animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible', 'animate__fadeInUp');
        }
    });
}, { threshold: 0.2 });

// Apply observer to all relevant elements
document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".grid-container, .skill-card, .experience-card, .project-card, .contact-card").forEach(element => {
        observer.observe(element);
    });

    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
  
    // Check localStorage for dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
      body.classList.add("dark-mode");
    }
  
    // Toggle dark mode on button click
    darkModeToggle.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
  
      // Save preference in localStorage
      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        darkModeToggle.textContent = "Light Mode";
      } else {
        localStorage.setItem("darkMode", "disabled");
        darkModeToggle.textContent = "Dark Mode";
      }
    });

});

// Interactive Hover Effect for Cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.05)');
    card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
});

