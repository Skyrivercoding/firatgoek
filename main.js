// Initial call to display the countdown immediately
updateCountdown();

// Update the countdown every second
setInterval(updateCountdown, 1000);



function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function onclickFireworkbtn() {
  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
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
  }, 250);

  // Reset button style after click
  setTimeout(function() {
    document.querySelector("button[name='btn-firework']").style.transform = 'scale(1)';
  }, 300); // 300ms or same duration as CSS transition
}

// Countdown logic
function updateCountdown() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const nextSilvester = new Date(`December 31, ${currentYear} 23:59:59`);
  
  const totalSeconds = (nextSilvester - now) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = hours;
  document.getElementById('minutes').innerText = minutes;
  document.getElementById('seconds').innerText = seconds;
}




