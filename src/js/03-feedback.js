import throttle from 'lodash.throttle';

const feedFormEl = document.querySelector('.feedback-form');
const textAreaEl = document.querySelector('.feedback-form textarea');
const inputEL = document.querySelector('.feedback-form input');
const DATA_KEY = 'feedback-form-state';

feedFormEl.addEventListener('submit', formSubmit);

const data = JSON.parse(localStorage.getItem(DATA_KEY));
if (data) {
  textAreaEl.value = data.message;
  inputEL.value = data.email;
}

function formSubmit(evt) {
  evt.preventDefault();
  const userData = {};
  for (let index = 0; index < evt.target.elements.length; index++) {
    const elem = evt.target.elements[index];
    if (elem.nodeName === 'INPUT' || elem.nodeName === 'TEXTAREA') {
      userData[elem.name] = elem.value;
    }
  }

  console.log(userData);
  // console.log(JSON.parse(localStorage.getItem(DATA_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(DATA_KEY);
}

const formData = {};
feedFormEl.addEventListener(
  'input',
  throttle(e => {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(DATA_KEY, JSON.stringify(formData));
  }, 1000)
);
