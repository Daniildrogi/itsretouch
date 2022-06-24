// TODO -  Светлую и темную тему - DONE
// TODO - Слайдер в модальном окне на всю галлерею. - DONE

import {
    disableBodyScroll,
    enableBodyScroll,
    // eslint-disable-next-line import/extensions
} from "./node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js"

const header = document.querySelector(".header")
const height = header.offsetHeight
const gallery = document.querySelector(".gallery")
const modalGalleryWindow = document.getElementById("modal")
const newImageWrapper = document.createElement("div")
const newImage = document.createElement("img")
const icon = document.querySelector(".icon")
const menu = document.querySelector(".menu")
const allImages = document.querySelectorAll(".gallery-item img")
const arrayImages = [...allImages]
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

// * Выезжающее меню max-width:900px

icon.addEventListener(`click`, () => {
    menu.classList.toggle(`nav-responsive`)
})

// * * Слайдер модальной галереи

let findNextImage = function (element) {
    if (element.src == newImage.src) return element
}

const nextSlide = () => {
    let nextImage = arrayImages.findIndex(findNextImage)
    nextImage++
    if (nextImage == arrayImages.length) nextImage = 0
    newImage.setAttribute("src", arrayImages[nextImage].src)
}

const prevSlide = () => {
    let prevImage = arrayImages.findIndex(findNextImage)
    prevImage--
    if (prevImage == -1) prevImage = arrayImages.length - 1
    newImage.setAttribute("src", arrayImages[prevImage].src)
}

document.addEventListener("keyup", (e) => {
    if (e.key == "ArrowRight") nextSlide()
})

document.addEventListener("keyup", (e) => {
    if (e.key == "ArrowLeft") prevSlide()
})

// * Popup Окно

const modalVisible = (e) => {
    modalGalleryWindow.classList.add("modal-about--visible")
    newImage.setAttribute("src", e)
    disableBodyScroll(modalGalleryWindow)
    header.classList.add("header-invisible")
    modalGalleryWindow.appendChild(newImageWrapper)
    newImageWrapper.classList.add("modal-image--wrapper")
    newImageWrapper.appendChild(newImage)
    newImage.classList.add("modalImg")
}

newImage.addEventListener("click", (b) => {
    if (b.offsetX < b.target.width / 2) prevSlide()
    if (b.offsetX > b.target.width / 2) nextSlide()
    console.log(b.offsetX)
    console.log(b.target.width / 2)
    console.log(arrayImages)
})

gallery.addEventListener("click", (e) => {
    if (!e.target.closest("img")) return
    modalVisible(e.target.src)
})

const closeModal = (e) => {
    if (e.target.closest("img")) return
    if (e.target.closest("a")) return
    modalGalleryWindow.classList.remove("modal-about--visible")
    modalGalleryWindow.removeChild(newImageWrapper)
    enableBodyScroll(modalGalleryWindow)
}

modalGalleryWindow.addEventListener("click", (e) => closeModal(e))
document.addEventListener("keyup", (e) => {
    if (
        e.key == "Escape" &&
        modalGalleryWindow.classList.contains("modal-about--visible")
    )
        closeModal(e)
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
