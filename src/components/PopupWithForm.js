import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super({ popupSelector });
    this._form = document.forms[formSelector];
    this._handleFormSubmit = handleFormSubmit;
    this._setNewEventListener();
  }

  _manageData() {
    if (this._popup.classList.contains("modal_type_add-card")) {
      const name = this._form.querySelector(".form__input_title").value;
      const link = this._form.querySelector(".form__input_image-link").value;
      const newCard = { name, link };
      this._handleFormSubmit(newCard);
      this.close();
    }
  }

  _do(event) {
    event.preventDefault();
    eventManageData();
    event.target.reset();
    console.log(event);
  }

  _setNewEventListener() {
    const eventManageData = this._manageData.bind(this);
    console.log(this);
    this._form.addEventListener("submit", (event) => {
        event.preventDefault();
        eventManageData();
        event.target.reset();
        console.log(event);
      });
  }
}

export default PopupWithForm;
