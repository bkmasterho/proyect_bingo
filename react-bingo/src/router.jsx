import { createBrowserRouter } from 'react-router-dom'
import FormCompraCartones from './views/FormCompraCartones';
import Layout from "./layouts/Layout";
import Inicio from './views/Inicio';
import Botonsito from './views/Botonsito';

const router = createBrowserRouter ([

    {
        path:'/',
        element: <Layout />,
        children:[

            {
                index: true,
                element: <Inicio />
            },

            {
                path: 'comprarCartones',
                element: <FormCompraCartones />
            },

        ]
    },

    {
       path:'/Botonsito',
       element: <Botonsito />,
    }
])


export default router;