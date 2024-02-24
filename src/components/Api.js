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
    return fetch(`${this._baseUrl}` + `/users/me`, {
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
      .then(this.checkResponse)
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  patchAvatar({ avatar }) {
    return fetch(`${this._baseUrl}` + `/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "9e620f98-b2bc-4f4a-81bd-341fb1cf797f",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then(this.checkResponse)
      .catch((err) => {
        console.error(err); // log the error to the console
      });
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
        return cards;
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  postCard({ name, link }) {
    return fetch(`${this._baseUrl}` + `/cards`, {
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
      .then(this.checkResponse)
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  deleteCard(id) {
    fetch(`${this._baseUrl}` + `/cards/` + `${id}`, {
      method: "DELETE",
      headers: {
        authorization: "9e620f98-b2bc-4f4a-81bd-341fb1cf797f",
      },
    })
      .then(this.checkResponse)
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  setLike(id) {
    fetch(`${this._baseUrl}` + `/cards/` + `${id}` + `/likes`, {
      method: "PUT",
      headers: {
        authorization: "9e620f98-b2bc-4f4a-81bd-341fb1cf797f",
      },
      body: JSON.stringify({
        isLiked: true,
      }),
    })
      .then(this.checkResponse)
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  removeLike(id) {
    fetch(`${this._baseUrl}` + `/cards/` + `${id}` + `/likes`, {
      method: "DELETE",
      headers: {
        authorization: "9e620f98-b2bc-4f4a-81bd-341fb1cf797f",
      },
    })
      .then(this.checkResponse)
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }
}
