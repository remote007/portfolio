
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if(this.id == "toggle-div")
            return;
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const extraOffset = 45; // Additional offset to ensure visibility

        window.scrollTo({
            top: targetElement.offsetTop - navbarHeight - extraOffset,
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {

    // document.getElementById("contact-card-p").removeAttribute("content");
    
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

document.addEventListener("DOMContentLoaded", function () {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
        const images = card.querySelectorAll(".project_img img");
        
        let current = 0;
        let interval;
        let userInteracted = false;

        function showNextImage() {
            images.forEach(img => {
                img.style.opacity = "0";  // Hide all images
                img.style.animation = "none"; // Remove animation
            });
            images[current].style.opacity = "1";
            images[current].style.animation = "glitch 1.5s linear infinite, glitchEffect 0.3s infinite alternate;"; // Glitch effect

            current = (current + 1) % images.length;
        }

        function startSlideshow() {
            if (!interval) {
                interval = setInterval(showNextImage, 4000);
                showNextImage();
            }
        }

        function stopSlideshow() {
            clearInterval(interval);
            interval = null;
        }

        function checkVisibility() {
            const rect = card.getBoundingClientRect();
            const inViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;

            if (inViewport) {
                startSlideshow();
            } else {
                stopSlideshow();
            }
        }

        function enableAudio() {
            userInteracted = true;
            document.removeEventListener("click", enableAudio);
            document.removeEventListener("scroll", enableAudio);
        }

        document.addEventListener("click", enableAudio);
        document.addEventListener("scroll", enableAudio);

        window.addEventListener("scroll", checkVisibility);
        window.addEventListener("resize", checkVisibility);
        checkVisibility();
    });
    
});
