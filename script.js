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
const arrayImages = Array.from(document.querySelectorAll(".gallery-item img"))
const darkThemeButton = document.querySelector(".dark-theme")
const body = document.querySelector("body")
let lastScrollTop = 0

// *  Всплывающий Header ////////////////////////////////////////////////////

const headerEvent = () => {
    const scrollDistance = window.scrollY
    if (scrollDistance >= height) {
        header.classList.add("header-invisible")
        header.classList.remove("header-fixed")
    }
    if (scrollDistance <= lastScrollTop && scrollDistance <= height * 2) {
        header.classList.remove("header-invisible")
        header.classList.add("header-fixed")
    }
    lastScrollTop = scrollDistance
}
//  * Добавляем headerEvent на скролл ////////////////////////////////////////////////////

document.addEventListener("scroll", () => {
    headerEvent()
})

// * Выезжающее меню max-width:900px ////////////////////////////////////////////////////

icon.addEventListener(`click`, () => {
    menu.classList.toggle(`nav-responsive`)
})

// * Popup Окно ////////////////////////////////////////////////////

const setModalVisible = (e) => {
    modalGalleryWindow.classList.add("modal-about--visible")
    newImage.setAttribute("src", e)
    disableBodyScroll(modalGalleryWindow)
    header.classList.add("header-invisible")
    modalGalleryWindow.appendChild(newImageWrapper)
    newImageWrapper.classList.add("modal-image--wrapper")
    newImageWrapper.appendChild(newImage)
    newImage.classList.add("modalImg")
}

gallery.addEventListener("click", (e) => {
    if (!e.target.closest("img")) return
    setModalVisible(e.target.src)
})

const galleryHover = (e) => {
    if (e.offsetX > e.target.width / 2) {
        newImageWrapper.classList.add("hover-right")
        newImageWrapper.classList.remove("hover-left")
    }
    if (e.offsetX < e.target.width / 2) {
        newImageWrapper.classList.add("hover-left")
        newImageWrapper.classList.remove("hover-right")
    }
}
newImage.addEventListener("mousemove", (e) => {
    galleryHover(e)
})

const closeModal = (e) => {
    if (e.target.closest("img")) return
    if (e.target.closest(".hover-right") || e.target.closest(".hover-left"))
        return

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

// * * Слайдер модальной галереи ////////////////////////////////////////////////////

let findNextImage = function (element) {
    if (element.src == newImage.src) return element
}

const showNextSlide = () => {
    let nextImage = arrayImages.findIndex(findNextImage)
    nextImage++
    if (nextImage == arrayImages.length) nextImage = 0
    newImage.setAttribute("src", arrayImages[nextImage].src)
}

const showPrevSlide = () => {
    let prevImage = arrayImages.findIndex(findNextImage)
    prevImage--
    if (prevImage == -1) prevImage = arrayImages.length - 1
    newImage.setAttribute("src", arrayImages[prevImage].src)
}

newImageWrapper.addEventListener("click", (b) => {
    if (b.offsetX < b.target.width / 2 || b.target.closest(".hover-left"))
        showPrevSlide()
    if (b.offsetX > b.target.width / 2 || b.target.closest(".hover-right"))
        showNextSlide()
})

document.addEventListener("keyup", (e) => {
    if (e.key == "ArrowRight") showNextSlide()
    if (e.key == "ArrowLeft") showPrevSlide()
})

// * Переключение темы ////////////////////////////////////////////////////

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
