import useBingo from "../../hooks/useBingo";
import { useFormContext } from "react-hook-form";

export default function CompraCarton3() {

  const { cartonesSelect, setcartonesSelect, totalCostoCartones } = useBingo();
  const { register, watch } = useFormContext();
  const imagen = watch("img_compra");
  
  return (
    <>
      <div className="max-w-3xl mx-auto bg-[#fcfcfc] rounded-2xl shadow-xl border border-black/10 h-150 overflow-y-auto">

        {/* Header — idéntico al de EligeCarton */}
        <div className="bg-[#1a1b1f] px-6 py-6 text-center sticky top-0 z-10">
          <p className="text-[#f6bd0b] text-[10px] tracking-[3px] uppercase mb-1">
            Lotería / Bingo
          </p>
          <h2 className="text-[#fcfcfc] text-2xl font-bold tracking-wide">
            Paga tu cartón
          </h2>
          <span className="block w-10 h-[3px] bg-[#f6bd0b] rounded-full mx-auto mt-3" />
        </div>

        <div className="p-5 space-y-5">

          {/* Cartones seleccionados */}
          <div>
            <h3 className="text-[#1a1b1f] text-xs font-bold tracking-[3px] uppercase text-center mb-3">
              Cartones Seleccionados
            </h3>
            <div className="bg-[#1a1b1f] rounded-xl p-4 h-40 overflow-y-auto">
              <div className="grid grid-cols-6 place-items-center gap-2">
                {cartonesSelect.map((valor) => (
                  <div
                    key={valor}
                    className="w-10 h-10 flex items-center justify-center rounded-full
                              bg-[#f6bd0b] text-[#1a1b1f] font-bold text-sm shadow"
                  >
                    {valor}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Datos del pago móvil */}
          <div className="bg-[#1a1b1f] rounded-xl p-5">
            <h3 className="text-[#f6bd0b] text-xs font-bold tracking-[3px] uppercase text-center mb-4">
              Datos del Pago Móvil
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Número",  valor: "04148595475" },
                { label: "Cédula",  valor: "21589653"    },
                { label: "Banco",   valor: "Mercantil"   },
                { label: "Total",   valor: `${totalCostoCartones} Bs` },
              ].map(({ label, valor }) => (
                <p key={label} className="flex justify-between">
                  <span className="text-[#fcfcfc]/60 font-medium">{label}</span>
                  <span
                    className={`font-bold ${
                      label === "Total" ? "text-[#f6bd0b]" : "text-[#fcfcfc]"
                    }`}
                  >
                    {valor}
                  </span>
                </p>
              ))}
            </div>
          </div>

          {/* Subir comprobante */}
          <div>
            <label className="block text-[#1a1b1f] text-xs font-bold tracking-[3px] uppercase mb-3">
              Subir comprobante de pago
            </label>

            <label
              className="flex flex-col items-center justify-center w-full h-32
                        border-2 border-dashed border-[#f6bd0b]/50 rounded-xl cursor-pointer
                        bg-[#1a1b1f] hover:border-[#f6bd0b] hover:bg-[#f6bd0b]/5 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-2 text-[#f6bd0b]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M7 16V4m0 0L3 8m4-4l4 4M17 20v-8m0 0l-4 4m4-4l4 4" />
                </svg>
                <p className="text-sm text-[#fcfcfc]/70">
                  <span className="font-semibold text-[#fcfcfc]">Haz click para subir</span> o arrastra la imagen
                </p>
                <p className="text-xs text-[#fcfcfc]/40 mt-1">PNG, JPG</p>
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                {...register("img_compra")}
              />
            </label>

            {imagen?.[0] && (
              <img
                src={URL.createObjectURL(imagen[0])}
                className="mt-4 rounded-xl shadow-md max-h-40 mx-auto object-contain border border-[#f6bd0b]/30"
              />
            )}
          </div>

          {
            /* Botón confirmar 
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase
                          bg-[#f6bd0b] text-[#1a1b1f] border-2 border-[#f6bd0b]
                          hover:bg-[#1a1b1f] hover:text-[#f6bd0b] transition-colors"
              >
                Confirmar pago
              </button>
            */
          }
        </div>
      </div>
    </>
  )
}
