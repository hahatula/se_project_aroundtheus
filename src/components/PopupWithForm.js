import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super({ popupSelector });
    this._form = document.forms[formSelector];
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll("input");
  }

  getInputValues() {
    const name = this._form.querySelector(".form__input_title") ? this._form.querySelector(".form__input_title").value : null;
    const link = this._form.querySelector(".form__input_image-link") ? this._form.querySelector(".form__input_image-link").value : null;;
    const newName = this._form.querySelector(".form__input_name") ? this._form.querySelector(".form__input_name").value : null;
    const newAbout = this._form.querySelector(".form__input_about") ? this._form.querySelector(".form__input_about").value : null;
    const inputValues = {name, link, newName, newAbout};
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // here you insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this);
    });
  }

  resetForm() {
    this._form.reset();
  }
}

export default PopupWithForm;
