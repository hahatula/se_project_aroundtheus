class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error-message`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error-message`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    this._hasInvalidInput(inputList)
      ? this._disableButton(buttonElement)
      : this._enableButton(buttonElement);
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this._config.inactiveButtonClass);
    //add attribute "disabled" to prevent submit on "Enter"
    buttonElement.setAttribute("disabled", "");
  }

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this._config.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }

  _handleInput(inputList, buttonElement, inputElement) {
    this._toggleButtonState(inputList, buttonElement);
    this._checkValidity(inputElement);
  }

  _setEventListeners() {
    //array of inputs
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._disableButton(buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener(
        "input",
        this._handleInput.bind(this, inputList, buttonElement, inputElement)
      );
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
