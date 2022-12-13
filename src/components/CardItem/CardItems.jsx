import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { api } from '../customHookApi/CustomHookApi'
import StyleCardItem from './style.module.scss'

export function CardItems() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.getCardItem()
      .then((data) => setProducts(data.products))
  }, [])

  return (
    <>
      {products.map((el) => (
        <div className={StyleCardItem.cardItem}>
          <FontAwesomeIcon className={StyleCardItem.icon} icon={regular('heart')} />
          <img src={el.pictures} alt="Фото" />
          <h3 key={el.name.toString()}>{el.name}</h3>
          <p key={el.price.toString()}>{el.price}</p>
          <p className={StyleCardItem.discount} key={el.discount.toString()}>
            Sale
            {' '}
            {el.discount}
            {' '}
            %
          </p>
          <p>{el.wight}</p>
          <p>{el.tags}</p>
          <button type="button">В корзину</button>
        </div>
      ))}
    </>
  )
}
