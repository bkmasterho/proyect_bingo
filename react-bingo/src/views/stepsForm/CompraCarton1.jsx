
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
            <div className="max-w-3xl mx-auto bg-[#fcfcfc] rounded-2xl overflow-hidden shadow-xl border border-black/10">

                {/* Header */}
                <div className="bg-[#1a1b1f] px-6 py-6 text-center">
                <p className="text-[#f6bd0b] text-[10px] tracking-[3px] uppercase mb-1">
                    Lotería / Bingo
                </p>
                <h2 className="text-[#fcfcfc] text-2xl font-bold tracking-wide">
                    Compra tu cartón
                </h2>
                <span className="block w-10 h-[3px] bg-[#f6bd0b] rounded-full mx-auto mt-3" />
                </div>

                {/* Cantidad */}
                <div className="bg-[#1a1b1f] mx-5 mt-5 rounded-xl p-5">
                <p className="text-[#f6bd0b] text-[10px] tracking-[2px] uppercase text-center mb-4">
                    ¿Cuántos cartones?
                </p>
                <div className="flex items-center justify-center gap-5">
                    <button
                        type="button"
                        className="w-11 h-11 rounded-full border-2 border-[#f6bd0b] text-[#f6bd0b] text-2xl font-bold
                                    flex items-center justify-center leading-none
                                    hover:bg-[#f6bd0b] hover:text-[#1a1b1f] transition-colors"
                        onClick={() => { restarCarton(); }}
                    >
                    −
                    </button>

                    <input
                        type="number"
                        name="cantidadCartones"
                        className="w-16 text-center text-[#fcfcfc] bg-transparent text-4xl font-bold border-none outline-none"
                        {...register("cantidadCartones", { required: true, min: 1 })}
                    />

                    <button
                        type="button"
                        className="w-11 h-11 rounded-full border-2 border-[#f6bd0b] text-[#f6bd0b] text-2xl font-bold
                                    flex items-center justify-center leading-none
                                    hover:bg-[#f6bd0b] hover:text-[#1a1b1f] transition-colors"
                        onClick={() => { sumarCarton(); }}
                    >
                    +
                    </button>
                </div>
                </div>

                {errors.cantidadCartones && (
                <p className="text-red-500 text-xs text-center mt-2 px-5">
                    Debes seleccionar al menos un cartón
                </p>
                )}

                {/* Total */}
                <div className="flex items-center justify-between bg-[#f6bd0b]/10 border border-[#f6bd0b] rounded-xl mx-5 mt-5 px-5 py-4">
                <span className="text-sm text-gray-500">Total a pagar</span>
                <span className="text-2xl font-bold text-[#1a1b1f]">
                    <span className="text-sm text-gray-500 mr-1">Bs</span>
                    {totalCostoCartones}
                </span>
                </div>

                {/* Campos */}
                <div className="max-w-sm mx-auto space-y-4 px-5 mt-5 mb-5">

                <div>
                    <label className="block text-[10px] tracking-[1.5px] uppercase text-[#1a1b1f] mb-1.5">Nombre</label>
                    <input
                        {...register("nombre", { required: "Nombre obligatorio" })}
                        name="nombre"
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-black/10 text-[#1a1b1f] text-[15px] bg-[#fcfcfc]
                                outline-none placeholder:text-gray-300 focus:border-[#f6bd0b] focus:ring-2 focus:ring-[#f6bd0b]/20 transition-colors"
                    />

                    {errors.nombre && (
                        <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-[10px] tracking-[1.5px] uppercase text-[#1a1b1f] mb-1.5">Apellido</label>
                    <input
                    {...register("apellido", { required: "Apellido obligatorio" })}
                    name="apellido"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-black/10 text-[#1a1b1f] text-[15px] bg-[#fcfcfc]
                                outline-none placeholder:text-gray-300 focus:border-[#f6bd0b] focus:ring-2 focus:ring-[#f6bd0b]/20 transition-colors"
                    />
                    {errors.apellido && (
                    <p className="text-red-500 text-xs mt-1">{errors.apellido.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-[10px] tracking-[1.5px] uppercase text-[#1a1b1f] mb-1.5">Cédula</label>
                    <input
                    {...register("cedula", { required: "Cedula obligatoria" })}
                    name="cedula"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-black/10 text-[#1a1b1f] text-[15px] bg-[#fcfcfc]
                                outline-none placeholder:text-gray-300 focus:border-[#f6bd0b] focus:ring-2 focus:ring-[#f6bd0b]/20 transition-colors"
                    />
                    {errors.cedula && (
                    <p className="text-red-500 text-xs mt-1">{errors.cedula.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-[10px] tracking-[1.5px] uppercase text-[#1a1b1f] mb-1.5">Teléfono</label>
                    <input
                    {...register("telefono", { required: "Telefono Obligatorio" })}
                    name="telefono"
                    type="number"
                    inputMode="tel"
                    className="w-full px-4 py-3 rounded-xl border border-black/10 text-[#1a1b1f] text-[15px] bg-[#fcfcfc]
                                outline-none placeholder:text-gray-300 focus:border-[#f6bd0b] focus:ring-2 focus:ring-[#f6bd0b]/20 transition-colors"
                    />
                    {errors.telefono && (
                    <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>
                    )}
                </div>
            </div>
        </div>
    </>
  );

}
