
const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCansel = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureDescription = document.querySelector('.social__caption');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureComments = document.querySelector('.comments-count');
const commentContainer = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');
const COMMENTS_GROUP = 5;
let commentsLoader = 0;
const commentsLoaderButton = document.querySelector('.social__comments-loader ');
const commentsCount = document.querySelector('.social__comment-count');


bigPictureCansel.addEventListener('click', () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader = 0;

});

//закрытие большой картинки при нажатии кнопки esc
document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsLoader = 0;
  }
});

function showBigPicture ({url, description, comments, likes}) {
  bigPictureContainer.classList.remove('hidden');
  bigPictureImg.src = url;
  bigPictureDescription.textContent = description;
  bigPictureLikes.textContent = likes;
  bigPictureComments.textContent = comments.length;
}

let currentComments;

//Комментарии к большой картинке
function createComments (information) {
  const commentsContainerFragment = document.createDocumentFragment();

  commentContainer.innerHTML = '';

  information.forEach (({avatar, description, message}) => {
    const newComment = commentItem.cloneNode(true);

    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = description;
    newComment.querySelector('.social__text').textContent = message;

    commentsContainerFragment.append(newComment);
  });

  commentContainer.append(commentsContainerFragment);
}

const loader = () => {
  createComments(currentComments.slice(0, commentsLoader + COMMENTS_GROUP));
  commentsLoader += COMMENTS_GROUP;
  if (commentsLoader >= currentComments.length) {
    commentsLoader = currentComments.length;
    commentsLoaderButton.classList.add('hidden');
  }
  commentsCount.innerHTML = `${commentsLoader} из <span class="comments-count">${currentComments.length} комментариев</span>`;
};

//выгружаю нужное кол-во комментариев
const renderComments = (comments) => {
  currentComments = comments;
  if (comments.length <= COMMENTS_GROUP) {
    createComments(comments);
    commentsLoader = comments.length;
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
    createComments(comments.slice(0, COMMENTS_GROUP));
    commentsLoader += COMMENTS_GROUP;
  }

  commentsLoaderButton.addEventListener ('click', loader);
  commentsCount.innerHTML = `${commentsLoader} из <span class="comments-count">${currentComments.length} комментариев</span>`;

};


export {showBigPicture, createComments, renderComments};

