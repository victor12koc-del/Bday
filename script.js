document.addEventListener('DOMContentLoaded', () => {
    const scenes = document.querySelectorAll('.scene');
    const startBtn = document.getElementById('start-btn');
    const decorateBtn = document.getElementById('decorate-btn');
    const flame = document.getElementById('flame');
    const decorations = document.getElementById('decorations');
    const nextToBalloons = document.getElementById('next-to-balloons');
    const balloons = document.querySelectorAll('.balloon');
    const popText = document.getElementById('pop-text');
    const nextToMessage = document.getElementById('next-to-message');
    const msgIcon = document.getElementById('msg-icon');
    const envelope = document.getElementById('envelope');
    const finalWish = document.getElementById('final-wish');

    let currentScene = 0;
    let balloonsPopped = 0;

    function nextScene() {
        scenes[currentScene].classList.remove('active');
        currentScene++;
        if (currentScene < scenes.length) {
            scenes[currentScene].classList.add('active');
        }
    }

    // Scene 1 -> 2
    startBtn.addEventListener('click', () => {
        nextScene();
    });

    // Scene 2: Decorate & Light Candle
    decorateBtn.addEventListener('click', () => {
        flame.classList.remove('hidden');
        decorations.classList.remove('hidden');
        decorateBtn.classList.add('hidden');
        nextToBalloons.classList.remove('hidden');

        // Add some confetti effect
        createConfetti();
    });

    // Scene 2 -> 3
    nextToBalloons.addEventListener('click', () => {
        nextScene();
    });

    // Scene 3: Balloon Popping
    balloons.forEach(balloon => {
        balloon.addEventListener('click', (e) => {
            if (balloon.classList.contains('popped')) return;

            balloon.classList.add('popped');
            balloon.style.visibility = 'hidden';

            const text = balloon.getAttribute('data-text');
            popText.textContent = text;
            popText.className = 'pop-message fade-in';

            balloonsPopped++;
            if (balloonsPopped === 4) {
                setTimeout(() => {
                    nextToMessage.classList.remove('hidden');
                }, 1000);
            }
        });
    });

    // Scene 3 -> 4
    nextToMessage.addEventListener('click', () => {
        nextScene();
    });

    // Scene 4: Open Message
    msgIcon.addEventListener('click', () => {
        msgIcon.classList.add('hidden');
        envelope.classList.remove('hidden');
        setTimeout(() => {
            envelope.classList.add('open');
            setTimeout(() => {
                finalWish.classList.remove('hidden');
                finalWish.classList.add('fade-in');
            }, 1000);
        }, 100);
    });

    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }
});

// Add styles for confetti dynamically
const style = document.createElement('style');
style.textContent = `
    .confetti-piece {
        position: fixed;
        width: 10px;
        height: 10px;
        top: -10px;
        z-index: 1000;
        animation: fall 3s linear forwards;
    }
    @keyframes fall {
        to { transform: translateY(100vh) rotate(360deg); }
    }
`;
document.head.appendChild(style);
