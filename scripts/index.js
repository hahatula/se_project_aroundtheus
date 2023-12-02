const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardsList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
// const showImageTemplate = document.querySelector("#show-image-template").content.firstElementChild;

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title-text");
  const cardLikeIcon = cardElement.querySelector(".card__fav-icon");
  const cardTrashIcon = cardElement.querySelector(".card__trash-icon");
  const showImage = document.querySelector(".modal_type_show-image");
  const modalImage = showImage.querySelector(".modal__image");
  const modalImageLable = showImage.querySelector(".modal__image-lable");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardLikeIcon.addEventListener("click", () => {
    cardLikeIcon.classList.toggle("card__fav-icon_active");
  });
  cardTrashIcon.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", () => {
    controlModalWindows(showImageWindow);
    modalImage.src = data.link;
    modalImage.alt = data.name;
    modalImageLable.textContent = data.name;
  });

  cardsList.prepend(cardElement);
}

initialCards.forEach((element) => {
  getCardElement(element);
});
