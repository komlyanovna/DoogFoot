import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { UsersignUp } from './components/UserSignUp/UserSignUp'
import { TextContainerMain } from './components/TextContainerMain/TextContainerMain'
import { User } from './components/UserSignin/UserSignin'
import { CardItems } from './components/CardItem/CardItems'
import { CardDiteil } from './components/CardDiteil/CardDiteil'
import { BasketProduct } from './components/BasketProducts/BasketProdukts'
import { store } from './redux-toolkit/store'

export const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <TextContainerMain />,
      },
      {
        path: '/signup/form',
        element: <UsersignUp />,
      },
      {
        path: '/signIn/form',
        element: <User />,
      },
      {
        path: '/catalog',
        element: <CardItems />,
      },
      {
        path: '/catalog/:id',
        element: <CardDiteil />,
      },
      {
        path: '/basket',
        element: <BasketProduct />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
