/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { api } from '../customHookApi/CustomHookApi'
import StyleBasket from './styles.module.scss'
import {
  addItem,
  clearItems,
  minusItem,
  removeItem,
  setCheckbox,
  // setCheckbox,
  toggleCheckAll,
} from '../../redux-toolkit/slices/cartSlice/cartSlice'

export const PRODUCT_CARD = ['PRODUCT_CARD']

const getCartItemQueryKey = (cartItemsId) => PRODUCT_CARD.concat(cartItemsId)

export function BasketProduct() {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(true)

  const onClickPlus = (id) => {
    dispatch(
      addItem({
        id,
      }),
    )
  }

  const onClickMinus = (id) => {
    dispatch(minusItem(id))
  }

  const onClickRemove = (id) => {
    dispatch(removeItem(id))
  }

  const onClickClearCart = () => {
    dispatch(clearItems())
  }

  const cartId = useSelector((store) => store.cart.items)

  const mainCheckbox = useSelector((store) => store.cart.checkbox)

  const { totalPrice } = useSelector((store) => store.cart)

  const { data } = useQuery({
    queryKey: getCartItemQueryKey(cartId.map((card) => card.id)),
    queryFn: () => api.getProductsById(cartId.map((card) => card.id)),
  })

  const countId = (id) => {
    const objId = cartId.find((obj) => obj.id === id)
    if (!objId) {
      return null
    // eslint-disable-next-line no-else-return
    } else {
      return objId.count
    }
  }

  const sale = (price, discountActive, id) => {
    if (discountActive !== 0) {
      const countCart = price - (price / discountActive)
      return countCart * countId(id)
    }
    return price * countId(id)
  }

  const priceCount = (id, price) => price * countId(id)

  const toggleCheckbox = () => {
    setChecked(!checked)
    dispatch(toggleCheckAll())
  }

  const setCheckboxId = (id) => {
    dispatch(setCheckbox(id))
    setChecked(!checked)
  }

  return (
    cartId.length && data ? (
      <div className={StyleBasket.container}>
        <input type="checkbox" checked={mainCheckbox} onChange={() => toggleCheckbox()} className={StyleBasket.checkboxContainer} />
        {data.map((el) => (
          <div className={StyleBasket.basketCard} key={el['_id']}>
            <input type="checkbox" checked={el.checked} onChange={() => setCheckboxId(el['_id'])} className={StyleBasket.checkbox} />
            <img className={StyleBasket.img} src={el.pictures} alt="Изображение" />
            <p>{el.name}</p>
            {el.discount ? (
              <>
                <p>
                  {sale(el.price, el.discount, el['_id'])}
                  {' '}
                  Руб.
                </p>
                <p className={StyleBasket.priceActive}>
                  {priceCount(el['_id'], el.price)}
                  {' '}
                  Руб
                </p>
              </>
            ) : (
              <p>
                {sale(el.price, el.discount, el['_id'])}
                {' '}
                Руб.
              </p>
            )}
            {countId(el['_id']) === 1 ? (
              <button
                className={StyleBasket.btnCounter}
                type="button"
                disabled
              >
                -
              </button>
            ) : (
              <button
                className={StyleBasket.btnCounter}
                type="button"
                onClick={() => {
                  onClickMinus(el['_id'])
                }}
              >
                -
              </button>
            )}
            <div>
              {countId(el['_id'])}
            </div>
            {countId(el['_id']) === el.stock ? (
              <button
                className={StyleBasket.btnCounter}
                type="button"
                disabled
              >
                +
              </button>
            ) : (
              <button
                className={StyleBasket.btnCounter}
                type="button"
                onClick={() => {
                  onClickPlus(el['_id'])
                }}
              >
                +
              </button>

            )}
            <button
              className={StyleBasket.trash}
              type="button"
              onClick={() => {
                onClickRemove(el['_id'])
              }}
            >
              <FontAwesomeIcon icon={solid('trash')} />
            </button>
            <hr />
          </div>
        ))}
        <div className={StyleBasket.ordering}>
          <h3>
            Итого:
            {' '}
            {totalPrice}
          </h3>
          <button className={StyleBasket.design} type="button">Оформить заказ</button>
          <button
            className={StyleBasket.clear}
            type="button"
            onClick={() => onClickClearCart()}
          >
            Очистить Корзину
          </button>
          <Link to="/catalog">Вернуться в каталог</Link>
        </div>
      </div>
    )
      : (
        <div>
          <h3>Ваша корзина пуста</h3>
          <Link to="/catalog">Вернуться в каталог</Link>
        </div>
      )
  )
}
