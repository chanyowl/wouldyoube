document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const celebration = document.getElementById('celebration');
    const container = document.querySelector('.container');

    // Make the No button unclickable by dodging the mouse
    noBtn.addEventListener('mouseover', () => {
        // Move the button to the document body to prevent the CSS transform on the
        // `.glassmorphism` card from hijacking the 'fixed' positioning origin.
        if (noBtn.parentNode !== document.body) {
            // Give it absolute position so it doesn't mess with the flex layout of the body
            noBtn.style.position = 'absolute';
            document.body.appendChild(noBtn);
            // Ensure it's above the card layer
            noBtn.style.zIndex = '1000';
            // Setup a smooth escape animation
            noBtn.style.transition = 'all 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)';
        }

        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // Use window innerWidth and innerHeight for more dodging space
        const padding = 20; // Ensure it stays away from the very edge of the screen
        const maxX = window.innerWidth - btnWidth - padding;
        const maxY = window.innerHeight - btnHeight - padding;

        // Generate random coordinates within the safe boundaries
        const newX = Math.max(padding, Math.floor(Math.random() * maxX));
        const newY = Math.max(padding, Math.floor(Math.random() * maxY));

        // Move the button
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    });

    // Handle Yes button click
    yesBtn.addEventListener('click', () => {
        // Create lots of hearts falling
        createConfetti();
        // Show celebration overlay
        celebration.classList.remove('hidden');
    });

    // Fun confetti generator when they click YES
    function createConfetti() {
        const colors = ['#ff4d6d', '#ff758c', '#ffb3c6', '#ffffff'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');

            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const size = Math.random() * 10 + 5;
            const animationDuration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;

            // Apply inline styles
            confetti.style.position = 'fixed';
            confetti.style.top = '-20px';
            confetti.style.left = `${left}vw`;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';

            // Animate using Web Animations API for smooth performant falling
            confetti.animate([
                { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
                { transform: `translate3d(${Math.random() * 100 - 50}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: animationDuration * 1000,
                delay: delay * 1000,
                easing: 'cubic-bezier(.37,0,.63,1)',
                iterations: 3,
                fill: 'forwards'
            });

            document.body.appendChild(confetti);

            // Cleanup after animation
            setTimeout(() => {
                confetti.remove();
            }, (animationDuration + delay) * 1000 * 3);
        }
    }
});
