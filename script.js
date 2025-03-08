
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
    var contactTexts = [
        '◉ <i class="fa-solid fa-envelope-open-text"></i> Email: <a href="mailto:pmnrai2020@gmail.com" target="_blank">pmnrai2020@gmail.com</a>',
        '◉ <i class="fa-solid fa-phone-volume"></i> Phone: <a href="tel:+917734807973" target="_blank">7734807973</a>',
        '◉ <i class="fa-brands fa-linkedin"></i> LinkedIn: <a href="https://www.linkedin.com/in/remote007/" target="_blank">https://www.linkedin.com/in/remote007/</a>',
        '◉ <i class="fa-solid fa-location-dot"></i> Location: <a href="#">Varanasi, India</a>'
    ];

    var iSpeed = 50; // Typing speed per character
    var lineDelay = 500; // Delay before next line starts
    var iIndex = 0; // Current line index
    var iTextPos = 0; // Current character position
    var contactCard = document.querySelector(".contact-card");
    var isTyping = false;

    function typewriter() {
        if (iIndex >= contactTexts.length) return; // Stop if all lines are printed

        let pTag = document.createElement("p");
        contactCard.appendChild(pTag);

        let rawText = contactTexts[iIndex]; // Raw text without HTML
        let tempText = document.createElement("div"); // Temp container for HTML parsing
        tempText.innerHTML = rawText;
        let plainText = tempText.textContent; // Extract only visible text (no &nbsp; issues)

        function typeLine() {
            if (iTextPos < plainText.length) {
                pTag.textContent = plainText.substring(0, iTextPos + 1) + "_"; // Show blinking cursor
                iTextPos++;
                setTimeout(typeLine, iSpeed);
            } else {
                pTag.innerHTML = rawText; // Apply full HTML only after finishing
                iIndex++;
                iTextPos = 0;

                // Scroll slightly after each line
                window.scrollBy({
                    top: 60, // Adjust scrolling distance
                    behavior: "smooth"
                });

                if (iIndex < contactTexts.length) {
                    setTimeout(typewriter, lineDelay);
                }
            }
        }

        typeLine();
    }

    function checkVisibility() {
        var contactSection = document.getElementById("contact");
        var rect = contactSection.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight && !isTyping) {
            isTyping = true;
            typewriter();
        }
    }

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);
    checkVisibility();
});

document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const modeIcon = document.getElementById("mode-icon"); // Sun/Moon icon

    // Function to update contact card links based on dark mode
    function updateContactLinks(isDarkMode) {
        document.querySelectorAll(".contact-card a").forEach(link => {
            if (isDarkMode) {
                link.style.textDecoration = "none";
                link.style.color = "whitesmoke";
                link.style.textShadow = "0px 2px 12px rgba(255, 223, 90, 0.8)";
            } else {
                link.style.textShadow = "0px 4px 12px black";
            }
        });
    }

    // Check if dark mode was explicitly disabled in localStorage
    const isDarkModeEnabled = localStorage.getItem("darkMode") !== "disabled";

    // Apply dark mode by default
    if (isDarkModeEnabled) {
        body.classList.add("dark-mode");
        if (modeIcon) modeIcon.innerHTML = "☀️"; // Dark mode active
    } else {
        if (modeIcon) modeIcon.innerHTML = "🌙"; // Light mode active
    }

    // Apply the correct styles initially
    updateContactLinks(isDarkModeEnabled);

    // Toggle Dark Mode on Icon Click
    if (modeIcon) {
        modeIcon.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            const isDarkMode = body.classList.contains("dark-mode");

            // Update mode icon
            modeIcon.innerHTML = isDarkMode ? "☀️":"🌙";

            // Save mode state
            localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");

            // Apply styles to contact card links
            updateContactLinks(isDarkMode);
        });
    }
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
            images[current].style.animation = "glitch 1s linear infinite, glitchEffect 0.8s infinite alternate;"; // Glitch effect

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