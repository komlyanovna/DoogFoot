import { Outlet } from 'react-router-dom'
import stylesMain from './style.module.scss'

export function Main() {
  return (
    <main className={stylesMain.main}>
      <Outlet />
    </main>
  )
}
