const modalIsOpenedClassName = "modal_opened";
const profileEditWindow = document.querySelector(".modal_type_profile");
const addCardWindow = document.querySelector(".modal_type_add-card");
const showImageWindow = document.querySelector(".modal_type_show-image");
const editBtn = document.querySelector(".explorer__edit-button");
const addBtn = document.querySelector(".explorer__add-button");
const closeBtnProfileEditWindow =
  profileEditWindow.querySelector(".modal__close-btn");
const closeBtnAddCardWindow = addCardWindow.querySelector(".modal__close-btn");
const closeBtnShowImageWindow =
  showImageWindow.querySelector(".modal__close-btn");
const profileForm = document.forms["profile-form"];
const addCardForm = document.forms["card-form"];
const profileName = document.querySelector(".explorer__name");
const profileAbout = document.querySelector(".explorer__description");
const inputName = profileEditWindow.querySelector(".form__input_name");
const inputAbout = profileEditWindow.querySelector(".form__input_about");
const inputTitle = addCardWindow.querySelector(".form__input_title");
const inputImgLink = addCardWindow.querySelector(".form__input_image-link");

function openPopup(popup) {
  popup.classList.add(modalIsOpenedClassName);
}

function closePopup(popup) {
  popup.classList.remove(modalIsOpenedClassName);
}

function saveProfileChanges(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(profileEditWindow);
}

function saveNewCard(e) {
  e.preventDefault();
  newName = inputTitle.value;
  newLink = inputImgLink.value;
  createNewCard(newName, newLink);
  getCardElement(newCard); //this function is created in index.js
  closePopup(addCardWindow);
  inputTitle.value = "";
  inputImgLink.value = "";
}

function createNewCard(newName, newLink) {
  newCard = {
    name: newName,
    link: newLink,
  };
  return newCard;
}

editBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(profileEditWindow);
});
closeBtnProfileEditWindow.addEventListener("click", () => {
  closePopup(profileEditWindow);
});
addBtn.addEventListener("click", () => {
  openPopup(addCardWindow);
});
closeBtnAddCardWindow.addEventListener("click", () => {
  closePopup(addCardWindow);
});
closeBtnShowImageWindow.addEventListener("click", () => {
  closePopup(showImageWindow);
});
profileForm.addEventListener("submit", saveProfileChanges);
addCardForm.addEventListener("submit", saveNewCard);
