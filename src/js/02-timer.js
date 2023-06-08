import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
    const startBtn = document.querySelector('[data-start]');
    startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

const startBtn = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let intervalId;

function startTimer(endTime) {
  intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = endTime - currentTime;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      startBtn.disabled = false;
      Notiflix.Notify.success('Countdown finished');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
startBtn.addEventListener('click', () => {
  const selectedDate = flatpickr('#datetime-picker').selectedDates[0];
  if (!selectedDate || selectedDate < new Date()) {
    Notiflix.Notify.warning('Please choose a valid date in the future');
    return;
  }
  clearInterval(intervalId);
  startBtn.disabled = true;
  startTimer(selectedDate);
});
