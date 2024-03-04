import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { validationConfig } from "../utils/constants.js";
import "./index.css";
import Api from "../components/Api.js";

const editBtn = document.querySelector(".explorer__edit-button");
const addBtn = document.querySelector(".explorer__add-button");
const avatarChangeBtn = document.querySelector(".explorer__photo-overlay");

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
    "Content-Type": "application/json",
  },
});

//user
api
  .getUserInfo()
  .then((userInfo) => {
    //set user info
    const user = new UserInfo(
      ".explorer__name",
      ".explorer__description",
      ".explorer__photo"
    );
    user.setUserInfo({
      name: userInfo.name,
      about: userInfo.about,
    });
    user.setAvatar({ avatar: userInfo.avatar });
    return user;
  })
  .then((user) => {
    //cahnging user details
    function saveProfileChanges(newUserData) {
      profileEditPopup.savingDisplay(true);
      api
        .patchUserInfo(newUserData)
        .then(() => {
          user.setUserInfo(newUserData);
          profileEditPopup.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          profileEditPopup.savingDisplay(false);
        });
    }

    const profileEditPopup = new PopupWithForm(
      ".modal_type_profile",
      "profile-form",
      saveProfileChanges,
      "Save"
    );
    profileEditPopup.setEventListeners();
    editBtn.addEventListener("click", () => {
      formValidators["profile-form"].resetValidation();
      const currentData = user.getUserInfo();
      profileEditPopup.setInputValues(currentData);
      profileEditPopup.open();
    });

    function saveAvatar(newAvatar) {
      changeAvatarPopup.savingDisplay(true);
      api
        .patchAvatar(newAvatar)
        .then(() => {
          user.setAvatar(newAvatar);
          changeAvatarPopup.resetForm();
          changeAvatarPopup.close();
          formValidators["avatar-form"].disableButton();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          changeAvatarPopup.savingDisplay(false);
        });
    }

    const changeAvatarPopup = new PopupWithForm(
      ".modal_type_avatar",
      "avatar-form",
      saveAvatar,
      "Save"
    );
    changeAvatarPopup.setEventListeners();
    avatarChangeBtn.addEventListener("click", () => {
      changeAvatarPopup.open();
    });
  })
  .catch((err) => console.error(err));

const handleDeleteButton = (card) => {
  popupConfirmDelete.open(card);
};

const handleDeleteConfirm = (card) => {
  api
    .deleteCard(card._id)
    .then(() => {
      card.handleDeleteConfirm();
      popupConfirmDelete.close();
    })
    .catch((err) => {
      console.error(err);
    });
};

const handleLikeButton = (card) => {
  if (card.isLiked === false) {
    return api.setLike(card._id);
  } else {
    return api.removeLike(card._id);
  }
};

let cardSection;
api
  .getInitialCards()
  .then((cards) => {
    //creating initial cards
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(
            item,
            ".card",
            handleImageClick,
            handleDeleteButton,
            handleLikeButton
          );
          const cardElement = card.generateCard();
          return cardElement;
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => console.error(err));

const saveNewCard = (newCard) => {
  addCardPopup.savingDisplay(true);
  api
    .postCard(newCard)
    .then((card) => {
      cardSection.addItem(card);
      addCardPopup.close();
      addCardPopup.resetForm();
      formValidators["card-form"].disableButton();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      addCardPopup.savingDisplay(false);
    });
};

const addCardPopup = new PopupWithForm(
  ".modal_type_add-card",
  "card-form",
  saveNewCard,
  "Create"
);
addCardPopup.setEventListeners();
addBtn.addEventListener("click", () => {
  addCardPopup.open();
});

//handle card popups
const popupWithImage = new PopupWithImage(".modal_type_show-image");
const handleImageClick = (card) => {
  popupWithImage.open(card.link, card.name);
};
popupWithImage.setEventListeners();

const popupConfirmDelete = new PopupConfirmation(
  ".modal_type_confirm",
  handleDeleteConfirm
);
popupConfirmDelete.setEventListeners();
