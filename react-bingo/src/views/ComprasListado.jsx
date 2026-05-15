import { useState } from 'react'
import { useForm } from "react-hook-form";
import { sendRequest } from '../helpers/bingoServices'
import CompraTable from "../Components/CompraTable"


export default function ComprasListados() {

    const [compras, setCompras] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = async ({ cedula }) => {

      setLoading(true);
      setError(null);
      setCompras(null);

      try {

        const res = await sendRequest({
          endpoint: '/api/compradores/buscar',
          method: 'post',
          data: { cedula },
        });

        setCompras(res.data ?? []);

      } catch (e) {

        setError(e.message);

      } finally {

        setLoading(false);

      }
    };

    return (
      <div className="p-6 space-y-6">

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="max-w-3xl mx-auto bg-[#fcfcfc] rounded-2xl overflow-hidden shadow-xl border border-black/10">

            {/* Header */}
            <div className="bg-[#1a1b1f] px-6 py-6 text-center">
              <p className="text-[#f6bd0b] text-[10px] tracking-[3px] uppercase mb-1">
                Lotería / Bingo
              </p>
              <h2 className="text-[#fcfcfc] text-2xl font-bold tracking-wide">
                Consulta tus compras
              </h2>
              <span className="block w-10 h-[3px] bg-[#f6bd0b] rounded-full mx-auto mt-3" />
            </div>

            {/* Contenido */}
            <div className="max-w-sm mx-auto px-5 py-8 space-y-5">
              <div>
                <label className="block text-[10px] tracking-[1.5px] uppercase text-[#1a1b1f] font-semibold mb-1.5">
                  Cédula
                </label>
                <input
                  {...register("cedula", { required: "Cédula obligatoria" })}
                  type="text"
                  placeholder="Ej: V-12345678"
                  className="w-full px-4 py-3 rounded-xl border border-black/10 text-[#1a1b1f] text-[15px] bg-[#fcfcfc]
                            outline-none placeholder:text-gray-300 focus:border-[#f6bd0b] focus:ring-2 focus:ring-[#f6bd0b]/20 transition-colors"
                />
                {errors.cedula && (
                  <p className="text-red-500 text-xs mt-1">{errors.cedula.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#f6bd0b] text-[#1a1b1f] text-[15px] font-bold tracking-widest uppercase
                          hover:bg-[#e0ab08] active:scale-[0.98] transition-all"
              >
                Buscar
              </button>
            </div>

          </div>

        </form>

        {/* Estados de carga / error */}
        {loading && <p className="text-center text-gray-500">Cargando...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {/* Tabla de compras */}
        {compras !== null && (
          <CompraTable compras={compras} />
        )}

      </div>
    );

}