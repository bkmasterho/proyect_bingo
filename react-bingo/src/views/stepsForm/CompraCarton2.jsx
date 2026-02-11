
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useBingo from "../../hooks/useBingo";
import ModalCarton from "react-modal";
import Modal from "../../Components/Modal";

export default function CompraCarton2() {

  const { register, setValue, getValues, clearErrors, formState: { errors } } = useFormContext();
  const { arrCartones, setArrCartones } = useBingo();
  const [ modalAbierto, setModalAbierto ] = useState(false);

  
  const cartonsSeleccion = (valor) => {

    const cantidadCartones = getValues("cantidadCartones");
  
    console.log("cantidadCartones2", cantidadCartones)

     setArrCartones(prev => {

      const nuevoArray = prev.includes(valor)
        ? prev.filter(num => num !== valor)
        : [...prev, valor];

      //Guardo en mi RH
      setValue("cartones", nuevoArray, {
        shouldValidate: true,
        shouldDirty: true,
      });

      // Limpiar error si la selección ya coincide
      if (nuevoArray.length === cantidadCartones) {
        clearErrors("cartones");
      }

      //Regreso mi array que se va guardar en arrCartones
      return nuevoArray;
    });

  }

  let arrNums=[]
  for(let i=0; i<400; i++){
      arrNums.push(i)
  }

  return (
    <>
      
      <div className="max-w-2xl mx-auto rounded-xl shadow-md h-150 overflow-y-auto">

      <div className="p-4 bg-sky-500 sticky top-0 z-10 mb-3">
            <h2 className="text-2xl text-slate-900 font-bold uppercase text-center"> Elige tu carton </h2>
      </div>

          <div className="grid grid-cols-4 place-items-center gap-2">
              {arrNums.map((valor, index) => {
                  const estaSeleccionado = arrCartones.includes(valor);

                  return(
                    <div className="text-center" key={valor}>
                      <button
                        type="button"
                        className={`w-12 h-12 flex items-center justify-center rounded-full 
                        shadow cursor-pointer text-white font-semibold transition 
                        ${estaSeleccionado ? "bg-sky-900" : "bg-sky-500 hover:bg-sky-700"}`}

                        onClick={() => cartonsSeleccion(valor)}
                      >
                        {valor}
                      </button>

                      <button 
                        className=""
                        type="button"
                        onClick={() => setModalAbierto(true)}
                      >
                          Ver
                      </button>
                    </div>
                  );
              })}
          </div>
          
        </div>

        {
            <ModalCarton
              isOpen={modalAbierto}
              onRequestClose={() => setModalAbierto(false)}
              className="modal-content"
              overlayClassName="modal-overlay"
              closeTimeoutMS={250}
            >
              <Modal onClose={() => setModalAbierto(false)} />
            </ModalCarton>
        }

            {errors.cartones && (
              <p className="text-red-600 text-sm mt-2 mx-auto">
                {errors.cartones.message}
              </p>
            )}


    </>
  );
}
