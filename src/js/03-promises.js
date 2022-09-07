import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitClick);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function onSubmitClick(event) {
  event.preventDefault();

  let delay = Number(event.target.delay.value);
  let step = Number(event.target.step.value);
  let amount = Number(event.target.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay = delay + step;
  }

  event.target.delay.value = '';
  event.target.step.value = '';
  event.target.amount.value = '';
}
