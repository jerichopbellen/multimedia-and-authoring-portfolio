/* jshint esversion: 6 */
// Only solar system planets & Pluto, NO Sun and NO Moon
const ageBodies = [
    { name: "Mercury", period: 0.24 },
    { name: "Venus", period: 0.62 },
    { name: "Earth", period: 1.00 },
    { name: "Mars", period: 1.88 },
    { name: "Jupiter", period: 11.86 },
    { name: "Saturn", period: 29.45 },
    { name: "Uranus", period: 84.00 },
    { name: "Neptune", period: 164.8 },
    { name: "Pluto", period: 248.0 }
];

function updateAllAges() {
    const inputVal = document.getElementById('userAgeInput').value;
    const age = parseFloat(inputVal) || 0;

    // Only update planet and Pluto ages (no Sun, no Moon)
    document.querySelectorAll('.planet-age').forEach(el => {
        const period = parseFloat(el.getAttribute('data-period'));
        el.innerText = (period && period !== 0) ? (age / period).toFixed(2) : '--';
    });
    // Update planet and Pluto revolutions
    document.querySelectorAll('.planet-revs').forEach(el => {
        const period = parseFloat(el.getAttribute('data-period'));
        el.innerText = (period && period !== 0) ? Math.floor(age / period) : '--';
    });
}

// On page load, initialize values
document.addEventListener('DOMContentLoaded', updateAllAges);