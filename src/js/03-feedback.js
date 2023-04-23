import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

const formDataObj = {};

loadTextarea();
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

function onFormSubmit(e) {
  e.preventDefault();

  console.log({ email: refs.input.value, message: refs.textarea.value });

  e.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    const parsedSavedMessage = JSON.parse(savedMessage);

    formDataObj.email = parsedSavedMessage.email;
    formDataObj.message = parsedSavedMessage.message;
  }

  formDataObj[e.target.name] = e.target.value;

  const stringedFormDataObj = JSON.stringify(formDataObj);

  localStorage.setItem(STORAGE_KEY, stringedFormDataObj);
}

function loadTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    const parsedSavedMessage = JSON.parse(savedMessage);

    refs.input.value = parsedSavedMessage.email;
    refs.textarea.value = parsedSavedMessage.message;
  }
}
