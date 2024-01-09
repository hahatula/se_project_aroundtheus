class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    console.log(this);
  }

  _checkValidity() {}

  _toggleButtonState() {}

  _disableButton() {}

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._disableButton(buttonElement, this._config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        this._toggleButtonState(inputList, buttonElement, this._config);
        this._checkValidity(this._formElement, inputElement, this._config);
      });
    });
  }

  _handleSmth() {}

  enableValidation() {
    this._setEventListeners(this._formElement, this._config);
    console.log(`this._formElement is ${this._formElement}`);
  }
}

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-message_active",
};

const addCardFormValidator = new FormValidator(validationConfig, document.forms["card-form"]);
addCardFormValidator.enableValidation();