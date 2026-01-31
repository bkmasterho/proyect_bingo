import { Outlet } from "react-router-dom"
import Sidebar from "../Components/Sidebar"

export default function Layouts() {
  return (
    <>  
        <Sidebar/>
        <Outlet />
    </>
  )
}
