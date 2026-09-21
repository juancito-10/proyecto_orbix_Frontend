import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import "./FiltrosProvedor.css";

import productosService, {
  type ProductoInventario,
} from "../../../services/productos.services";

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

  const [productos, setProductos] = useState<
    ProductoInventario[]
  >([]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const productosData =
          await productosService.obtenerProductos();

        setProductos(productosData);
      } catch (error) {
        console.error(
          "Error al cargar las categorías:",
          error
        );
      }
    };

    cargarCategorias();
  }, []);

  /*
   * Obtenemos las categorías existentes.
   */
  const categorias = Array.from(
    new Set(
      productos
        .map((producto) =>
          producto.categoria?.trim()
        )
        .filter(
          (categoria): categoria is string =>
            Boolean(categoria)
        )
    )
  );

  /*
   * Todos siempre aparece primero.
   */
  const filtros = [
    "Todos",
    ...categorias,
  ];

  return (
    <section className="filtros-provedores">

      <div className="filtros-provedores-contenido">

        {/* BUSCADOR */}

        <form
          action=""
          className="buscar-provedores"
          onSubmit={(e) =>
            e.preventDefault()
          }
        >
          <Search size={21} />

          <input
            type="text"
            placeholder="Buscar proveedor, contacto o ciudad..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
          />
        </form>

        {/* FILTROS */}

        <div className="botones-filtros-provedores">

          {filtros.map(
            (nombreFiltro) => (
              <button
                type="button"
                key={nombreFiltro}
                className={
                  filtro === nombreFiltro
                    ? "filtro-provedor-activo"
                    : ""
                }
                onClick={() =>
                  setFiltro(
                    nombreFiltro
                  )
                }
              >
                {nombreFiltro}
              </button>
            )
          )}

        </div>

      </div>

    </section>
  );
};

export default FiltrosClientes;