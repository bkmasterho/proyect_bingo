import useBingo from "../hooks/useBingo";
import { useState } from "react";
import ModalCarton from "react-modal";
import Modal from "../Components/Modal";

export default function CartonesListado() {

  const [modalAbierto, setModalAbierto] = useState(false);
  const [imgModal, setImgModal] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const { cartones } = useBingo();

  const cartonesFiltrados = busqueda === ""
    ? cartones?.data
    : cartones?.data?.filter(v => String(v.numero_carton).includes(busqueda));

  return (
    <>
      <div className="max-w-4xl mx-auto bg-[#fcfcfc] rounded-2xl shadow-xl border border-black/10 flex flex-col h-[620px]">
        
        {/* Header */}
        <div className="bg-[#1a1b1f] px-6 py-3 text-center rounded-t-2xl shrink-0">
          <h2 className="text-[#fcfcfc] text-lg font-bold tracking-wide">
            Listado de cartones
          </h2>
          <span className="block w-10 h-[2px] bg-[#f6bd0b] rounded-full mx-auto mt-1" />

          <p className="text-center text-base font-bold text-[#fcfcfc] tracking-wide px-6 py-2">
            Visualiza tu cartón <span className="text-[#f6bd0b]">antes de comprar</span>
          </p>
        </div>

        {/* Buscador */}
        <div className="px-5 pt-4 pb-2 shrink-0">
          <input
            type="number"
            placeholder="Número del cartón"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full border border-black/15 rounded-xl px-4 py-2 text-sm text-[#1a1b1f] 
              placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f6bd0b] 
              focus:border-transparent bg-white shadow-sm"
          />
        </div>

        {/* Grid de cartones — scroll aquí adentro */}
        <div className="overflow-y-auto flex-1 px-5 py-3">
          <div className="grid grid-cols-4 place-items-center gap-3">
            {cartonesFiltrados?.length === 0 ? (
              <div className="col-span-4 py-10 text-center text-gray-400 text-sm">
                Cartón no encontrado
              </div>
            ) : (
              cartonesFiltrados?.map((valor) => {
                const numeroCarton = valor.numero_carton;

                return (
                  <div className="text-center" key={numeroCarton}>
                    <button
                      type="button"
                      className="w-14 h-14 flex items-center justify-center rounded-full
                        font-bold text-sm transition-colors shadow-sm
                        bg-[#1a1b1f] text-[#fcfcfc] hover:bg-[#f6bd0b] hover:text-[#1a1b1f]"
                      onClick={() => {
                        setImgModal(valor.img_carton);
                        setModalAbierto(true);
                      }}
                    >
                      {numeroCarton}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Leyenda */}
        <div className="flex items-center justify-center gap-2 py-3 shrink-0 border-t border-black/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
          <span className="text-xs text-gray-500 font-medium">Cartones NO disponibles para este sorteo.</span>
        </div>

      </div>

      <ModalCarton
        isOpen={modalAbierto}
        onRequestClose={() => setModalAbierto(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
        closeTimeoutMS={250}
      >
        <Modal onClose={() => setModalAbierto(false)} imgCarton={imgModal} />
      </ModalCarton>
    </>
  );
}