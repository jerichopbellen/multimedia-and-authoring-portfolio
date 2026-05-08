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

    const tracks = document.querySelectorAll('[data-marquee]');
    tracks.forEach(track => {
        if (track.dataset.cloned === "true") return;

        const originalItems = Array.from(track.children);
        originalItems.forEach(item => {
            track.appendChild(item.cloneNode(true));
        });

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
});
