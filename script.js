document.addEventListener('DOMContentLoaded', () => {
    const curtain = document.getElementById('curtain');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.slide');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const successOverlay = document.getElementById('success');
    const heartsBg = document.getElementById('hearts-bg');

    let currentSlide = 0;

    // Open Curtains
    curtain.addEventListener('click', () => {
        curtain.classList.add('open');
        setTimeout(() => {
            curtain.style.display = 'none';
        }, 1500);
        createHearts();
    });

    // Create Floating Hearts
    function createHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
            heartsBg.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, 300);
    }

    // Slideshow Logic
    nextBtn.addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide++;

        if (currentSlide < slides.length) {
            slides[currentSlide].classList.add('active');
            
            // Hide next button on the last slide (proposal slide)
            if (currentSlide === slides.length - 1) {
                nextBtn.style.display = 'none';
            }
        }
    });

    // Yes Button Logic
    yesBtn.addEventListener('click', () => {
        successOverlay.style.display = 'flex';
        createConfetti();
    });

    // No Button Logic (Moves away or grows the yes button)
    noBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
        
        // Make the yes button bigger
        const currentScale = parseFloat(yesBtn.style.transform.replace('scale(', '').replace(')', '')) || 1;
        yesBtn.style.transform = `scale(${currentScale + 0.2})`;
    });

    function createConfetti() {
        // Simple confetti effect
        for (let i = 0; i < 100; i++) {
            const conf = document.createElement('div');
            conf.style.position = 'absolute';
            conf.style.width = '10px';
            conf.style.height = '10px';
            conf.style.backgroundColor = ['#fcc201', '#d62828', '#ff85a1', '#ffffff'][Math.floor(Math.random() * 4)];
            conf.style.left = Math.random() * 100 + 'vw';
            conf.style.top = -10 + 'px';
            conf.style.borderRadius = '2px';
            conf.style.zIndex = '3000';
            document.body.appendChild(conf);

            const animation = conf.animate([
                { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate3d(${(Math.random() - 0.5) * 500}px, 100vh, 0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });

            animation.onfinish = () => conf.remove();
        }
    }
});
