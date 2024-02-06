import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super({ popupSelector });
    this._form = document.forms[formSelector];
    this._handleFormSubmit = handleFormSubmit;
    this._userName = this._form.querySelector(".form__input_name");
    this._about = this._form.querySelector(".form__input_about");
    this._setEventListeners();
  }

  fillFields(userInfo) {
    this._userName.value = userInfo.currentName;
    this._about.value = userInfo.currentAbout;
  }

  _setEventListeners() {
    super.setEventListeners();
    const handle = this._handleFormSubmit.bind(this);
    this._form.addEventListener("submit", (event) => {
        event.preventDefault();
        handle(this);
      });
  }

  resetForm() {
    this._form.reset();
  }
}

export default PopupWithForm;
