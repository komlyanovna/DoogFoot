import { Outlet } from 'react-router-dom'
// import { CardItems } from '../CardItem/CardItems'
import stylesMain from './style.module.scss'

export function Main() {
  return (
    <main className={stylesMain.main}>
      <Outlet />
      {/* <CardItems searchValue={searchValue} setSearchValue={setSearchValue} /> */}
    </main>
  )
}
