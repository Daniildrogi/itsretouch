// eslint-disable-next-line import/extensions
import { disableBodyScroll, enableBodyScroll } from './node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js';

const header = document.querySelector('.header');
const height = header.offsetHeight;
const gallery = document.querySelector('.gallery');
const modalGalleryWindow = document.getElementById('modal');
const newImage = document.createElement('img');
let lastScrollTop = 0;

// Всплывающий Header

function headerEvent() {
  const scrollDistance = window.scrollY;
  if (scrollDistance >= height) {
    header.classList.add('header-invisible');
    header.classList.remove('header-fixed');
  }
  if (scrollDistance <= lastScrollTop || scrollDistance === 0) {
    header.classList.remove('header-invisible');
    header.classList.add('header-fixed');
  }
  lastScrollTop = scrollDistance;
}
// Добавляем headerEvent на скролл

document.addEventListener('scroll', () => {
  headerEvent();
});

const modalVisible = (e) => {
  modalGalleryWindow.classList.add('modal-about--visible');
  newImage.setAttribute('src', e);
  disableBodyScroll(modalGalleryWindow);
  header.classList.add('header-invisible');
  modalGalleryWindow.appendChild(newImage);
};

gallery.addEventListener('click', (e) => {
  if (!e.target.closest('img')) return;
  modalVisible(e.target.src);
});

modalGalleryWindow.addEventListener('click', (e) => {
  if (e.target.closest('img')) return;
  modalGalleryWindow.classList.remove('modal-about--visible');
  modalGalleryWindow.removeChild(newImage);
  enableBodyScroll(modalGalleryWindow);
});

// Осталось понять, как сделать так, чтобы header не появлялся после закрытия модального окна ?
