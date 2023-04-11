import {showBigPicture, renderComments} from './big-picture.js';
import {renderThumbnails } from './thumbnail.js';

const container = document.querySelector('.pictures');

let pictures = [];

const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-id]');
  if (!thumbnail) {
    return;
  }

  evt.preventDefault();
  const picture = pictures.find ((item) => item.id === Number(thumbnail.dataset.id));
  document.body.classList.add('modal-open');
  showBigPicture(picture);
  renderComments(picture.comments);

};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderThumbnails(pictures, container);
  container.addEventListener('click', onContainerClick);

};

export{renderGallery};
