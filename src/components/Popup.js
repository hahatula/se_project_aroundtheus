export default class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._modalIsOpenedClassName = "modal_opened";
    this._escPressed = false;
  }

  open() {
    this._popup.classList.add(this._modalIsOpenedClassName);
    this._setEventListeners();
    this._handleEscClose();
  }

  close() {
    this._popup.classList.remove(this._modalIsOpenedClassName);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _setEventListeners() {
    this._closeModalWindowBtn = this._popup.querySelector(".modal__close-btn");
    this._closeModalWindowBtn.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("click", (event) => {
        const currentHandle = this.close.bind(this);
        if (event.target.classList.contains("modal")) {
            currentHandle();
        }
    })
  }

  _handleEscClose() {
    document.addEventListener("keydown", (event) => {
      const currentHandle = this.close.bind(this);
      if (event.key === "Escape") {
        currentHandle();
      }
    });
  }
}
