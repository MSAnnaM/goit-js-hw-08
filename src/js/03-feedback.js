import throttle from 'lodash.throttle';
const form = document.querySelector('form');
const KEY_LOCAL_STORAGE = 'feedback-form-state';
let formState = {};

const onLoad = () => {
  try {
    const savedTexte = localStorage.getItem(KEY_LOCAL_STORAGE);
    if (!savedTexte) return;
    formState = JSON.parse(savedTexte);
    Object.entries(formState).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message);
  }
};

const formTexte = event => {
  formState[event.target.name] = event.target.value.trim();
  localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(formState));
};

const completedForm = event => {
  console.log(formState);
  formState = {};
  event.currentTarget.reset();
  localStorage.removeItem(KEY_LOCAL_STORAGE);
};
form.addEventListener('input', throttle(formTexte, 500));
form.addEventListener('submit', completedForm);
window.addEventListener('load', onLoad);
