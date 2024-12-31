const countdownElement = document.getElementById('countdown');
const imagesDiv = document.getElementById('images');
const showImagesButton = document.getElementById('showImages');
const progress = document.getElementById('progress');
const imagesCountdown = document.getElementById('imagesCountdown');
const imageContainer = document.getElementById('imageContainer');

let imagesShowIsRunning = false;

showImagesButton.addEventListener('click', () => {
    if (imagesShowIsRunning) {
        return;
    }
    imagesDiv.style.display = 'block';
    showImages();
});

let countdownInterval = setInterval(() => {
    const now = new Date();
    //const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const newYear = new Date(2025, 0, 1, 0, 0, 0);
    const diff = newYear - now;

    const totalTime = newYear - new Date(now.getFullYear(), 0, 1);
    const timeRemaining = diff;
    const progressPercentage = (timeRemaining / totalTime) * 100;
    progress.style.width = `${100 - progressPercentage}%`;

    if (diff <= 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = "Happy New Year!";

        activateImagesShow();

        startFireworks();

        setInterval(() => {
            startFireworks();
        }, 16000);
    } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        countdownElement.textContent = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    }
}, 1000);

function startFireworks() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
    }, 300);
}


function showImages() {
    imagesShowIsRunning = true;

    const imageTotalCount = 23;
    let currentImageIndex = 0;
    imagesDiv.innerHTML = '';

    let imagesCountdownValue = 3;
    imagesCountdown.style.display = "block";
    const beginInterval = setInterval(function () {
        imagesCountdown.textContent = `${imagesCountdownValue}`
        imagesCountdownValue--;
        if (imagesCountdownValue < 0) {
            imagesCountdown.style.display = "none";
            return clearInterval(beginInterval);
        }
    }, 700);

    const interval = setInterval(() => {
        const img = document.createElement('img');
        img.src = `images/${currentImageIndex}.webp`;
        img.alt = `Image ${currentImageIndex + 1}`;
        img.setAttribute('tabindex', '0');

        imagesDiv.innerHTML = '';
        imagesDiv.appendChild(img);

        img.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const previousImage = imagesDiv.querySelector('img.focused');
        if (previousImage && previousImage !== img) {
            previousImage.classList.remove('focused');
        }

        currentImageIndex++;
        if (currentImageIndex >= imageTotalCount) {
            clearInterval(interval);
            imagesShowIsRunning = false;
        }
    }, 3000);
}

//helper
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function activateImagesShow() {
    imageContainer.style.display = 'block';
}
