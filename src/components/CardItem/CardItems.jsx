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

  // const getCardRender = () => api.getCardItem()
  //   .then((data) => console.log(data))

  // function getCard() {
  //   const { products } = useQuery(
  //     { queryKey: RENDER_CARD, queryFn: getCardRender },
  //   )
  //   return products
  // }

  // const getCard = () => {
  // const { data } = useQuery(
  //   { queryKey: RENDER_CARD, queryFn: getCardRender },
  // )
  // }
  // console.log(data)

  return (
    products
      ? (
        <div className={StyleCardItem.conteinerCard}>
          {products.map((el) => (
            <div className={StyleCardItem.cardItem}>
              <FontAwesomeIcon className={StyleCardItem.icon} icon={regular('heart')} />
              <img src={el.pictures} alt="Фото" />
              <h3 key={el.name.toString()}>{el.name}</h3>
              <p key={el.price.toString()}>
                {el.price}
                {' '}
                <FontAwesomeIcon className={StyleCardItem.rub} icon={solid('ruble-sign')} />
              </p>
              <p className={StyleCardItem.discount} key={el.discount.toString()}>
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
