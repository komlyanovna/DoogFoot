import { api } from '../customHookApi/CustomHookApi'
// import { Outlet, Link } from 'react-router-dom'

export async function loader() {
  const apiToUser = await api()
  return { apiToUser }
}
