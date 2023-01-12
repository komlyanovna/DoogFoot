/* eslint-disable dot-notation */
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSearchContextData } from '../../App'
import { addItem } from '../../redux-toolkit/slices/cartSlice/cartSlice'
import { api } from '../customHookApi/CustomHookApi'
import StyleCardItem from './style.module.scss'

export const RENDER_CARD = ['RENDER_CARD']
export const getContactsQueryKey = (value) => RENDER_CARD.concat(Object.values(value))

// eslint-disable-next-line no-unused-vars
export function CardItems() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const searchValue = useSearchContextData()
  // eslint-disable-next-line quotes
  const onClickAdd = (id, price, discount, pictures, name, stock) => {
    const item = {
      id,
      price,
      discount,
      pictures,
      name,
      stock,
    }
    dispatch(addItem(item))
  }

  const sale = (price, discountActive) => {
    if (discountActive === 0) {
      return null
    }
    return price - (price / discountActive)
  }

  const { data, status, error } = useQuery({
    queryKey: getContactsQueryKey(searchValue),
    queryFn: () => api.getCardItem({
      query: searchValue.searchValue,
    }),
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

  return (
    data && data.products
      ? (
        <div className={StyleCardItem.conteinerCard}>
          {data.products.map((el) => (
            <div className={StyleCardItem.cardItem} key={el['_id']} data-id={(el['_id'])}>
              <FontAwesomeIcon className={StyleCardItem.icon} icon={regular('heart')} />
              <p className={StyleCardItem.likes}>{el.likes.length}</p>
              <img src={el.pictures} alt="Фото" />
              <h3>{el.name}</h3>
              {el.discount ? (
                <>
                  <p>
                    {sale(el.price, el.discount)}
                    <FontAwesomeIcon className={StyleCardItem.rub} icon={solid('ruble-sign')} />
                  </p>
                  <p className={StyleCardItem.priceActive}>
                    {el.price}
                    {' '}
                    <FontAwesomeIcon className={StyleCardItem.rub} icon={solid('ruble-sign')} />
                  </p>
                  <p className={StyleCardItem.discount}>
                    Sale
                    {el.discount}
                    %
                  </p>
                </>
              ) : (
                <p className={StyleCardItem.price}>
                  {el.price}
                  {' '}
                  <FontAwesomeIcon className={StyleCardItem.rub} icon={solid('ruble-sign')} />
                </p>
              )}
              <p>{el.wight}</p>
              <p>{el.tags}</p>
              <button
                className={StyleCardItem.btn}
                type="button"
                onClick={() => {
                  onClickAdd(el['_id'], el.price, el.discount, el.pictures, el.name)
                }}
              >
                В корзину
              </button>
              <button
                type="button"
                className={StyleCardItem.link}
                onClick={() => {
                  const id = el['_id']
                  navigate(`/catalog/${id}`)
                  // e.preventDefault()
                }}
              >
                Подробнее о товаре
              </button>
            </div>
          ))}
        </div>
      )
      : null
  )
}
