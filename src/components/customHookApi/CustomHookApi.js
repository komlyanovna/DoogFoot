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
    }).then((response) => response.json()).then((response) => {
      if (response.status !== 200) {
        console.log('Пользователь существует, или не корректно заполнено одно из полей')
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
        window.localStorage.setItem('userToken', data.token)
      })
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

  // async examination() { // проверка токена
  //   await fetch(`${this.baseUrl}/v2/sm8/users/me`, {
  //     headers: {
  //       authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data) {
  //         console.log('Вы авторизованы')
  //       }
  //       console.log(data)
  //     })
  // }

  async examination() { // проверка токена
    const response = await fetch(`${this.baseUrl}/v2/sm8/users/me`, {
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
