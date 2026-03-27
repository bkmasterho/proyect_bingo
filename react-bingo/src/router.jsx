import { createBrowserRouter } from 'react-router-dom'
import FormCompraCartones from './views/FormCompraCartones';
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Inicio from './views/Inicio';
import Login from './views/Login';
import Registro from './views/Registro';
import Botonsito from './views/Botonsito';
import Compras from './views/Compras';
import CartonesListado from './views/CartonesListado';
import CartonesAdmin from './views/CartonesAdmin';
import Compradores from './views/Compradores';
import AdminLayout from './layouts/AdminLayout';
import ComprasPorComprador from './views/ComprasPorComprador';

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

            {
                path: 'cartonesListado',
                element: <CartonesListado/>
            },

        ]
    },

    {
        path:'/auth',
        element: <AuthLayout />,
        children:[
            {
                path:'/auth/login',
                element: <Login />
            },
            {
                path:'/auth/registro',
                element: <Registro />
            }
        ]
    },

    {
       path:'/Botonsito',
       element: <Botonsito />,
    },
    {
        path:'/admin',
        element:<AdminLayout/>,
        children:[
            {   
                index:true,
                element:<Compras/>
            },
            {
                path:'/admin/CartonesAdmin',
                element:<CartonesAdmin/>
            },
            {
                path:'/admin/Compradores',
                element:<Compradores/>
            },
            {
                path: '/admin/Compradores/:id/compras',
                element: <ComprasPorComprador/>
            }

        ]
    }
])


export default router;