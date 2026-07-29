import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from './components/layout/RootLayout'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <h1>Simulation Form</h1>,
      },
      {
        path: '/result',
        element: <h1>Simulation Result</h1>,
      },
      {
        path: '/historico',
        element: <h1>Simulation History</h1>,
      },
    ],
  },
])
