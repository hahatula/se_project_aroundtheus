const modalWindow = document.querySelector(".modal");
const modalIsOpenedClassName = "modal_opened";
const profileEditWindow = document.querySelector(".modal_type_profile");
const addCardWindow = document.querySelector(".modal_type_add-card");
const editBtn = document.querySelector(".explorer__edit-button");
const addBtn = document.querySelector(".explorer__add-button");
const closeBtnProfileEditWindow =
  profileEditWindow.querySelector(".modal__close-btn");
const closeBtnAddCardWindow = addCardWindow.querySelector(".modal__close-btn");
const profileForm = profileEditWindow.querySelector(".form");
const addCardForm = addCardWindow.querySelector(".form");
let profileName = document.querySelector(".explorer__name");
let profileAbout = document.querySelector(".explorer__description");
let cardTitle = document.querySelector(".card__title");
let cardImg = document.querySelector(".card__image");
let inputName = profileEditWindow.querySelector(".form__input_name");
let inputAbout = profileEditWindow.querySelector(".form__input_about");
let inputTitle = addCardWindow.querySelector(".form__input_title");
let inputImgLink = addCardWindow.querySelector(".form__input_image-link");
// let closeBtn;

// const modalWindows = [
//   {
//     name: "profileEditWindow",
//     "open-btn": editBtn,
//     "close-btn": closeBtnProfileEditWindow,
//   },
//   {
//     "name": "addCardWindow",
//     "open-btn": addBtn,
//     "close-btn": closeBtnAddCardWindow,
//   }
// ];

// function controlModalWindows(data) {
//   const currentWindow = data.name;
//   console.log(currentWindow);
// }

// modalWindows.forEach((element) => {
//   controlModalWindows(element);
// });

function controlModalWindows(modal) {
  modal.classList.toggle(modalIsOpenedClassName);
  if (modal.classList.contains(modalIsOpenedClassName)) {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
    inputTitle.value = "";
  }
}

function saveChanges(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  cardTitle.textContent = inputTitle.value;
  if (profileEditWindow.classList.contains(modalIsOpenedClassName)) {
    profileEditWindow.classList.toggle(modalIsOpenedClassName);
  } else if (addCardWindow.classList.contains(modalIsOpenedClassName)) {
    addCardWindow.classList.toggle(modalIsOpenedClassName);
  }
  console.log(cardTitle.textContent);
}

editBtn.addEventListener("click", () => {
  controlModalWindows(profileEditWindow);
});
closeBtnProfileEditWindow.addEventListener("click", () => {
  controlModalWindows(profileEditWindow);
});
addBtn.addEventListener("click", () => {
  controlModalWindows(addCardWindow);
});
closeBtnAddCardWindow.addEventListener("click", () => {
  controlModalWindows(addCardWindow);
});
profileForm.addEventListener("submit", saveChanges);
addCardForm.addEventListener("submit", saveChanges);
