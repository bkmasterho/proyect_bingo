import { createBrowserRouter } from 'react-router-dom'
import FormCompraCartones from './views/FormCompraCartones';
import Layout from "./layouts/Layout";
import Inicio from './views/Inicio'

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
            }

        ]
    },
])


export default router;