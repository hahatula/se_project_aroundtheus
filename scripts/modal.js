const modalIsOpenedClassName = "modal_opened";
const profileEditPopup = document.querySelector(".modal_type_profile");
const addCardPopup = document.querySelector(".modal_type_add-card");
const openImagePopup = document.querySelector(".modal_type_show-image");
const editBtn = document.querySelector(".explorer__edit-button");
const addBtn = document.querySelector(".explorer__add-button");
const closeButtons = document.querySelectorAll(".modal__close-btn");
const profileForm = document.forms["profile-form"];
const addCardForm = document.forms["card-form"];
const profileName = document.querySelector(".explorer__name");
const profileAbout = document.querySelector(".explorer__description");
const inputName = profileEditPopup.querySelector(".form__input_name");
const inputAbout = profileEditPopup.querySelector(".form__input_about");
const inputTitle = addCardPopup.querySelector(".form__input_title");
const inputImgLink = addCardPopup.querySelector(".form__input_image-link");
const modalWindows = Array.from(document.querySelectorAll(".modal"));
const modalWindowClassName = "modal";

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
  closePopup(profileEditPopup);
}

function saveNewCard(e) {
  e.preventDefault();
  const name = inputTitle.value;
  const link = inputImgLink.value;
  getCardElement({ name, link });
  closePopup(addCardPopup);
  console.log(e.target);
  e.target.reset();
}

editBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(profileEditPopup);
});

addBtn.addEventListener("click", () => {
  openPopup(addCardPopup);
});

modalWindows.forEach((modalWindow) => {
  modalWindow.addEventListener("click", (e) => {
    if (e.target.classList.contains(modalWindowClassName)) {
      closePopup(modalWindow);
    }
  });
  document.addEventListener("keydown", (e) => {
    console.log(e);
    if (e.key === "Escape") {
      closePopup(modalWindow);
    }
  });
});

closeButtons.forEach((button) => {
  // find the closest popup
  const popup = button.closest(".modal");
  // set the listener
  button.addEventListener("click", () => closePopup(popup));
});

profileForm.addEventListener("submit", saveProfileChanges);
addCardForm.addEventListener("submit", saveNewCard);
