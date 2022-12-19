import SeachStyle from './style.module.css'

export function Search() {
  return (
    <div className={SeachStyle.seach}>
      <input placeholder="Поиск" />
    </div>
  )
}
