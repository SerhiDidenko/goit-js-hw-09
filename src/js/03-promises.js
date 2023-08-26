import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const form = document.querySelector('.form');

let { elements: { delay, step, amount} } = form;

const createPromise = (position, delay) => {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    }
    else {
      reject({ position, delay });
    }
  });

  promise.then(({ position, delay }) => {
    Notiflix.Notify.success(
      `✅ Fulfilled promise ${position} in ${delay}ms`,
      { timeout: 3000, useIcon: false },
    );
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(
      `❌ Rejected promise ${position} in ${delay}ms`,
      { timeout: 3000, useIcon: false },
    );
  })
}

const generatePromises = (evt) => {
  evt.preventDefault();
  let delayValue = +delay.value;
  let stepValue = +step.value;
  let amountVlaue = +amount.value;
  
  for (let i = 0; i < amountVlaue; i++) {
    let timeout = delayValue + i * stepValue
    setTimeout(async () => createPromise(i + 1, timeout), timeout)
  }
}

form.addEventListener('submit', generatePromises)