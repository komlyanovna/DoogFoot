import { Logo } from '../Logo/Logo'
import { NavigationHeader } from '../NavigationHeader/NavigationHeader'
import { Search } from '../Search/Search'
import StyleHeader from './styles.module.css'

export function Header() {
  return (
    <header>
      <div className={StyleHeader.header}>
        <Logo />
        <Search />
        <NavigationHeader />
      </div>

    </header>
  )
}
