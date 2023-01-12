/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'

export const SearchContext = React.createContext()

function App() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  const SearchContextData = useMemo(() => ({
    searchValue,
  }), [searchValue])

  const searchContextMethod = useMemo(() => ({
    setSearchValue,
  }), [setSearchValue])

  useEffect(() => {
    if (localStorage.getItem('userToken') === null) {
      navigate('/signin/form')
    } else {
      navigate('/catalog')
    }
  }, [])

  return (
    <div className="container">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <Main>
          <div>
            <Outlet />
          </div>
        </Main>
        <Footer />
      </SearchContext.Provider>
    </div>
  )
}

export default App
export const useSearchContextData = () => useContext(SearchContext)
export const useSearchContextMethod = () => useContext(SearchContext)
