import { NavLink } from 'react-router-dom'
import StyleMain from './style.module.scss'

export function TextContainerMain() {
  return (
    <div className={StyleMain.container__main}>
      <h2>Зарегистрируйтесь</h2>
      <h3> Или войдите</h3>
      <h3>Чтобы получить доступ к каталогу товаров</h3>
      <div className={StyleMain.link__container}>
        <NavLink className={StyleMain.btn} to="/signup/form">
          Зарегистрироваться
        </NavLink>
        <NavLink className={StyleMain.btn} to="/signIn/form">
          Войти
        </NavLink>
      </div>
    </div>
  )
}
