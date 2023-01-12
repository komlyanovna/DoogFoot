/* eslint-disable consistent-return */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import StyleNavigation from './styles.module.css'
import { Modal } from '../ModalUserDiteil/ModalUserDiteil'
import { api } from '../customHookApi/CustomHookApi'

const USER_DITEIL = ['USER_DITEIL']

export function NavigationHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const { items, totalPrice } = useSelector((state) => state.cart)

  const totalCount = items.reduce((sum, item) => sum + item.count, 0)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const { data, status, error } = useQuery({
    queryKey: USER_DITEIL,
    queryFn: () => api.examination(),

    enabled: !!localStorage.getItem('userToken'),
  })
  if (status === 'loading') {
    return <h3>Loading...</h3>
  }
  if (status === 'error') {
    return (
      <span>
        Error:
        {error.message}
      </span>
    )
  }

  const basketProducts = () => {
    navigate('/basket')
  }

  return (
    <div className={StyleNavigation.navigationIcon}>
      <FontAwesomeIcon icon={regular('heart')} />
      <button
        type="button"
        className={StyleNavigation.button}
        onClick={(e) => {
          e.preventDefault()
          basketProducts()
        }}
      >
        <FontAwesomeIcon icon={solid('cart-shopping')} />
        <span>
          {totalPrice}
          {' '}
          Руб.
        </span>
        <p className={StyleNavigation.amountProducts}>{totalCount}</p>
      </button>
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
          <img src={data.avatar} alt="Аватар" />
          <h3>
            {data.name}
          </h3>
          <h4>
            {data.email}
          </h4>
          <h4>
            {data.about}
          </h4>
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
