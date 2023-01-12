import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../Logo/Logo'
import { NavigationHeader } from '../NavigationHeader/NavigationHeader'
import { Search } from '../Search/Search'
import StyleHeader from './styles.module.css'

export function Header() {
  const navigate = useNavigate()
  const output = () => {
    alert('Вы действительно хотите покинуть личный кабинет?')
    localStorage.removeItem('userToken')
    navigate('/')
  }

  return (
    <header>
      <div className={StyleHeader.header}>
        <Logo />
        <Search />
        <NavigationHeader />
        <div className={StyleHeader.LinkContainer}>
          <Link className={StyleHeader.Link} to="/catalog">Главная</Link>
          {localStorage.getItem('userToken') ? <button className={StyleHeader.outup} onClick={() => output()} type="button">Выйти</button> : (
            <>
              <Link className={StyleHeader.Link} to="/signIn/form">Авторизация</Link>
              <Link className={StyleHeader.Link} to="/signup/form">Регистрация</Link>
            </>
          )}
        </div>
      </div>

    </header>
  )
}
