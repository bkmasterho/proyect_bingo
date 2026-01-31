import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { BingoProvider } from './context/BingoProvider'
import ReactModal from "react-modal";
import router from './router'
import './index.css'

ReactModal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
    <BingoProvider>
        <RouterProvider router={router} />
    </BingoProvider>
)
