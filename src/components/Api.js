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
      headers: this._headers,
    })
      .then(this.checkResponse)
      .then((userInfo) => {
        return userInfo;
      });
  }

  patchUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}` + `/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this.checkResponse);
  }

  patchAvatar({ avatar }) {
    return fetch(`${this._baseUrl}` + `/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this.checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}` + `/cards`, {
      headers: this._headers,
    })
      .then(this.checkResponse)
      .then((cards) => {
        return cards;
      });
  }

  postCard(card) {
    return fetch(`${this._baseUrl}` + `/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
      .then(this.checkResponse)
      .then((card) => {
        return card;
      });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}` + `/cards/` + `${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.checkResponse);
  }

  setLike(id) {
    return fetch(`${this._baseUrl}` + `/cards/` + `${id}` + `/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        isLiked: true,
      }),
    }).then(this.checkResponse);
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}` + `/cards/` + `${id}` + `/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.checkResponse);
  }
}
