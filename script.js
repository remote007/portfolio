
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if(this.id == "toggle-div")
            return;
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

    const toggleSwitch = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const modeText = document.getElementById("mode-text");
  
    // Check localStorage for saved theme
    if (localStorage.getItem("darkMode") === "enabled") {
      body.classList.add("dark-mode");
      toggleSwitch.checked = true;
      modeText.textContent = "Switch to Light Mode";
    }
  
    // Toggle dark mode on switch change
    toggleSwitch.addEventListener("change", () => {
      body.classList.toggle("dark-mode");
  
      // Update text and save preference
      if (body.classList.contains("dark-mode")) {
        modeText.textContent = "Switch to Light Mode";
        localStorage.setItem("darkMode", "enabled");
      } else {
        modeText.textContent = "Switch to Dark Mode";
        localStorage.setItem("darkMode", "disabled");
      }
    });

});

// Interactive Hover Effect for Cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.05)');
    card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
});

