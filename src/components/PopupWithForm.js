import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super({ popupSelector });
    this._form = document.forms[formSelector];
    this._handleFormSubmit = handleFormSubmit;
    this._userName = this._form.querySelector(".form__input_name");
    this._about = this._form.querySelector(".form__input_about");
    this._formSubmitEventListener();
  }

  _manageData() {
    if (this._popup.classList.contains("modal_type_add-card")) {
      const name = this._form.querySelector(".form__input_title").value;
      const link = this._form.querySelector(".form__input_image-link").value;
      const newCard = { name, link };
      this._handleFormSubmit(newCard);
      this._form.reset();
    } else if (this._popup.classList.contains("modal_type_profile")) {
      const newName = this._userName.value;
      const newAbout = this._about.value;
      const newUserData = { newName, newAbout };
      this._handleFormSubmit(newUserData);
    }
  }

  fillFields(userInfo) {
    this._userName.value = userInfo.currentName;
    this._about.value = userInfo.currentAbout;
  }

  _formSubmitEventListener() {
    const eventManageData = this._manageData.bind(this);
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      eventManageData();
      this.close();
    });
  }
}

export default PopupWithForm;
