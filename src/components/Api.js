export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}` + `/users/me`, {
      headers: this._headers,
    }).then((userInfo) => {
      return userInfo;
    });
  }

  patchUserInfo({ name, about }) {
    return this._request(`${this._baseUrl}` + `/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  patchAvatar({ avatar }) {
    return this._request(`${this._baseUrl}` + `/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}` + `/cards`, {
      headers: this._headers,
    }).then((cards) => {
      return cards;
    });
  }

  postCard(card) {
    return this._request(`${this._baseUrl}` + `/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((card) => {
      return card;
    });
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}` + `/cards/` + `${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  setLike(id) {
    return this._request(`${this._baseUrl}` + `/cards/` + `${id}` + `/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        isLiked: true,
      }),
    });
  }

  removeLike(id) {
    return this._request(`${this._baseUrl}` + `/cards/` + `${id}` + `/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
