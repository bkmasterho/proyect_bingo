
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useBingo from "../../hooks/useBingo";
import ModalCarton from "react-modal";
import Modal from "../../Components/Modal";

export default function CompraCarton2() {

  const { register, setValue, getValues, clearErrors, formState: { errors } } = useFormContext();
  const { cartonesSelect, setCartonesSelect, cartones } = useBingo();
  const [ modalAbierto, setModalAbierto ] = useState(false);
  
  const cartonsSeleccion = (valor) => {

    const cantidadCartones = getValues("cantidadCartones");
  
    console.log("cantidadCartones2", cantidadCartones)

     setCartonesSelect(prev => {

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

      //Regreso mi array que se va guardar en cartonesSelect
      return nuevoArray;
    });

  }

  return (
    <>
        <div className="max-w-3xl mx-auto bg-[#fcfcfc] rounded-2xl shadow-xl border border-black/10 h-150 overflow-y-auto">
          {/* Header */}
          <div className="bg-[#1a1b1f] px-6 py-6 text-center sticky top-0 z-10">
            <p className="text-[#f6bd0b] text-[10px] tracking-[3px] uppercase mb-1">
              Lotería / Bingo
            </p>
            <h2 className="text-[#fcfcfc] text-2xl font-bold tracking-wide">
              Elige tu cartón
            </h2>
            <span className="block w-10 h-[3px] bg-[#f6bd0b] rounded-full mx-auto mt-3" />
          </div>

          {/* Grid de cartones */}
          <div className="grid grid-cols-4 place-items-center gap-3 p-5">
            {cartones.data.map((valor, index) => {

              let numeroCarton=valor.numero_carton;

              const estaSeleccionado = cartonesSelect.includes(numeroCarton);

              return (
                <div className="text-center" key={numeroCarton}>
                  <button
                    type="button"
                    className={`w-14 h-14 flex items-center justify-center rounded-full
                      font-bold text-sm transition-colors shadow-sm
                      ${estaSeleccionado
                        ? "bg-[#f6bd0b] text-[#1a1b1f]"
                        : "bg-[#1a1b1f] text-[#fcfcfc] hover:bg-[#f6bd0b] hover:text-[#1a1b1f]"
                      }`}
                    onClick={() => cartonsSeleccion(numeroCarton)}
                  >
                    {numeroCarton}
                  </button>

                  <button
                      className="mt-1 px-3 py-0.5 text-[10px] tracking-widest uppercase
                                bg-[#1a1b1f] text-[#fcfcfc] rounded-full border border-[#1a1b1f]
                                hover:bg-[#f6bd0b] hover:text-[#1a1b1f] hover:border-[#f6bd0b] transition-colors"
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
          <p className="text-red-500 text-xs mt-2 mx-auto text-center">
            {errors.cartones.message}
          </p>
        )}
      
    </>
  );
}
