import { Outlet } from "react-router-dom"
import Sidebar from "../Components/Sidebar"

export default function Layouts() {
  return (
    <>  
        <Sidebar/>
        
        {/* Contenido */}
        <main className="pt-20 min-h-screen bg-gray-50">
          <Outlet />
        </main>
    </>
  )
}
