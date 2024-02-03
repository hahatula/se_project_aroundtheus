import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
const editBtn = document.querySelector(".explorer__edit-button");
const addBtn = document.querySelector(".explorer__add-button");
const profileForm = document.forms["profile-form"];
const addCardForm = document.forms["card-form"];
const profileName = document.querySelector(".explorer__name");
const profileAbout = document.querySelector(".explorer__description");
// const inputName = profileEditPopup.querySelector(".form__input_name");
// const inputAbout = profileEditPopup.querySelector(".form__input_about");
// const inputTitle = addCardPopup.querySelector(".form__input_title");
// const inputImgLink = addCardPopup.querySelector(".form__input_image-link");
// const modalWindows = Array.from(document.querySelectorAll(".modal"));

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

const userInfo = new UserInfo(".explorer__name", ".explorer__description");
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
const profileFormValidator = new FormValidator(validationConfig, profileForm);
addCardFormValidator.enableValidation();
profileFormValidator.enableValidation();

function saveProfileChanges({ newName, newAbout }) {
  console.log({ newName, newAbout });
  userInfo.setUserInfo({ newName, newAbout });
  // profileName.textContent = user.userName.value;
  // profileAbout.textContent = user.about.value;
};

const profileEditPopup = new PopupWithForm(
  ".modal_type_profile",
  "profile-form",
  saveProfileChanges
);

editBtn.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  const currentData = userInfo.getUserInfo();
  profileEditPopup.fillFields(currentData);
  profileEditPopup.open(); 
});

//creating new cards by filling out the form
const saveNewCard = (item) => {
  const card = createCard(item);
  renderCard(card);
  addCardFormValidator.disableButton();
};

const addCardPopup = new PopupWithForm(
  ".modal_type_add-card",
  "card-form",
  saveNewCard
);

addBtn.addEventListener("click", () => {
  addCardPopup.open();
});

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
