import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter(
  [{
    
    children: [
      {
        path: '/',
        element: 
        
          <h1> Simulation Form </h1>   
          
        ,
      },
      {
        path: '/result',
        element: <h1> Simulation Result</h1>,
      },
      {
        path: '/historico',
        element: <h1>Histórico de Simulações</h1>,
      },
    ],
},]
)