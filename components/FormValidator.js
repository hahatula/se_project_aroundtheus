class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
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
    if (errorElement) {
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
    }
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
    this._disableButton(this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const currentHandle = this._handleInput.bind(this);
        currentHandle(this._inputList, this._buttonElement, inputElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}

export default FormValidator;
