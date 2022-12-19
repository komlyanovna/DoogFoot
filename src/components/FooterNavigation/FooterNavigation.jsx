import StylesFooterNav from './styles.module.css'

export function FooterNavigation() {
  return (
    <div className={StylesFooterNav.footerNavigation}>
      <p>Каталог</p>
      <p>Акции</p>
      <p>Новости</p>
      <p>Отзывы</p>
      <p>Оплата и доставка</p>
      <p>Часто спрашивают</p>
      <p>Обратная связь</p>
      <p>Контакты</p>
    </div>
  )
}
