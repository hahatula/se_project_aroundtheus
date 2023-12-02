const modalWindow = document.querySelector(".modal");
const modalIsOpenedClassName = "modal_opened";
const profileEditWindow = document.querySelector(".modal_type_profile");
const addCardWindow = document.querySelector(".modal_type_add-card");
const showImageWindow = document.querySelector(".modal_type_show-image");
const editBtn = document.querySelector(".explorer__edit-button");
const addBtn = document.querySelector(".explorer__add-button");
const closeBtnProfileEditWindow = profileEditWindow.querySelector(".modal__close-btn");
const closeBtnAddCardWindow = addCardWindow.querySelector(".modal__close-btn");
const closeBtnShowImageWindow = showImageWindow.querySelector(".modal__close-btn");
const profileForm = profileEditWindow.querySelector(".form");
const addCardForm = addCardWindow.querySelector(".form");
let profileName = document.querySelector(".explorer__name");
let profileAbout = document.querySelector(".explorer__description");
let inputName = profileEditWindow.querySelector(".form__input_name");
let inputAbout = profileEditWindow.querySelector(".form__input_about");
let inputTitle = addCardWindow.querySelector(".form__input_title");
let inputImgLink = addCardWindow.querySelector(".form__input_image-link");
let newCard;

function controlModalWindows(modal) {
  modal.classList.toggle(modalIsOpenedClassName);
  if (modal.classList.contains(modalIsOpenedClassName)) {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
    inputTitle.value = "";
    inputImgLink.value = "";
  }
}

function saveChanges(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  if (profileEditWindow.classList.contains(modalIsOpenedClassName)) {
    profileEditWindow.classList.toggle(modalIsOpenedClassName);
  } else if (addCardWindow.classList.contains(modalIsOpenedClassName)) {
    newName = inputTitle.value;
    newLink = inputImgLink.value;
    createNewCard(newName, newLink);
    getCardElement(newCard); //this function is created in index.js
    addCardWindow.classList.toggle(modalIsOpenedClassName);
  }
}

function createNewCard (newName, newLink) {
  newCard =  {
    name: newName,
    link: newLink
  }
  return newCard;
}

editBtn.addEventListener("click", () => {
  controlModalWindows(profileEditWindow);
});
closeBtnProfileEditWindow.addEventListener("click", () => {
  controlModalWindows(profileEditWindow);
});
addBtn.addEventListener("click", () => {
  controlModalWindows(addCardWindow);
});
closeBtnAddCardWindow.addEventListener("click", () => {
  controlModalWindows(addCardWindow);
});
closeBtnShowImageWindow.addEventListener("click", () => {
  controlModalWindows(showImageWindow);
});
profileForm.addEventListener("submit", saveChanges);
addCardForm.addEventListener("submit", saveChanges);
