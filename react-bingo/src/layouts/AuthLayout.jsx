import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (

    <> 
        <div>
            Aqui Bingo El llano
        </div>

        <div className="p-10 w-full">
          <Outlet />
        </div>    
    </>

  )
}
