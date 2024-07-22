import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { lazy, Suspense } from 'react'
import './assets/styles/global.scss'
import { AuthProvider } from './contexts/AuthContex'
import { CartProvider } from './contexts/CartContext'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import Sell from './pages/Sell'
import Root from './routes/root'

const Buy = lazy(() => import('./pages/Buy'))

const router = createBrowserRouter(
  [
    {
      path: '/',
      element:
        <AuthProvider>
          <Root />
        </AuthProvider>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element:
            <Suspense fallback={<h1>Loading...</h1>}>
              <Navigate to={'buy'} replace />
            </Suspense>
        },
        {
          path: '/login',
          element: <Login />,
          errorElement: <ErrorPage />
        },
        {
          path: '/buy',
          element:
            <Suspense fallback={<h1>Loading...</h1>}>
              <CartProvider>
                <Buy />
              </CartProvider>
            </Suspense>
        },
        {
          path: '/sell',
          element:
            <Suspense fallback={<h1>Loading...</h1>}>
              <CartProvider>
                <Sell />
              </CartProvider>
            </Suspense>
        }
      ]
    }
  ],
  {
    basename: '/poletto-skins'
  }
)

const App = () => {

  return (

    <RouterProvider router={router} />

  )
}

export default App