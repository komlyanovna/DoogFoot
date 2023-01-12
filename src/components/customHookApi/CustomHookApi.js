class Api {
  constructor(api) {
    this.baseUrl = api.baseUrl
    this.groupId = api.groupId
  }

  async signUp(email, password, group) { // регистрация
    const res = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, group }),
    })
    return res.json()
  }

  async signIn(email, password) { // авторизация
    const response = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    return response.json()
  }

  async getCardItem(search) { // вывод карточек
    const response = await fetch(`${this.baseUrl}/products/?${new URLSearchParams(search).toString()}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  }

  async examination() { // проверка токена
    const response = await fetch(`${this.baseUrl}/v2/sm8/users/me`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
    })
      .catch((error) => {
        if (!window.localStorage.getItem('userToken')) {
          alert(`Ошибка ${error}. Пользователь не авторизован.`)
        }
      })
    return response.json()
  }

  async cardId(id) {
    const response = await fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  }

  getProductsById(ids) {
    return Promise.all(ids.map((id) => fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())))
  }

  async searchId(searchValue) {
    const response = await fetch(`${this.baseUrl}/products/search?query=${searchValue}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  }
}

export const api = new Api({
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    'Content-Type': 'application/json',
  },
  groupId: 'sm8',
})
