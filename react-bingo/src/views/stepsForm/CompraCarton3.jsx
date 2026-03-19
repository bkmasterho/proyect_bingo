import useBingo from "../../hooks/useBingo";
import { useFormContext } from "react-hook-form";

export default function CompraCarton3() {

  const { arrCartones, setArrCartones, totalCostoCartones } = useBingo();
  const { register, watch } = useFormContext();
  const imagen = watch("img_compra");

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

              <div className="flex justify-center mt-6">
                <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-100">

                  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    Datos del Pago Móvil
                  </h2>

                  <div className="space-y-2 text-gray-700 text-sm">
                    <p className="flex justify-between">
                      <span className="font-medium">Número:</span>
                      <span>04148595475</span>
                    </p>

                    <p className="flex justify-between">
                      <span className="font-medium">Cédula:</span>
                      <span>21589653</span>
                    </p>

                    <p className="flex justify-between">
                      <span className="font-medium">Banco:</span>
                      <span>Mercantil</span>
                    </p>

                    <p className="flex justify-between">
                      <span className="font-medium">Total:</span>
                      <span>{totalCostoCartones} Bs</span>
                    </p>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subir comprobante de pago
                    </label>

                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 
                    rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-2 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 20v-8m0 0l-4 4m4-4l4 4"/>
                        </svg>

                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Haz click para subir</span> o arrastra la imagen
                        </p>

                        <p className="text-xs text-gray-400">
                          PNG, JPG
                        </p>
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
                          className="mt-4 rounded-lg shadow-md max-h-40 mx-auto"
                        />
                      )}
                  </div>

                </div>
              </div>

        </div>
    </>
  )
}
