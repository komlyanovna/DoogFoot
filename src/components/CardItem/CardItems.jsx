/* eslint-disable dot-notation */
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useQuery } from '@tanstack/react-query'
// import { queryClient } from '../..'
import { useEffect, useState } from 'react'
import { api } from '../customHookApi/CustomHookApi'
import StyleCardItem from './style.module.scss'

// const RENDER_CARD = ['RENDER_CARD']

export function CardItems() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.getCardItem()
      .then((data) => setProducts(data.products))
      .catch((error) => console.error(error.message))
  }, [setProducts])

  return (
    products
      ? (
        <div key={products} className={StyleCardItem.conteinerCard}>
          {products.map((el) => (
            <div className={StyleCardItem.cardItem} key={el['_id']}>
              <FontAwesomeIcon className={StyleCardItem.icon} icon={regular('heart')} />
              <img src={el.pictures} alt="Фото" />
              <h3>{el.name}</h3>
              <p>
                {el.price}
                {' '}
                <FontAwesomeIcon className={StyleCardItem.rub} icon={solid('ruble-sign')} />
              </p>
              <p className={StyleCardItem.discount}>
                Sale
                {el.discount}
                %
              </p>
              <p>{el.wight}</p>
              <p>{el.tags}</p>
              <button type="button">В корзину</button>
            </div>
          ))}
        </div>
      )
      : null
  )
}
