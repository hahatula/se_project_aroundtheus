const modalIsOpenedClassName = "modal_opened";
const profileEditWindow = document.querySelector(".modal_type_profile");
const addCardWindow = document.querySelector(".modal_type_add-card");
const showImageWindow = document.querySelector(".modal_type_show-image");
const editBtn = document.querySelector(".explorer__edit-button");
const addBtn = document.querySelector(".explorer__add-button");
const closeButtons = document.querySelectorAll(".modal__close-btn");
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
  const newName = inputTitle.value;
  const newLink = inputImgLink.value;
  getCardElement({newName, newLink});
  closePopup(addCardWindow);
  e.target.reset();
}

editBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(profileEditWindow);
});
addBtn.addEventListener("click", () => {
  openPopup(addCardWindow);
});

closeButtons.forEach((button) => {
  // find the closest popup 
  const popup = button.closest(".modal");
  // set the listener
  button.addEventListener('click', () => closePopup(popup));
});

profileForm.addEventListener("submit", saveProfileChanges);
addCardForm.addEventListener("submit", saveNewCard);
