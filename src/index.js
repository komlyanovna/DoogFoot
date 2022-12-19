import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { UsersignUp } from './components/UserSignUp/UserSignUp'
import { TextContainerMain } from './components/TextContainerMain/TextContainerMain'
import { User } from './components/UserSignin/UserSignin'
import { CardItems } from './components/CardItem/CardItems'

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
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
