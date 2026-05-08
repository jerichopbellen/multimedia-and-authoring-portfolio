/* jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", function() {
    const planets = [
        {name: "Mercury", period: 0.24, desc: "The closest planet to the Sun and the smallest in the system. Extreme temperatures range from scorching heat to freezing cold."},
        {name: "Venus", period: 0.62, desc: "Earth's twin in size, shrouded in a thick, toxic atmosphere that traps heat, making it the hottest planet in our solar system."},
        {name: "Earth", period: 1.00, desc: "The only planet known to harbor life, featuring liquid water on its surface and a complex atmosphere."},
        {name: "Mars", period: 1.88, desc: "The Red Planet, home to the largest volcano in the solar system, Olympus Mons. Scientists study it for evidence of ancient water."},
        {name: "Jupiter", period: 11.86, desc: "A massive gas giant composed of hydrogen and helium, famous for its Great Red Spot—a storm larger than Earth."},
        {name: "Saturn", period: 29.45, desc: "Famous for its spectacular, complex ring system made of ice and dust. It has a vast array of moons, including Titan."},
        {name: "Uranus", period: 84.00, desc: "An ice giant that rotates on its side. Its blue-green color comes from methane in its atmosphere."},
        {name: "Neptune", period: 164.8, desc: "The most distant planet, cold, dark, and whipped by supersonic winds. It was discovered via mathematical prediction."}
    ];

    const container = document.getElementById('carouselInner');
    
    // 1. Inject the planets dynamically
    // Note: The Sun is already in the HTML as the first 'active' item
    planets.forEach(p => {
        const webmPath = `assets/videos/${p.name.toLowerCase()}.webm`;
        const mp4Path = `assets/videos/${p.name.toLowerCase()}.mp4`;

        container.insertAdjacentHTML('beforeend', `
            <div class="carousel-item">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="ratio ratio-16x9 bg-dark rounded">
                            <video autoplay loop muted playsinline class="rounded w-100">
                                <source src="${webmPath}" type="video/webm">
                                <source src="${mp4Path}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h2 class="text-primary">${p.name}</h2>
                        <ul class="list-unstyled text-white-50 mt-3">
                            <li><strong>Age on Planet:</strong> <span class="planet-age" data-period="${p.period}">--</span> years</li>
                            <li><strong>Total Revolutions:</strong> <span class="planet-revs" data-period="${p.period}">--</span> orbits</li>
                            <li><strong>Orbital Period:</strong> ${p.period} Earth Years</li>
                        </ul>
                        <p class="text-white-75">${p.desc}</p>
                    </div>
                </div>
            </div>
        `);
    });

    // 2. Initialize the Bootstrap Carousel instance
    const myCarouselElement = document.querySelector('#planetCarousel');
    new bootstrap.Carousel(myCarouselElement, {
        interval: false, // Prevents auto-sliding so users can read the data
        wrap: true
    });

    // 3. Run the calculation once on load to populate the initial value
    updateAllAges();
});

/**
 * Updates all age and revolution spans based on the input value
 */
function updateAllAges() {
    const inputVal = document.getElementById('userAgeInput').value;
    const age = parseFloat(inputVal) || 0;
    
    // Update Sun (Reference point)
    const sun = document.getElementById('sunAge');
    if(sun) sun.innerText = age;
    
    // Update dynamic planet ages
    document.querySelectorAll('.planet-age').forEach(el => {
        const period = parseFloat(el.getAttribute('data-period'));
        el.innerText = (age / period).toFixed(2);
    });
    
    // Update dynamic planet total revolutions
    document.querySelectorAll('.planet-revs').forEach(el => {
        const period = parseFloat(el.getAttribute('data-period'));
        el.innerText = Math.floor(age / period);
    });
}

/**
 * Handles the navigation button clicks
 * @param {number} index - The slide index (0 for Sun, 1 for Mercury, etc.)
 */
function jumpToSlide(index) {
    const myCarousel = document.querySelector('#planetCarousel');
    const carousel = bootstrap.Carousel.getInstance(myCarousel);
    if (carousel) {
        carousel.to(index);
    }
}