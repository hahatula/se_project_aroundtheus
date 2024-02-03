export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const currentName = this._name.textContent;
    const currentAbout = this._about.textContent;
    const userInfo = {currentName, currentAbout};
    return userInfo;
  }

  setUserInfo({ newName, newAbout }) {
    this._name.textContent = newName;
    this._about.textContent = newAbout;
  }
}
