import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationConfig, popups } from "../utils/constants.js";
import "./index.css";
import Api from "../components/Api.js";

const editBtn = document.querySelector(".explorer__edit-button");
const addBtn = document.querySelector(".explorer__add-button");

// define an object for storing validators
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // get the name of the form
    const formName = formElement.getAttribute("name");
    // store the validator using the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

//api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9e620f98-b2bc-4f4a-81bd-341fb1cf797f",
  },
});

//user
api.getUserInfo()
  .then(userInfo => {
    //set user info
    const user = new UserInfo(".explorer__name", ".explorer__description");
    user.setUserInfo({ name: userInfo.name, about: userInfo.about });
    return user;
  })
  .then(user => {
    //cahnging user details
    function saveProfileChanges(newUserData) {
      user.setUserInfo(newUserData);
      profileEditPopup.close();
    }
    
    const profileEditPopup = new PopupWithForm(
      ".modal_type_profile",
      "profile-form",
      saveProfileChanges
    );
    profileEditPopup.setEventListeners();
    editBtn.addEventListener("click", () => {
      formValidators["profile-form"].resetValidation();
      const currentData = user.getUserInfo();
      profileEditPopup.setInputValues(currentData);
      profileEditPopup.open();
    });
  })
  .catch((err) => console.error(err));


  api.getInitialCards()
    .then (cards => {
    //creating initial cards
    const cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(item, ".card", handleImageClick);
          const cardElement = card.generateCard();
          return cardElement;
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
    return cardSection;
  })
    .then(cardSection => {
      const saveNewCard = (newCard) => {
        cardSection.addItem(newCard);
        addCardPopup.resetForm();
        addCardPopup.close();
        formValidators["card-form"].disableButton();
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
    })
    .catch((err) => console.error(err));;


//handle card popup
const popupWithImage = new PopupWithImage(".modal_type_show-image");

const handleImageClick = (card) => {
  popupWithImage.open(card.link, card.name);
};
popupWithImage.setEventListeners();
