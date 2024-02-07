import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super({ popupSelector });
    this._form = document.forms[formSelector];
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll("input");
    this._setEventListeners();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
        // here you insert the `value` by the `name` of the input
        input.value = data[input.name];
      });
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
