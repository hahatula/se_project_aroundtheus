import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationConfig } from "../utils/constants.js";
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
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".card");
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  ".cards__list"
);
cardSection.renderItems();

// function renderCard(item) {
//   const card = new Card(item, ".card");
//   const cardElement = card.generateCard();
//   return cardElement;
// }

//creating new cards by filling out the form
const saveNewCard = () => {
  console.log(addCardPopup);
  const name = addCardPopup._form.querySelector(".form__input_title").value;
  const link = addCardPopup._form.querySelector(
    ".form__input_image-link"
  ).value;
  const newCard = { name, link };
  cardSection.addItem(newCard);
  addCardPopup._form.reset();
  addCardPopup.close();
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

//cahnging profile details
function saveProfileChanges() {
  const newName = profileEditPopup._userName.value;
  const newAbout = profileEditPopup._about.value;
  const newUserData = { newName, newAbout };
  userInfo.setUserInfo(newUserData);
  profileEditPopup.close();
}

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
