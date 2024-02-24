class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteButton,
    handleLikeButton
  ) {
    this.name = data.name;
    this.link = data.link;
    this._id = data._id;
    this.isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton;
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
    this._setLikeIconState();

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
      
      this._handleLikeButton(this);
      this._toggleLikeIcon();
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this);
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _setLikeIconState() {
    this.isLiked
      ? this._cardLikeButton.classList.add("card__fav-icon_active")
      : this._cardLikeButton.classList.remove("card__fav-icon_active");
  }

  _toggleLikeIcon() {
    this._cardLikeButton.classList.toggle("card__fav-icon_active");
    // this.isLiked = !this.isLiked;
  }

  handleDeleteConfirm() {
    this._element.remove();
    this._element = null; //remove the link to the DOM element after deleting a card. It helps javascript garbage collector.
  }
}

export default Card;
