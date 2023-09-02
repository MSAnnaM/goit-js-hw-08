import throttle from 'lodash.throttle';
const form = document.querySelector('form');
const keyLocalStorage = 'feedback-form-state';

const savedTexte = localStorage.getItem('feedback-form-state');
let savedObject = JSON.parse(savedTexte) || {};
const { email, message } = form.elements;
reloadTexte();

function reloadTexte() {
  if (savedObject) {
    email.value = savedObject.email || '';
    message.value = savedObject.message || '';
  }
}

const formTexte = event => {
  event.preventDefault();
  const { email, message } = event.currentTarget;
  const savedTexte = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem(keyLocalStorage, JSON.stringify(savedTexte));
};
const completedForm = event => {
  event.preventDefault();
  const { email, message } = event.currentTarget;
  if (email.value.trim() === '' || message.value.trim() === '') {
    return alert('Please fill in all the fields!');
  }
  const user = {
    email: email.value,
    message: message.value,
  };
  console.log(user);
  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
};
form.addEventListener('input', throttle(formTexte, 500));
form.addEventListener('submit', completedForm);
