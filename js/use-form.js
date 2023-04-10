import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';


const imageOverlay = document.querySelector('.img-upload__overlay');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const imageFileField = document.querySelector('.img-upload__input');
const imageUploadCancel = document.querySelector('.img-upload__cancel');

const pictureForm = document.querySelector('.img-upload__form');
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Ввели не правильное значение';
const MAX_HASHTAG_COUNT = 5;

const submitButton = document.querySelector('.img-upload__submit');
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

//добавляю вывод ошибок
const pristine = new Pristine(pictureForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--text',
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const showModal = () => {
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  pictureForm.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keydown', onDocumentKeydown);
};


//при фокусировке окно не закрывается
const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused() && !document.querySelector('.error')) {
    evt.preventDefault();
    hideModal();
  }
}

//закрытие модалки
const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};


//добавляю валидность формы
const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUnicTags = (tags) => {
  const LowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return LowerCaseTags.length === new Set(LowerCaseTags).size;
};

const validateTags = (value) => {
  const hashtags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasValidCount(hashtags) && hasUnicTags(hashtags) && hashtags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  TAG_ERROR_TEXT
);


//отправка на сервер
const setOnFormSubmit = (cb) => {
  pictureForm.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if(isValid) {
      blockSubmitButton();
      await cb(new FormData(pictureForm));
      unblockSubmitButton();
    }
  });
};

imageFileField.addEventListener('change', onFileInputChange);
imageUploadCancel.addEventListener('click', onCancelButtonClick);


export {showModal, hideModal, onFileInputChange, setOnFormSubmit};
