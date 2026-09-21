import "./BuscarProductos.css";
import { Search } from "lucide-react";

interface BuscarProductosProps {
  categoriaSeleccionada: string;
  onCategoriaChange: (categoria: string) => void;
  textoBusqueda: string;
  onBusquedaChange: (texto: string) => void;
}

const BuscarProductos = ({
  categoriaSeleccionada,
  onCategoriaChange,
  textoBusqueda,
  onBusquedaChange,
}: BuscarProductosProps) => {
  const categorias = [
    "Todas",
    "Electrónica",
    "Ropa y calzado",
    "Alimentos",
    "Hogar",
    "Otros",
  ];

  return (
    <div className="buscar-productos">
      <form
        className="buscar-productos-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search size={20} />

        <input
          type="text"
          placeholder="Buscar producto"
          value={textoBusqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
        />
      </form>

      <div className="categorias-productos">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            type="button"
            className={
              categoriaSeleccionada === categoria
                ? "categoria-producto activa"
                : "categoria-producto"
            }
            onClick={() => onCategoriaChange(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BuscarProductos;