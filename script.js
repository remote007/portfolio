// Smooth Scrolling for Navbar Links
// document.querySelectorAll('.nav-link').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();
//         const targetId = this.getAttribute('href').substring(1);
//         document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
//     });
// });

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        window.scrollTo({
            top: targetElement.offsetTop - navbarHeight - 20, // Offset to avoid overlap
            behavior: 'smooth'
        });
    });
});

// Fun Animation on Scroll (Fade-in Effect)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__fadeInUp');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.grid-container div').forEach(card => {
    observer.observe(card);
});

// Interactive Hover Effect for Cards
document.querySelectorAll('.skill-card, .experience-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Modal Open Animation
document.getElementById('hireModal').addEventListener('show.bs.modal', () => {
    document.querySelector('.modal-content').classList.add('animate__zoomIn');
});
