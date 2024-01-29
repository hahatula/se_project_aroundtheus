// import { escape } from "core-js/fn/regexp";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "./index.css";
const modalWindowClassName = "modal";
const modalIsOpenedClassName = "modal_opened";
const closeModalWindowClassName = "modal__close-btn";
const profileEditPopup = document.querySelector(".modal_type_profile");
const addCardPopup = document.querySelector(".modal_type_add-card");
const openImagePopup = document.querySelector(".modal_type_show-image");
const editBtn = document.querySelector(".explorer__edit-button");
const addBtn = document.querySelector(".explorer__add-button");
const profileForm = document.forms["profile-form"];
const addCardForm = document.forms["card-form"];
const profileName = document.querySelector(".explorer__name");
const profileAbout = document.querySelector(".explorer__description");
const inputName = profileEditPopup.querySelector(".form__input_name");
const inputAbout = profileEditPopup.querySelector(".form__input_about");
const inputTitle = addCardPopup.querySelector(".form__input_title");
const inputImgLink = addCardPopup.querySelector(".form__input_image-link");
const modalWindows = Array.from(document.querySelectorAll(".modal"));
// const modalImage = openImagePopup.querySelector(".modal__image");
// const modalImageLable = openImagePopup.querySelector(".modal__image-lable");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardsList = document.querySelector(".cards__list");

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-message_active",
};

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
const profileFormValidator = new FormValidator(validationConfig, profileForm);
addCardFormValidator.enableValidation();
profileFormValidator.enableValidation();

//moved to classes____
function openPopup(popup) {
  popup.classList.add(modalIsOpenedClassName);
  document.addEventListener("keydown", closeByEscape);
}

// function closePopup(popup) {
//   popup.classList.remove(modalIsOpenedClassName);
//   document.removeEventListener("keydown", closeByEscape);
// }
//_____________________

function saveProfileChanges(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(profileEditPopup);
}

function saveNewCard(event) {
  event.preventDefault();
  const name = inputTitle.value;
  const link = inputImgLink.value;
  const item = { name, link };
  const card = createCard(item);
  renderCard(card);
  closePopup(addCardPopup);
  addCardFormValidator.disableButton();
  event.target.reset();
}

editBtn.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(profileEditPopup);
});

addBtn.addEventListener("click", () => {
  openPopup(addCardPopup);
});

//moved to classes____
function closeByEscape(e) {
  if (e.key === "Escape") {
    closePopup(e.currentTarget.querySelector(`.${modalIsOpenedClassName}`));
  }
}

modalWindows.forEach((modalWindow) => {
  modalWindow.addEventListener("click", (e) => {
    if (
      e.target.classList.contains(modalWindowClassName) ||
      e.target.classList.contains(closeModalWindowClassName)
    ) {
      // closePopup(modalWindow);
    }
  });
});
//____________________

//creating cards from the array
initialCards.forEach((item) => {
  const card = createCard(item);
  renderCard(card);
});

function createCard(item) {
  const card = new Card(item, ".card");
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(cardElement) {
  cardsList.prepend(cardElement);
}

profileForm.addEventListener("submit", saveProfileChanges);
addCardForm.addEventListener("submit", saveNewCard);
