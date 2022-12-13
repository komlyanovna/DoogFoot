import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { UsersignUp } from './components/UserSignUp/UserSignUp'
import { TextContainerMain } from './components/TextContainerMain/TextContainerMain'
import { User } from './components/UserSignin/UserSignin'
import { CardList } from './components/CardList/CardList'

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
        element: <CardList />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
