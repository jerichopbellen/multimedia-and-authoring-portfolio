/* jshint esversion: 6 */
document.addEventListener('DOMContentLoaded', () => {
    // Helper to load HTML snippets
    const loadComponent = (id, file) => {
        fetch(`includes/${file}`)
            .then(res => res.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            });
    };

    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');

    // Tech marquee: duplicate items once for seamless infinite loop
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