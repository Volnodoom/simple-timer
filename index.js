const ONE_SEC_IN_MS = 1e+3;
const ONE_HOUR_IN_MS = 3.6e+6;
const ONE_MINUTE_IN_MS = 6e+4;
const SIXTY = 60;
const TEN = 10;

const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

let intervalId;

const calculateTime = (deadlineDateInMS) => {
  const timeDifferenceInMS = Date.parse(deadlineDateInMS.toString()) - Date.now();
  
  const hoursValue = Math.floor(timeDifferenceInMS / ONE_HOUR_IN_MS);
  const minutesValue = Math.floor((timeDifferenceInMS / ONE_MINUTE_IN_MS) % SIXTY);
  const secondsValue = Math.floor((timeDifferenceInMS / ONE_SEC_IN_MS) % SIXTY);

  if(Date.now() >= deadlineDateInMS) {
    clearInterval(intervalId);
    return;
  }

  let hours,
  minutes,
  seconds;

  if(hoursValue < TEN) {
    hours = `0${hoursValue}`;
  } else {
    hours = hoursValue;
  }

  if(minutesValue < TEN) {
    minutes = `0${minutesValue}`;
  } else {
    minutes = minutesValue;
  }

  if(secondsValue < TEN) {
    seconds = `0${secondsValue}`;
  } else {
    seconds = secondsValue;
  }

  timerEl.textContent = `${hours} : ${minutes} : ${seconds}`;
}

const handleInput = (evt) => {
  evt.preventDefault()
  const inputValue = evt.target.value;
  const stringWithoutSpace = inputValue.replace(/\s/g, '');
  const stringWithNumbers = stringWithoutSpace.replace(/\D/g, '');

  const hasString = /\D/.test(inputValue);

  if(hasString) {
    evt.target.value = stringWithNumbers;
  }
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
  const deadlineDateInMS = new Date(Date.now() + seconds * ONE_SEC_IN_MS + ONE_SEC_IN_MS);
    intervalId = setInterval(() => calculateTime(deadlineDateInMS), ONE_SEC_IN_MS);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', handleInput);

buttonEl.addEventListener('click', () => {
  clearInterval(intervalId);

  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
