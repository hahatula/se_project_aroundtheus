class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    console.log(this);
  }

  _checkValidity() {}

  _changeBtnState() {}

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    disableButton(buttonElement, config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        toggleButtonState(inputList, buttonElement, this._config);
        checkInputValidity(this._formElement, inputElement, this._config);
      });
    });
  }

  _handleSmth() {}

  enableValidation() {
    this._setEventListeners(formElement, this._config);
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

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
