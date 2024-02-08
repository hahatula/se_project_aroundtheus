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


//creating popups
// popups.forEach((popup) => {
//   console.log(popup);
//   if (popup.type === "withImage") {
//     const popupWithImage = new PopupWithImage(popup.selector);
//     return popupWithImage;
//   } else if (popup.type === "withForm") {
//     const popupWithForm = new PopupWithForm (popup.selector, popup.form, popup.handler);
//     instances[popup.instanceName] = popupWithForm;
//     console.log(instances[popup.instanceName]);
//   }
//   const instanceName = new popups.type(popups.selecctor, popups.form, popups.handler);
// });

//creating cards from the array
const popupWithImage = new PopupWithImage(".modal_type_show-image");
popupWithImage.setEventListeners();
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".card", popupWithImage);
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  ".cards__list"
);
cardSection.renderItems();

//creating new cards by filling out the form
const saveNewCard = () => {
  const name = addCardPopup._form.querySelector(".form__input_title").value;
  const link = addCardPopup._form.querySelector(
    ".form__input_image-link"
  ).value;
  const newCard = { name, link };
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
function saveProfileChanges() {
  const newName =
    profileEditPopup._form.querySelector(".form__input_name").value;
  const newAbout =
    profileEditPopup._form.querySelector(".form__input_about").value;
  const newUserData = { newName, newAbout };
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
