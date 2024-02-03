import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super({ popupSelector });
    this._form = document.forms[formSelector];
    this._handleFormSubmit = handleFormSubmit;
    // this._userName;
    // this._about;
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
        const userName = this._form.querySelector(".form__input_name");
        const about = this._form.querySelector(".form__input_about");
        const newUserData = { userName, about };
        this._handleFormSubmit(newUserData);
      // this._name = inputName.value;
      // this._about = inputAbout.value;
    }
  }

  fillFields(name, about) {
    // this._userName.value = name;
    // this._about.value = about;
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
