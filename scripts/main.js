/* jshint esversion: 6 */
document.addEventListener('DOMContentLoaded', () => {
    const loadComponent = (id, file) => {
        fetch(`includes/${file}`)
            .then(res => res.text())
            .then(data => {
                const el = document.getElementById(id);
                if (!el) return;
                el.innerHTML = data;
            })
            .catch(() => {});
    };

    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');

    // tech stack marquee duplication for seamless scrolling
    
    const tracks = document.querySelectorAll('[data-marquee]');
    tracks.forEach(track => {
        if (track.dataset.cloned === "true") return;
        track.innerHTML += track.innerHTML + track.innerHTML;
        track.dataset.cloned = "true";
    });


    // Typewriter effect for "Connect" in the contact section

    const str = "Connect";
    const typingSpeed = 120;   // ms per character
    const eraseSpeed = 75;     // ms per character erase
    const delayAfterType = 1600; // ms wait after typing
    const delayAfterErase = 700;  // ms wait after erasing
    let i = 0;
    let isErasing = false;
    const target = document.getElementById("typewrite-connect");
    if (!target) return;

    function typeLoop() {
        if (!isErasing) {
        // Typing
        target.textContent = str.slice(0, i+1);
        if (i < str.length - 1) {
            i++;
            setTimeout(typeLoop, typingSpeed);
        } else {
            setTimeout(() => {
            isErasing = true;
            setTimeout(typeLoop, eraseSpeed);
            }, delayAfterType);
        }
        } else {
        // Erasing
        target.textContent = str.slice(0, i);
        if (i > 0) {
            i--;
            setTimeout(typeLoop, eraseSpeed);
        } else {
            isErasing = false;
            setTimeout(typeLoop, delayAfterErase);
        }
        }
    }
    typeLoop();

    const selectors = [
        '.hero-video__content',
        '.feature',
        '.profile-card--purplefire',
        '.tech-marquee',
        '.contact-transparent-card',
        '.text-center',
        '.story-divider'
        // Any other key container for animated float-in
    ];
    // Gather all elements matching those selectors
    const floatupEls = document.querySelectorAll(selectors.join(','));

    floatupEls.forEach(el => el.classList.add('floatup'));

    // Intersection Observer to toggle animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.4
    });

    floatupEls.forEach(el => observer.observe(el));
});
