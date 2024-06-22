import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { lazy, Suspense } from 'react'
import './assets/styles/global.scss'
import ErrorPage from './pages/ErrorPage'
import Sell from './pages/Sell'
import Root from './routes/root'

const Buy = lazy(() => import('./pages/Buy'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element:
          <Suspense
            fallback={<h1>Loading...</h1>}>
            <Navigate to={'buy'} replace />
          </Suspense>
      },
      {
        path: '/buy',
        element:
          <Suspense
            fallback={<h1>Loading...</h1>}>
            <Buy />
          </Suspense>
      },
      {
        path: '/sell',
        element:
          <Suspense
            fallback={<h1>Loading...</h1>}>
            <Sell />
          </Suspense>
      }
    ]
  }
])

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App