let modalWindow = document.querySelector(".modal");
let editBtn = document.querySelector(".explorer__edit-button");
let closeBtn = document.querySelector(".modal__close-btn");

function controlModalWindow() {
  modalWindow.classList.toggle("modal--closed");
}

editBtn.addEventListener("click", controlModalWindow);
closeBtn.addEventListener("click", controlModalWindow);
