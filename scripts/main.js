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
});