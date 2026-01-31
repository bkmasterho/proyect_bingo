import React from 'react'
import useBingo from "../../hooks/useBingo";

export default function CompraCarton3() {

  const { arrCartones, setArrCartones } = useBingo();

  console.log("arCartones", arrCartones)

  return (
    <>
        <div className="max-w-2xl mx-auto rounded-xl shadow-md h-150 overflow-y-auto">

             <div className="p-4 bg-sky-500 sticky top-0 z-10 mb-3">
                  <h2 className="text-2xl text-slate-900 font-bold uppercase text-center"> Paga tu carton </h2>
              </div>

            <h2 className="text-slate-900 font-bold uppercase text-center mt-5"> Cartones Seleccionados </h2>


            <div className="max-w-md mx-auto mt-6 rounded-xl shadow-lg p-4 h-40 overflow-y-auto bg-white">

                <div className="grid grid-cols-6 place-items-center gap-2">
                  {arrCartones.map((valor) => (
                    <div
                      key={valor}
                      className={`w-10 h-10 flex items-center justify-center rounded-full 
                        shadow text-white font-semibold bg-sky-900`}
                    >
                      {valor}
                    </div>
                  ))}
                  </div>
                </div>
            </div>
    
    </>
  )
}
