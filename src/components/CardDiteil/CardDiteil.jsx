import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom'
import { api } from '../customHookApi/CustomHookApi'
import styles from './styles.module.scss'
import { addItem } from '../../redux-toolkit/slices/cartSlice/cartSlice'

export const PRODUCT_ID = ['PRODUCT_ID']

const getProductQueryId = (id) => [...PRODUCT_ID, id]

export function CardDiteil() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const onClickAdd = (price, discount, pictures, stock, name) => {
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

  const { data, status, error } = useQuery({
    queryKey: getProductQueryId(id),
    queryFn: ({ signal }) => api.cardId(id, signal).then((res) => res),
    enabled: !!id,
  })
  if (status === 'loading') {
    return <span>Loading...</span>
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
    <div className={styles.container}>
      <div className={styles.conteinerCardId}>
        <img src={data.pictures} alt="Изображение" />
        <h4>
          Название:
        </h4>
        <p>
          {data.name}
        </p>
        <h4>Цена:</h4>
        <p>
          {data.price}
          {' '}
          <FontAwesomeIcon className={styles.rub} icon={solid('ruble-sign')} />
        </p>

        <h4>Товар оценили:</h4>
        {/* {data.likes.map((el) => <p>{el}</p>)} */}
        <p>
          {data.likes.length}
        </p>
      </div>
      <button
        type="button"
        className={styles.btn}
        onClick={() => onClickAdd(data.price, data.discount, data.pictures, data.stock, data.name)}
      >
        В корзину
      </button>
      <FontAwesomeIcon className={styles.icon} icon={regular('heart')}>Нравится</FontAwesomeIcon>
    </div>
  )
}
