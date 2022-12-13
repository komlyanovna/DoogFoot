import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardItems } from '../CardItem/CardItems'
import StyleCardContainer from './style.module.scss'

export function CardList() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/catalog')
  }, [])

  return (
    <div className={StyleCardContainer.card__list}>
      <CardItems />
    </div>

  )
}
