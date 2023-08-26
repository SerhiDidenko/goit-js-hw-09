import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]')
const timerHours = document.querySelector('[data-hours]')
const timerMinutes = document.querySelector('[data-minutes]')
const timerSeconds = document.querySelector('[data-seconds]')

let timerInterval;
let selectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        validateDate(selectedDates[0]);
    },
};

startBtn.disabled = true;
flatpickr("#datetime-picker", options);

const validateDate = (pickedDate) => {
    let selected = new Date(pickedDate);
    let currentDate = new Date();
    if (selected.getTime() <= currentDate.getTime()) {
        startBtn.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future", { timeout: 5000 });
        return
    }
    startBtn.disabled = false;
    selectedDate = selected.getTime();
}

const addLeadingZero = (value) => value.toString().padStart(2, '0')

const convertMs = (ms) => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero( Math.floor(ms / day) );
    const hours = addLeadingZero( Math.floor((ms % day) / hour) );
    const minutes = addLeadingZero( Math.floor(((ms % day) % hour) / minute)) ;
    const seconds = addLeadingZero( Math.floor((((ms % day) % hour) % minute) / second) );

    return { days, hours, minutes, seconds };
};

const startTimer = () => {
    startBtn.disabled = true;
    timerInterval = setInterval(() => {
        let currentDate = new Date();
        if (selectedDate <= currentDate.getTime()) {
            clearInterval(timerInterval);
            return
        }
        let timeLeft = convertMs(selectedDate - currentDate.getTime());
        timerDays.textContent = timeLeft.days;
        timerHours.textContent = timeLeft.hours;
        timerMinutes.textContent = timeLeft.minutes;
        timerSeconds.textContent = timeLeft.seconds;
    }, 1000);
}

startBtn.addEventListener('click', startTimer)