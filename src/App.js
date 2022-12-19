import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('userToken') === null) {
      navigate('/signin/form')
    } else {
      navigate('/catalog')
    }
  }, [])

  return (
    <div className="container">
      <Header />
      <Main>
        <div>
          <Outlet />
        </div>
      </Main>
      <Footer />
    </div>
  )
}

export default App
