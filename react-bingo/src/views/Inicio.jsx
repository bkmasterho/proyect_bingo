
import { useNavigate } from "react-router-dom";

export default function Inicio() {
    const navigate = useNavigate();
  
    return (

      <>
            <div className="flex flex-col md:flex-row justify-center items-center h-screen gap-6 md:gap-30">

            {/* Botón */}
            <button
                className="
                bg-sky-600 hover:bg-sky-500 
                text-white font-bold 
                py-6 px-10 
                text-2xl 
                rounded-xl 
                transition-all duration-300
                shadow-lg
                cursor-pointer
                "
                onClick={() => navigate('/comprarCartones')}
            >
                ¡Compra tu cartón aquí!
            </button>

            {/* Card de ganadores */}
            <div
                className="
                bg-white 
                rounded-2xl 
                shadow-xl 
                p-6 
                w-90
                h-100
                flex flex-col
                "
            >
                <h2 className="text-xl font-semibold mb-3 text-center">Ganadores de la semana</h2>

                <div className="overflow-y-auto space-y-2 pr-2">
                    {[
                        "Carlos Pérez",
                        "María Gómez",
                        "Luis Rodríguez",
                        "Ana Castillo",
                        "Pedro Ramírez",
                        "Lucía Herrera",
                        "Jorge Fernández",
                        "Elena Suárez",
                        "Roberto Díaz",
                        "Manuel Vargas",
                    ].map((nombre, idx) => (
                    <div
                    key={idx}
                    className="bg-gray-100 p-2 rounded-lg shadow-sm"
                    >
                    {nombre}
                    </div>
                ))}
                </div>
            </div>
        </div>
    </>
  )
}
