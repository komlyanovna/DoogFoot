import StyleContacts from './style.module.css'

export function Contacts() {
  return (
    <div className={StyleContacts.Contacts}>
      <h3>Мы на связи</h3>
      <h4>8 (999) 00-00-00</h4>
      <p>DoWay@gmail.ru</p>
      <div className={StyleContacts.FooterIcon}>
        <img src="https://phonoteka.org/uploads/posts/2021-04/1619706247_13-phonoteka_org-p-znachok-instagram-bez-fona-dlya-fotoshopa-13.png" alt="insta" />
        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111705.png" alt="Viber" />
        <img src="https://cdn-icons-png.flaticon.com/512/355/355977.png" alt="telegram" />
        <img src="https://pngicon.ru/file/uploads/vk.png" alt="vk" />
        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111728.png" alt="whatsapp" />
      </div>
    </div>
  )
}
