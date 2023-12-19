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

function openPopup(popup) {
  popup.classList.add(modalIsOpenedClassName);
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove(modalIsOpenedClassName);
  document.removeEventListener("keydown", closeByEscape);
}

function saveProfileChanges(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(profileEditPopup);
}

function saveNewCard(e) {
  e.preventDefault();
  const name = inputTitle.value;
  const link = inputImgLink.value;
  getCardElement({ name, link });
  closePopup(addCardPopup);
  e.target.reset();
}

editBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  enableValidation(config);
  openPopup(profileEditPopup);
});

addBtn.addEventListener("click", () => {
  enableValidation(config);
  openPopup(addCardPopup);
});

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
      closePopup(modalWindow);
    }
  });
});

profileForm.addEventListener("submit", saveProfileChanges);
addCardForm.addEventListener("submit", saveNewCard);
