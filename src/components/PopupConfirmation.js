import Popup from "./Popup.js";

class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._btn = this._popup.querySelector(".modal__confirm-btn");
  }

  open(element) {
    this._element = element;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._btn.addEventListener("click", this._deleteElement.bind(this));
    //we can add other confirmations here
  }

  _deleteElement() {
    this._element.remove();
    this._element = null; //remove the link to the DOM element after deleting a card. It helps javascript garbage collector.
    super.close();
  }
}

export default PopupConfirmation;
