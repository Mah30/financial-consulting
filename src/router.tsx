import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from './components/layout/RootLayout'
import { SimulationFormPage } from './pages/SimulationFormPage'



export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <SimulationFormPage />,
      },
      {
        path: '/result/:id',
        element: <h1>Simulation Result</h1>,
      },
      {
        path: '/history',
        element: <h1>Simulation History</h1>,
      },
    ],
  },
])
