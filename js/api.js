const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Rout = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузитьстраницу, попробуйте еще раз',
  SEND_DATA: 'Не удалось отправить форму, попробуйте еще раз',
};

const dataLoad = (rout, ErrorText, Method = Method.GET, body = null) => {
  fetch(`${BASE_URL}&${rout}`, {method, body})
    .then((response) => {
      if(!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error();
    });

const getData = () => load(Rout.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) =>
    load(Rout.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {getData, sendData};
