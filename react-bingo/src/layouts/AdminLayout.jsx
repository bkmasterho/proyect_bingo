import React from 'react'
import { Outlet } from "react-router-dom"
import AdminSidebar from '../Components/AdminSidebar'

export default function AuthAdmin() {
  return (
    <>  
      <AdminSidebar/>
      <Outlet/>
    </>
  )
}
