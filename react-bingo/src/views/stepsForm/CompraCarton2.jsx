
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import useBingo from "../../hooks/useBingo";
import ModalCarton from "react-modal";
import Modal from "../../Components/Modal";

export default function CompraCarton2() {

  const { register, formState: { errors } } = useFormContext();
  const { arrCartones, setArrCartones } = useBingo();
  const [ modalAbierto, setModalAbierto ] = useState(false);


  const cartonsSeleccion = (valor) => {

    setArrCartones( prev => {

        //Si ya existe el valor en mi array le lanzo un filtrar para eliminarlo
        if (prev.includes(valor)) {
          return prev.filter(num => num !== valor);
        }

        // Si no está → agregarlo
        return [...prev, valor];
    });

  }

  console.log("arrayCartones", arrCartones)

  let arrNums=[]
  for(let i=0; i<400; i++){
      arrNums.push(i)
  }
  
  console.log("arNumns",arrNums);

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


      {
            /*
              <h2>Paso 2: Dirección</h2>

              <div>
                <label>País</label>
                <input {...register("pais")} />
                {errors.pais && <p>{errors.pais.message}</p>}
              </div>

              <div>
                <label>Ciudad</label>
                <input {...register("ciudad")} />
                {errors.ciudad && <p>{errors.ciudad.message}</p>}
              </div>
            */
        }


    </>
  );
}
