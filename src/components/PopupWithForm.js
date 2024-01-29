import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({popupSelector});
        this._popup;
        this._handleFormSubmit = handleFormSubmit;
    }
}