
import { useState, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import useBingo from "../../hooks/useBingo";


export default function CompraCarton1() {

  const costoCarton=250;

  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const { setCantCartones, setTotalCostoCartones } = useBingo();

  // Cantidad cartones viendo con RHF
  const cantidadCartones = watch("cantidadCartones") || 0;

  const sumarCarton = () => {
    if(cantidadCartones >= 100) return;
    setValue("cantidadCartones", cantidadCartones + 1, { shouldValidate: true });
  }

  const restarCarton = () => {
    setValue("cantidadCartones", Math.max(cantidadCartones - 1, 0), { shouldValidate: true });
  }

  const totalCostoCartones = useMemo(() => costoCarton * cantidadCartones, [cantidadCartones]);

  //Sincronizo RHF con el hook global de Cantidad Cartones

  useEffect(() => {
    setCantCartones(cantidadCartones);
    setTotalCostoCartones(totalCostoCartones)
  }, [cantidadCartones, setCantCartones]); //el setCantCartones solo se pasa por reglas de react

  console.log("CantCarton", cantidadCartones);

  return (

        <>
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">

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
                            restarCarton();
                        }}                    
                    >
                      -
                  </button>

                  <input

                      type="number"
                      name='cantidadCartones'
                      className="w-16 text-center border border-slate-300 rounded-md py-2"
                       {...register("cantidadCartones", { required: true, min: 1 })}
                    />

                    <button 
                        type="button"
                        className="px-3 py-2 bg-slate-200 rounded-md hover:bg-slate-300"
                        onClick={() => {
                            sumarCarton();
                        }}
                    >                      
                      +
                    </button>
                </div>

                {errors.cantidadCartones && (
                    <p className="text-red-600 text-sm text-center mt-1">
                        Debes seleccionar al menos un cartón
                    </p>
                )}

              <div className="text-center mt-5">
                  <p className="p-2">Total a pagar:</p>
                  <span className="font-bold text-2xl"> Bs {totalCostoCartones} </span>
              </div>

              <div className="max-w-sm mx-auto space-y-4 mb-5">

                  <div>
                      <label className="block mb-1 font-medium text-slate-700">Nombre</label>
                      <input 
                          {...register("nombre", { required: "Nombre obligatorio" })}
                          name='nombre'
                          type="text"
                          className="w-full px-3 py-2 rounded-lg shadow-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />

                      {errors.nombre && (
                        <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>
                      )}
                  </div>

                  <div>
                      <label className="block mb-1 font-medium text-slate-700">Apellido</label>
                      <input 
                          {...register("apellido", { required: "Apellido obligatorio" })}
                          name='apellido'
                          type="text"
                          className="w-full px-3 py-2 rounded-lg shadow-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />

                      {errors.apellido && (
                        <p className="text-red-600 text-sm mt-1">{errors.apellido.message}</p>
                      )}
                  </div>

                  <div>
                      <label className="block mb-1 font-medium text-slate-700">Cedula</label>
                      <input 
                          {...register("cedula", { required: "Cedula obligatoria" })}
                          name='cedula'
                          type="text"
                          className="w-full px-3 py-2 rounded-lg shadow-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />

                      {errors.cedula && (
                        <p className="text-red-600 text-sm mt-1">{errors.cedula.message}</p>
                      )}
                  </div>

                  <div>
                      <label className="block mb-1 font-medium text-slate-700">Teléfono</label>
                      <input 
                          {...register("telefono", { required: "Telefono Obligatorio" })}
                          name='telefono'
                          type="number"
                          className="w-full px-3 py-2 rounded-lg shadow-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      {errors.telefono && (
                          <p className="text-red-600 text-sm mt-1">{errors.telefono.message}</p>
                       )}
                  </div>

                    
              </div>
          </div>
      
      </>
  );
}
