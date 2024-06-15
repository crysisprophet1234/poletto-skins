import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home'

import './assets/styles/global.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
])

const App = () => {

  return (
    <RouterProvider router={router} />
  )
}

export default App