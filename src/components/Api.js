export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}` + `/users/me`, {
      headers: {
        authorization: "9e620f98-b2bc-4f4a-81bd-341fb1cf797f",
        "Content-Type": "application/json",
      },
    })
      .then(this.checkResponse)
      .then((userInfo) => {
        return userInfo;
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  patchUserInfo({ name, about }) {
    fetch(`${this._baseUrl}` + `/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "9e620f98-b2bc-4f4a-81bd-341fb1cf797f",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
    .catch((err) => {
      console.error(err); // log the error to the console
    });;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}` + `/cards`, {
      headers: {
        authorization: "9e620f98-b2bc-4f4a-81bd-341fb1cf797f",
        "Content-Type": "application/json",
      },
    })
      .then(this.checkResponse)
      .then((cards) => {
        console.log(cards);
        return cards;
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  postCard({name, link}) {
    fetch(`${this._baseUrl}` + `/cards`, {
      method: "POST",
      headers: {
        authorization: "9e620f98-b2bc-4f4a-81bd-341fb1cf797f",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .catch((err) => {
      console.error(err); // log the error to the console
    });;
  }
}
