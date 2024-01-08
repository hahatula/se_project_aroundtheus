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

class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector("#card-template").content.firstElementChild.cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector(".card__title-text").textContent = this._name;
        this._element.querySelector(".card__image").src = this._image;
        this._element.querySelector(".card__image").alt = this._name;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._cardLikeButton = this._element.querySelector(".card__fav-icon");
        this._cardDeleteButton = this._element.querySelector(".card__trash-icon");
        this._cardImageElement = this._element.querySelector(".card__image");

        this._cardLikeButton.addEventListener('click', () => {
            this._handleLikeButton();
        });
        this._cardDeleteButton.addEventListener('click', () => {
            this._handleDeleteButton();
        });
        this._cardImageElement.addEventListener('click', () => {
            console.log(this);
            this._handleImageClick(this);
        })
    }

    _handleDeleteButton() {
        this._element.remove();
    }

    _handleLikeButton() {
        this._cardLikeButton.classList.toggle("card__fav-icon_active");
    }
}

function renderCard(card) {
    const cardElement = card.generateCard();
    cardsList.prepend(cardElement);
}

initialCards.forEach((item) => {
    const card = new Card(item, ".card", handleImageClick);
    renderCard(card);
});