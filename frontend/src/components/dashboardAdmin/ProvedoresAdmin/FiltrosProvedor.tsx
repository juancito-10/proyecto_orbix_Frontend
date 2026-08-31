import { Search } from "lucide-react";
import "./FiltrosProvedor.css";

interface FiltrosClientesProps {
  filtro: string;
  setFiltro: (filtro: string) => void;
  busqueda: string;
  setBusqueda: (busqueda: string) => void;
}

const FiltrosClientes = ({
  filtro,
  setFiltro,
  busqueda,
  setBusqueda,
}: FiltrosClientesProps) => {
  const filtros = ["Todos", "Electrónica", "Ropa y calzado", "Alimentos", "Hogar"];
  return (
    <section className="filtros-provedores">
      <div className="filtros-provedores-contenido">
        <form action="" className="buscar-provedores">
          <Search size={21} />
          <input
            type="text"
            placeholder="Buscar proveedor, contacto o ciudad..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </form>
        <div className="botones-filtros-provedores">
          {filtros.map((nombreFiltro) => (
            <button
              key={nombreFiltro}
              className={filtro === nombreFiltro ? "filtro-provedor-activo" : ""}
              onClick={() => setFiltro(nombreFiltro)}
            >
              {nombreFiltro}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FiltrosClientes;
