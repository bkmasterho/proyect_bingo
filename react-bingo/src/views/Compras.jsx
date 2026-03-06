import useSWR from "swr";
import { sendRequest } from "../helpers/bingoServices";
import CompraTable from "../Components/CompraTable"

const fetcher = (endpoint) =>
  sendRequest({
    endpoint,
    method: "get",
  });

export default function Compras() {
  const { data, error, isLoading } = useSWR("/api/compras", fetcher);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error cargando compras</p>;

  const compras = data?.data ?? [];

  console.log("las Compras", compras);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Compras</h1>

      <CompraTable compras={compras} />
    </div>
  );
}