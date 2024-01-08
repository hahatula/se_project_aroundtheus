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
// const cardLikeButton = document.querySelector(".card__fav-icon");
// const cardDeleteButton = document.querySelector(".card__trash-icon");

class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._cardLikeButton = document.querySelector(".card__fav-icon");
        this._cardDeleteButton = document.querySelector(".card__trash-icon");
    }

    _getTemplate() {
        const cardElement = document.querySelector("#card-template").content.firstElementChild.cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        // this._setEventListeners();

        this._element.querySelector(".card__title-text").textContent = this._name;
        this._element.querySelector(".card__image").src = this._link;
        this._element.querySelector(".card__image").alt = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            this._handleLikeButton;
        });
        cardDeleteButton.addEventListener('click', () => {
            this._handleDeleteButton;
        });
    }

    _handleDeleteButton() {
        this._element.remove();
    }

    _handleLikeButton() {
        cardLikeButton.classList.toggle("card__fav-icon_active");
    }
}

function renderCard(card) {
    const cardElement = card.generateCard();
    cardsList.prepend(cardElement);
}

initialCards.forEach((item) => {
    const card = new Card(item);
    renderCard(card);
});