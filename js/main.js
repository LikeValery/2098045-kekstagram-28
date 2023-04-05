import {createThumbnais} from './thumbnail.js';
import { renderGallery } from './gallery.js';
import {createNewPhotos} from './data.js';
// import './use-form.js';
import { getData, sendData } from './api.js';
import { showAlert } from './alert.js';
import { setOnFormSubmit, hideModal } from './use-form.js';
import { showSuccsessMessage, showErrorMessage } from './message.js';
import { init, getFilteredPictures } from './filter.js';


// createThumbnai();
// renderGallery();

//кол-во (массив) фотографий
const thumbnailElements = createNewPhotos(25);
createThumbnais(thumbnailElements);

renderGallery(thumbnailElements);


setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccsessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  init(data, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
} catch (err) {
  showAlert(err.message);
}
