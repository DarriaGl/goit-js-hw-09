function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;
function startSwitcher() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopSwitcher() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(intervalId);
}
startBtn.addEventListener('click', startSwitcher);
stopBtn.addEventListener('click', stopSwitcher);
