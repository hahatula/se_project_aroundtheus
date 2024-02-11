class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this.link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#card-template")
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__title-text").textContent = this.name;
    this._cardImageElement.src = this.link;
    this._cardImageElement.alt = this.name;

    return this._element;
  }

  _setEventListeners() {
    this._cardLikeButton = this._element.querySelector(".card__fav-icon");
    this._cardDeleteButton = this._element.querySelector(".card__trash-icon");
    this._cardImageElement = this._element.querySelector(".card__image");

    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null; //remove the link to the DOM element after deleting a card. It helps javascript garbage collector.
  }

  _handleLikeButton() {
    this._cardLikeButton.classList.toggle("card__fav-icon_active");
  }
}

export default Card;
