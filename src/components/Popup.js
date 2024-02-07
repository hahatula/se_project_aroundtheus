export default class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._modalIsOpenedClassName = "modal_opened";
    this._escPressed = false;
    this._listenerSet = false;
    this.setEventListeners();
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(this._modalIsOpenedClassName);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._modalIsOpenedClassName);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._closeModalWindowBtn = this._popup.querySelector(".modal__close-btn");
    this._closeModalWindowBtn.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", (event) => {
      const currentHandle = this.close.bind(this);
      if (event.target.classList.contains("modal")) {
        currentHandle();
      }
    });
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
