import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit, submitText) {
    super({ popupSelector });
    this._form = document.forms[formSelector];
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll("input");
    this._submitBtn = this._form.querySelector(".form__submit");
    this._submitText = submitText;
    this._setButtonText();
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  _setButtonText() {
    this._submitBtn.textContent = this._submitText;
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
      this._handleFormSubmit(this._getInputValues());
    });
  }

  resetForm() {
    this._form.reset();
  }

  savingDisplay(isSaving) {
    if (isSaving === true) {
      this._submitBtn.textContent = "Saving..."
    } else {
      this._setButtonText();
    }
  }
}

export default PopupWithForm;
