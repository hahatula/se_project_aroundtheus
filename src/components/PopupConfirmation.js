import Popup from "./Popup.js";

class PopupConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super({ popupSelector });
    this._btn = this._popup.querySelector(".modal__confirm-btn");
    this._handleConfirm = handleConfirm;
  }

  open(target) {
    this._target = target;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._btn.addEventListener("click", () => {
      this._handleConfirm(this._target);
    });
    //we can add other confirmations here
  }
}

export default PopupConfirmation;
