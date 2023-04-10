const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessage = successTemplate.cloneNode(true);
const errorMessage = errorTemplate.cloneNode(true);

const successInner = successMessage.querySelector('.success__inner');
const errorInner = errorMessage.querySelector('.error__inner');


successMessage.addEventListener('click', () => {
  successMessage.remove();
});

errorMessage.addEventListener('click', () => {
  errorMessage.remove();
});

successInner.addEventListener('click', (evt) => {
  evt.stopPropagation();
});

errorInner.addEventListener('click', (evt) => {
  evt.stopPropagation();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    successMessage.remove();
    errorMessage.remove();
  }
});

//клонирую шаблон
const showSuccsessMessage = () => {
  document.body.append(successMessage);
};


//закрытие всплывающего сообщения при клике и  нажатии кнопки esc

const successButton = successMessage.querySelector('.success__button');
successButton.addEventListener('click', () => {
  successMessage.classList.add('hidden');
});


//сообщение об ошибке в отправлении
const showErrorMessage = () => {
  document.body.append(errorMessage);
};


const errorButton = errorMessage.querySelector('.error__button');
errorButton.addEventListener('click', () => {
  errorMessage.classList.add('hidden');
});


export {showSuccsessMessage, showErrorMessage};
