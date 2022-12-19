import { Contacts } from '../Contacts/Contacts'
import { FooterNavigation } from '../FooterNavigation/FooterNavigation'
import { Logo } from '../Logo/Logo'
import StylesFooter from './styles.module.css'

export function Footer() {
  return (
    <footer className={StylesFooter.footer}>
      <div className={StylesFooter.footerContainer}>
        <Logo />
        <FooterNavigation />
        <Contacts />
      </div>
    </footer>
  )
}
