// Compras.jsx
import useSWR from "swr";
import { sendRequest } from "../helpers/bingoServices";
import CompraTable from "../Components/CompraTable";

const fetcher = (endpoint) => sendRequest({ endpoint, method: "get" });

export default function Compras() {
  const { data, error, isLoading } = useSWR("/api/compras", fetcher);

  if (isLoading) return (
    <div className="flex items-center justify-center h-40">
      <p className="text-[#1a1b1f] font-semibold animate-pulse">Cargando compras...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-40">
      <p className="text-red-500 font-semibold">Error cargando compras</p>
    </div>
  );

  const compras = data?.data ?? [];

  return (
    <div className="p-6 pt-20 w-full">

      {/* Título */}
      <div className="mb-6">
        <p className="text-[10px] tracking-[3px] uppercase text-[#f6bd0b] font-bold mb-1">Admin</p>
        <h1 className="text-2xl font-bold text-[#1a1b1f]">Listado de Compras</h1>
        <span className="block w-10 h-[3px] bg-[#f6bd0b] rounded-full mt-2" />
      </div>

      <CompraTable compras={compras} />
    </div>
  );
}