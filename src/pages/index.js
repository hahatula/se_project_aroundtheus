import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationConfig, popups } from "../utils/constants.js";
import "./index.css";

const editBtn = document.querySelector(".explorer__edit-button");
const addBtn = document.querySelector(".explorer__add-button");
const profileForm = document.forms["profile-form"];
const addCardForm = document.forms["card-form"];

const userInfo = new UserInfo(".explorer__name", ".explorer__description");
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
const profileFormValidator = new FormValidator(validationConfig, profileForm);
addCardFormValidator.enableValidation();
profileFormValidator.enableValidation();

//creating cards from the array
const popupWithImage = new PopupWithImage(".modal_type_show-image");

const handleImageClick = (card) => {
  popupWithImage.open(card.link, card.name);
}
popupWithImage.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".card", handleImageClick);
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  ".cards__list"
);
cardSection.renderItems();

//creating new cards by filling out the form
const saveNewCard = (newCard) => {
  cardSection.addItem(newCard);
  addCardPopup.resetForm();
  addCardPopup.close();
  addCardFormValidator.disableButton();
};

const addCardPopup = new PopupWithForm(
  ".modal_type_add-card",
  "card-form",
  saveNewCard
);
addCardPopup.setEventListeners();
addBtn.addEventListener("click", () => {
  addCardPopup.open();
});

//cahnging profile details
function saveProfileChanges(newUserData) {
  userInfo.setUserInfo(newUserData);
  profileEditPopup.close();
}

const profileEditPopup = new PopupWithForm(
  ".modal_type_profile",
  "profile-form",
  saveProfileChanges
);
profileEditPopup.setEventListeners();
editBtn.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  const currentData = userInfo.getUserInfo();
  profileEditPopup.setInputValues(currentData);
  profileEditPopup.open();
});
