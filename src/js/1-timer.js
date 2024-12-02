import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const daySpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

button.disabled = true;

let userSelectedDate = '';

iziToast.settings({
  timeout: 4000,
  position: 'topRight',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      button.disabled = false;
      userSelectedDate = selectedDates[0] - Date.now();
    } else {
      button.disabled = true;
      iziToast.error({ message: 'Please choose a date in the future' });
    }
  },
};

flatpickr(input, options);

const handleClick = () => {
  input.disabled = true;
  const timeInterval = setInterval(() => {
    if (userSelectedDate > 1000) {
      userSelectedDate -= 1000;
      const { days, hours, minutes, seconds } = convertMs(userSelectedDate);
      daySpan.textContent = `${days}`.padStart(2, '0');
      hoursSpan.textContent = `${hours}`.padStart(2, '0');
      minutesSpan.textContent = `${minutes}`.padStart(2, '0');
      secondsSpan.textContent = `${seconds}`.padStart(2, '0');
      button.disabled = true;
    }
    if (userSelectedDate <= 1000) {
      clearInterval(timeInterval);
      input.disabled = false;
    }
  }, 1000);
};

button.addEventListener('click', handleClick);

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