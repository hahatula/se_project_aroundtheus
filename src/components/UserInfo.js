export default class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const name = this._name.textContent;
    const about = this._about.textContent;
    const userInfo = { name, about };
    return userInfo;
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
