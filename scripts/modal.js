const modalWindow = document.querySelector(".modal");
const editBtn = document.querySelector(".explorer__edit-button");
const closeBtn = document.querySelector(".modal__close-btn");
const form = modalWindow.querySelector(".form");
let profileName = document.querySelector(".explorer__name");
let profileAbout = document.querySelector(".explorer__description");
let inputName = modalWindow.querySelector(".form__input_name");
let inputAbout = modalWindow.querySelector(".form__input_about");

function controlModalWindow() {
  modalWindow.classList.toggle("modal_opened");
  if (modalWindow.classList.contains("modal_opened")) {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  }
}

function saveChanges(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  controlModalWindow();
}

editBtn.addEventListener("click", controlModalWindow);
closeBtn.addEventListener("click", controlModalWindow);
form.addEventListener("submit", saveChanges);
form.addEventListener("submit", saveChanges);
