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
    await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => response.json())
      .then((data) => {
        localStorage.setItem('userToken', data.token)
      })
      .catch((error) => console.error(error.message))
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

  // async getCardItem() { // вывод карточек
  //   await fetch(`${this.baseUrl}/products`, {
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('userToken')}`,
  //       'Content-Type': 'application/json',
  //     },
  //   }).then((res) => res.json())
  // }

  async examination() { // проверка токена
    const response = await fetch(`${this.baseUrl}/v2/sm8/users/me`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
    })
      .catch((error) => console.error(error.message))
    if (!localStorage.getItem('userToken')) {
      alert(`Ошибка ${response.status}. Пользователь не авторизован.`)
    }
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
