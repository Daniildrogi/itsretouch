// TODO -  Светлую и темную тему - DONE
// TODO - Слайдер в модальном окне на всю галлерею.

import {
    disableBodyScroll,
    enableBodyScroll,
    // eslint-disable-next-line import/extensions
} from "./node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js"

const header = document.querySelector(".header")
const height = header.offsetHeight
const gallery = document.querySelector(".gallery")
const modalGalleryWindow = document.getElementById("modal")
const newImage = document.createElement("img")
const icon = document.querySelector(".icon")
const menu = document.querySelector(".menu")
// const next = document.querySelector(".next") // * Стрелки кнопки для галереи
// const previous = document.querySelector(".previous") // * Стрелки кнопки для галереи
const allImages = document.querySelectorAll(".gallery-item img")
// const arrayImages = [...allImages]
const darkThemeButton = document.querySelector(".dark-theme")
const body = document.querySelector("body")
let lastScrollTop = 0

// *  Всплывающий Header

const headerEvent = () => {
    const scrollDistance = window.scrollY
    if (scrollDistance >= height) {
        header.classList.add("header-invisible")
        header.classList.remove("header-fixed")
    }
    if (scrollDistance <= lastScrollTop || scrollDistance === 0) {
        header.classList.remove("header-invisible")
        header.classList.add("header-fixed")
    }
    lastScrollTop = scrollDistance
}
//  * Добавляем headerEvent на скролл

document.addEventListener("scroll", () => {
    headerEvent()
})

// * Выезжающее меню max-width:768px

icon.addEventListener(`click`, () => {
    menu.classList.toggle(`nav-responsive`)
})

// * Popup Окно

const modalVisible = (e) => {
    modalGalleryWindow.classList.add("modal-about--visible")
    newImage.setAttribute("src", e)
    disableBodyScroll(modalGalleryWindow)
    header.classList.add("header-invisible")
    modalGalleryWindow.appendChild(newImage)
}

gallery.addEventListener("click", (e) => {
    if (!e.target.closest("img")) return
    modalVisible(e.target.src)
})

modalGalleryWindow.addEventListener("click", (e) => {
    if (e.target.closest("img")) return
    modalGalleryWindow.classList.remove("modal-about--visible")
    modalGalleryWindow.removeChild(newImage)
    enableBodyScroll(modalGalleryWindow)
})

// * Переключение темы

const darkTheme = () => {
    if (
        darkThemeButton.classList.contains("fa-toggle-off") &&
        body.classList.contains("light")
    ) {
        darkThemeButton.classList.remove("fa-toggle-off")
        darkThemeButton.classList.add("fa-toggle-on")
        body.classList.remove("light")
        body.classList.add("dark")
    } else {
        darkThemeButton.classList.add("fa-toggle-off")
        darkThemeButton.classList.remove("fa-toggle-on")
        body.classList.add("light")
        body.classList.remove("dark")
    }
}

darkThemeButton.addEventListener("click", () => {
    darkTheme()
})

// ? Осталось понять, как сделать так, чтобы header не появлялся после закрытия модального окна
