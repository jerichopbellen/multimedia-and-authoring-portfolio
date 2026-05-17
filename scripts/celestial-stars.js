/* jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.getElementById("stars-canvas-container");
    if (!starsContainer) return;

    // Bumper star count for a richer, denser interstellar field
    const totalStarsCount = 250; 
    const fragments = document.createDocumentFragment();
    
    // Aesthetic distributions (Adding an extra blue & amber weight for vibrant variety)
    const colors = ["star-variant-white", "star-variant-blue", "star-variant-white", "star-variant-amber"];
    const rhythms = ["star-twinkle-fast", "star-twinkle-medium", "star-twinkle-slow"];

    for (let i = 0; i < totalStarsCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star-sparkle-node");

        // Coordinate positioning vector maps
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        star.style.left = `${xPos}%`;
        star.style.top = `${yPos}%`;

        // Shifted scale boundaries: Minimum size is now 1.2px up to a chunky 4.0px
        const diameterSize = (Math.random() * 2.8 + 1.2).toFixed(1);
        star.style.width = `${diameterSize}px`;
        star.style.height = `${diameterSize}px`;

        // Stagger visual starting point phases to prevent unison blinking cycles
        const delayOffset = (Math.random() * 6).toFixed(2);
        star.style.animationDelay = `${delayOffset}s`;

        // Style classification assignments
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomRhythm = rhythms[Math.floor(Math.random() * rhythms.length)];
        star.classList.add(randomColor, randomRhythm);

        fragments.appendChild(star);
    }

    // Single DOM attachment batch for structural speed and rendering efficiency
    starsContainer.appendChild(fragments);
});