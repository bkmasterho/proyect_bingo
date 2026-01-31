
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useBingo from "../../hooks/useBingo";


export default function CompraCarton1() {

  const costoCarton=250;

  const { register, formState: { errors } } = useFormContext();
  const { cantCartones, setCantCartones } = useBingo();
  const [ totalCostoCartones, setTotalCostoCartones ] = useState(costoCarton)

  const sumarCarton = () => {
    if(cantCartones >= 100) return;
    setCantCartones(cantCartones+1);
  }

  const restarCarton = () => {
    setCantCartones(prev => Math.max(prev - 1, 0));
  }

 
  //Cada vez que cambie la cantidad de cartones multiplico el costo total
  useEffect(() => {
      setTotalCostoCartones(costoCarton * cantCartones);
  }, [cantCartones]);


  console.log("CantCarton", cantCartones);

  return (

        <>
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden h-150">

              <div className="p-4 bg-sky-500 sticky top-0 z-10 mb-3">
                  <h2 className="text-2xl text-slate-900 font-bold uppercase text-center"> Compra tu carton </h2>
              </div>

              <div className="m-5 font-bold text-center">
                  ¿Cuantos cartones?
              </div>   

              <div className="flex gap-2 justify-center mx-auto">
                  <button 
                        type="button"
                        className="px-3 py-2 bg-slate-200 rounded-md hover:bg-slate-300"
                        onClick={() => {
                            sumarCarton();
                        }}
                    >                      
                      +
                  </button>

                  <input
                      type="number"
                      className="w-16 text-center border border-slate-300 rounded-md py-2"
                      value={cantCartones}
                      onChange={(e) => {
                            const value = Number(e.target.value)
                            setCantCartones(value < 0 ? 0 : value)
                        }   
                      }
                        
                    />

                  <button 
                        type="button"
                        className="px-3 py-2 bg-slate-200 rounded-md hover:bg-slate-300"
                        onClick={() => {
                            restarCarton();
                        }}                    
                    >
                      -
                  </button>
              </div>

              <div className="text-center mt-5">
                  <p className="p-2">Total a pagar:</p>
                  <span className="font-bold text-2xl"> Bs {totalCostoCartones} </span>
              </div>

              <div className="max-w-sm mx-auto space-y-4 mb-5">
                  <div>
                      <label className="block mb-1 font-medium text-slate-700">Nombre</label>
                      <input 
                          type="text"
                          className="w-full px-3 py-2 rounded-lg shadow-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                  </div>

                  <div>
                      <label className="block mb-1 font-medium text-slate-700">Teléfono</label>
                      <input 
                          type="tel"
                          className="w-full px-3 py-2 rounded-lg shadow-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                  </div>

                    
              </div>
          </div>

          {
            
            /*

            <button 
                className="w-full py-3 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition">
                Comprar Cartones
            </button>


            <h2>Paso 1: Información personal</h2>

            <div>
              <label>Nombre</label>
              <input {...register("nombre")} />
              {errors.nombre && <p>{errors.nombre.message}</p>}
            </div>

            <div>
              <label>Email</label>
              <input {...register("email")} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            */

          }
      
      </>
  );
}
