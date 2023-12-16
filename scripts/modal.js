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

function openPopup(popup) {
  popup.classList.add(modalIsOpenedClassName);
}

function closePopup(popup) {
  popup.classList.remove(modalIsOpenedClassName);
}

// validation //

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error-message`);
  inputElement.classList.add("form__input_type_error");
  errorElement.classList.add("form__error-message_active");
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error-message`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__error-message_active");
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__submit_disabled");
  } else {
    buttonElement.classList.remove("form__submit_disabled");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    const buttonElement = formElement.querySelector(".form__submit");
    buttonElement.classList.add("form__submit_disabled")
    formElement.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

//

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

closeButtons.forEach((button) => {
  // find the closest popup
  const popup = button.closest(".modal");
  // set the listener
  button.addEventListener("click", () => closePopup(popup));
});

profileForm.addEventListener("submit", saveProfileChanges);
addCardForm.addEventListener("submit", saveNewCard);
