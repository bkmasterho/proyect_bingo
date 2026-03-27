import React from 'react'
import { Outlet } from "react-router-dom"
import AdminSidebar from '../Components/AdminSidebar'

export default function AuthAdmin() {
  return (
     <>
      <AdminSidebar />

      {/* Contenido */}
      <main className="pt-12 min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  )
}
