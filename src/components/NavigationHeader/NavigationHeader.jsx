import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import StyleNavigation from './styles.module.css'
import { Modal } from '../ModalUserDiteil/ModalUserDiteil'
import { api } from '../customHookApi/CustomHookApi'

export function NavigationHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState({})

  const openModal = () => {
    setIsModalOpen(true)
  }

  useEffect(() => {
    api.examination()
      .then((data) => setUser(data))
  }, [])

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={StyleNavigation.navigationIcon}>
      <FontAwesomeIcon icon={regular('heart')} />
      <FontAwesomeIcon icon={solid('cart-shopping')} />
      <button
        type="button"
        className={StyleNavigation.button}
        onClick={openModal}
      >
        <FontAwesomeIcon
          icon={regular('user')}
        />
      </button>
      <Modal isOpen={isModalOpen} closeHendler={closeModal}>
        <div className={StyleNavigation.containerModal}>
          <img src={user.avatar} alt="Аватар" />
          <h3>{user.name}</h3>
          <h4>{user.email}</h4>
          <h4>{user.about}</h4>
          <button type="submit" className={StyleNavigation.btnAdd}>Редактировать профиль</button>
          <button
            type="button"
            className={StyleNavigation.btn}
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={solid('xmark')} />
          </button>
        </div>
      </Modal>
    </div>
  )
}
