import StyleLogo from './styles.module.css'

export function Logo() {
  return (
    <div className={StyleLogo.img}>
      <img src="https://do-way.ru/wp-content/uploads/2018/10/logo-retina.png" alt="Логотип" />
    </div>
  )
}
