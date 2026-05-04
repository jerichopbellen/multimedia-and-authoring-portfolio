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
});