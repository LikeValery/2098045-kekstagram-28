const DESCRIPTIONS = [
  'Лето оно такое',
  'Лучший вид',
  'Полетели',
  'Живучее солнце',
  'НЕодилвнный поворот',
  'Забываем',
  'Не спать',
  'В такт с жуками',
  'Улыбнись',
  'Спасибоб но нет',
  'Игры в жизнь',
  'Устроили шок контент',
  'Вот поворот',
  'Головокружительно',
  'ура',
  'не тут то было',
  'Лова лова',
  'Только слова',
  'Забытое',
  'Пленка подъехала',
  'Случайно',
  'Упала шляпа',
  'Супер шанс на барабане',
  'Голубая луна',
  'У меня все',
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = ['Галелей', 'Юлий', 'Федор', 'Исаак', 'Аристотель', 'Платон'];
const AVATAR_COUNT = 6;


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generatePictureNumber = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 25);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

const createNewPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePictureNumber()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(1, 10)}, createComment),
});
createNewPhoto();
