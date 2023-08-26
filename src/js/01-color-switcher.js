
function getRandomHexColor() {
     return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
stopBtn.disabled = true;

let interval;

const colorSwitcher = () => {
    interval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

const stopSwitch = () => {
    clearInterval(interval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

startBtn.addEventListener('click', colorSwitcher);
stopBtn.addEventListener('click', stopSwitch);