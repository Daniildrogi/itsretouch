// Review 1
// Общая рекомендация: почитать про форматирование кода и установить eslint

const header = document.querySelector(`.header`);
const section = document.querySelector(`.welcome-content`);
const height = header.offsetHeight;
const sectionHeight = section.offsetHeight;
// FIXME Зачем galleryItem? // fixed
const galleryImage = document.querySelectorAll(`.gallery-item--image`)
const gallery = document.querySelector(`.gallery`)
const modalGalleryWindow = document.getElementById(`modal`)
// FIXME Зачем bodySelect? // fixed
const newImage = document.createElement(`img`)
// FIXME Ты используешь переменную imgSrc только в modalVisible
// тебе она действительно нужна? Тем более в глобальной области видимости? // fixed
let lastScrollTop = 0;
let scrollDistance = window.scrollY;

document.addEventListener(`scroll`, () => {
    let scrollDistance = window.scrollY;
    if (scrollDistance >= height) {
      header.classList.add(`header-invisible`);
      header.classList.remove(`header-fixed`);
    }

    // FIXME Дублируется код в теле двух условий
    // почему бы не if (scrollDistance <= lastScrollTop || scrollDistance === 0) ? // fixed
    if (scrollDistance <= lastScrollTop || scrollDistance === 0) {
      header.classList.remove(`header-invisible`);
      header.classList.add(`header-fixed`);
    }
    lastScrollTop = scrollDistance;
  });


function disableScroll() {
  // Get the current page scroll position
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
  window.onscroll = function () { };
}

gallery.addEventListener(`click`, function (e) {
//  let img = e.target.closest(`galleryImage`)
 modalVisible(e.target.src)
 console.log(`fdsf`)
})


// galleryImage.forEach((img) => {
//   img.addEventListener("click", (e) => {
//     modalVisible(e.target.src);
//   });
// });

let modalVisible = (e) => {
  modalGalleryWindow.classList.add(`modal-about--visible`);
  newImage.setAttribute(`src`, e)
  disableScroll();
  header.classList.add(`header-hidden`)
  modalGalleryWindow.appendChild(newImage)
}


modalGalleryWindow.addEventListener(`click`, () => {
  modalGalleryWindow.classList.remove(`modal-about--visible`)
  modalGalleryWindow.removeChild(newImage)
  enableScroll()
  header.classList.remove(`header-hidden`)
  header.classList.add(`header-invisible`)
})

document.querySelector('.gallery').addEventListener('click', (e) => {
  console.log('e.t.v', e.target);
})












// Надо выбрать все дивы и дать им дата-таргет или узнать как это еще можно сделать,
// а модальным окнам задать data-path
// Затем, повесить eventListener на forEach див с функцией
// if data-target = data=path (видимо?) , то тогда мы добавляем класс на модлку
// который делает опасити 1 с неким транзишеном
// Затем добавляем еще одну функцию, которая будет убирать класс при клике на
// любоме место на экране. Записать if e.target == любая точка кроме модалки, то убираем класс.

// src = this.src











// Задачи
// 1.  Сделать header по скроллу вниз пропадающим,
//  а по скроллу вверх появляющимся
// 2.  Какую нибудь анимацию с верхними изображениями
// 3.  При нажатии на изображение появлялось увеличинное модальное
//     окно, при клике вне его - они бы исчезало
