import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popup.querySelector('.modal__image');
    this._imageLable = this._popup.querySelector('.modal__image-lable');
  }

  open(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._imageLable.textContent = name;
    super.open();
  }
}

export default PopupWithImage;