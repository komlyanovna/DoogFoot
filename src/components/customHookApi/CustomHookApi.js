class Api {
  constructor(api) {
    this.baseUrl = api.baseUrl
    this.groupId = api.groupId
  }

  async signUp(email, group, password) { // регистрация
    await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, group, password }),
    })
      .then((res) => {
        res.json()
        if (res.status !== 200 && res.status !== 201) {
          alert(`Ошибка ${res.statusText}`)
        }
      })
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

  async getCardItem() { // вывод карточек
    const response = await fetch(`${this.baseUrl}/products`, {
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
      // .catch((error) => console.error(error.message))
      .catch((error) => {
        if (!localStorage.getItem('userToken')) {
          alert(`Ошибка ${error}. Пользователь не авторизован.`)
        }
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
