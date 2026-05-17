import React from 'react'
import { Outlet } from "react-router-dom"
import Sidebar from '../Components/Sidebar'

export default function AdminLayout() {

  // 🔧 Reemplaza esto con tu contexto/auth real cuando esté listo
  const logueado = true;
  
  return (
     <>
      <Sidebar logueado={logueado}/>

      {/* Contenido */}
      <main className="pt-12 min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  )
}
