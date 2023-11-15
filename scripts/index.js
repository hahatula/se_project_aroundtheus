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

// function getCardElement(data) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImage = cardElement.querySelector(".card__image");
//   cardImage.src = initialCards[i].link;
//   cardImage.alt = initialCards[i].name;
//   cardElement.querySelector(".card__title-text").textContent =
//     initialCards[1].name;
//   cardsList.prepend(cardElement);
//}

function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardElement.querySelector(".card__title-text").textContent =
      data.name;
    cardsList.prepend(cardElement);
  }

// for (i = 0; i < initialCards.length; i++) {
//   getCardElement();
// }

initialCards.forEach(element => {
    getCardElement(element);
});
