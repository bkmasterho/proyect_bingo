
import { useNavigate } from "react-router-dom";

export default function Inicio() {
    const navigate = useNavigate();
  
    return (
            <>
            <div className="flex flex-col md:flex-row justify-center items-center h-screen gap-6 md:gap-30">

                {/* Botón */}
                <button
                className="
                    bg-[#f6bd0b] hover:opacity-90
                    text-[#1a1b1f] font-bold
                    py-6 px-10
                    text-2xl
                    rounded-xl
                    transition-all duration-300
                    shadow-[0_4px_20px_rgba(246,189,11,0.35)]
                    cursor-pointer
                    hover:-translate-y-0.5
                "
                onClick={() => navigate('/comprarCartones')}
                >
                ¡Compra tu cartón aquí!
                </button>

                {/* Card de ganadores */}
                <div className="
                bg-white
                border border-[#f6bd0b]/30
                rounded-2xl
                shadow-xl
                p-6
                w-90 h-100
                flex flex-col
                ">
                <div className="text-center mb-4">
                    <p className="text-[10px] font-bold tracking-[2px] uppercase text-[#f6bd0b]">Esta semana</p>
                    <h2 className="text-lg font-semibold text-[#1a1b1f]">Ganadores</h2>
                </div>

                <div className="overflow-y-auto space-y-2 pr-1 flex-1">
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
                        className="
                        bg-[#f6bd0b]/10
                        border border-[#f6bd0b]/25
                        border-l-[3px] border-l-[#f6bd0b]
                        p-2.5 px-3
                        rounded-lg
                        flex items-center gap-3
                        "
                    >
                        <span className="text-[11px] font-bold text-[#f6bd0b] min-w-[18px]">#{idx + 1}</span>
                        <span className="text-sm font-medium text-[#1a1b1f]">{nombre}</span>
                        {idx === 0 && <span className="ml-auto text-sm">🏆</span>}
                        {idx === 1 && <span className="ml-auto text-sm">🥈</span>}
                        {idx === 2 && <span className="ml-auto text-sm">🥉</span>}
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </>
    )
}
