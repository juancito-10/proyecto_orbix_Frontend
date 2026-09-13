import { X } from "lucide-react";
import "./ModalVerProvedor.css";

import type { Proveedor } from "../../../services/proveedores.services";
import type { ProductoInventario } from "../../../services/productos.services";

interface InformacionProveedor {
  totalComprado: number;
  ordenes: number;
}

interface ModalVerProvedorProps {
  proveedor: Proveedor;
  productos: ProductoInventario[];
  informacion: InformacionProveedor;
  onCerrar: () => void;
}

const ModalVerProvedor = ({
  proveedor,
  productos,
  informacion,
  onCerrar,
}: ModalVerProvedorProps) => {
  const iniciales = proveedor.nombre
    .split(" ")
    .slice(0, 2)
    .map((nombre) => nombre[0])
    .join("")
    .toUpperCase();

  const estado =
    proveedor.estado?.toLowerCase() === "inactivo"
      ? "Inactivo"
      : "Activo";

  const productosProveedor = productos.filter(
    (producto) =>
      producto.proveedor
        ?.toLocaleLowerCase()
        .trim() ===
      proveedor.nombre
        .toLocaleLowerCase()
        .trim()
  );

  return (
    <div
      className="modal-ver-provedor-overlay"
      onClick={onCerrar}
    >
      <div
        className="modal-ver-provedor"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CABECERA */}

        <div className="modal-ver-provedor-header">

          <div>
            <span className="modal-ver-provedor-subtitulo">
              Detalle del proveedor
            </span>

            <div className="modal-ver-provedor-titulo-contenido">

              <div className="modal-ver-provedor-avatar">
                {iniciales}
              </div>

              <div>
                <h2>
                  {proveedor.nombre}
                </h2>

                <span>
                  {proveedor.nit}
                </span>
              </div>

            </div>
          </div>

          <button
            type="button"
            className="modal-ver-provedor-cerrar"
            onClick={onCerrar}
          >
            <X size={27} />
          </button>

        </div>


        {/* INFORMACIÓN */}

        <div className="modal-ver-provedor-grid">

          <div className="modal-ver-provedor-card">

            <span>Contacto</span>

            <strong>
              {proveedor.nombre}
            </strong>

            <small>
              {proveedor.telefono || "-"}
            </small>

          </div>


          <div className="modal-ver-provedor-card">

            <span>Correo electrónico</span>

            <strong>
              {proveedor.correo || "-"}
            </strong>

            <small>
              {proveedor.ciudad || "-"}
            </small>

          </div>


          <div className="modal-ver-provedor-card">

            <span>Ciudad</span>

            <strong>
              {proveedor.ciudad || "-"}
            </strong>

          </div>


          <div className="modal-ver-provedor-card">

            <span>Categoría</span>

          </div>

        </div>


        {/* RESUMEN */}

        <div className="modal-ver-provedor-resumen">

          <div>
            <span>Total comprado</span>

            <strong>
              $
              {" "}
              {informacion.totalComprado.toLocaleString(
                "es-CO"
              )}
            </strong>
          </div>


          <div>
            <span>Órdenes</span>

            <strong>
              {informacion.ordenes}
            </strong>
          </div>


          <div>
            <span>Estado</span>

            <strong
              className={
                estado === "Activo"
                  ? "modal-estado-activo"
                  : "modal-estado-inactivo"
              }
            >
              {estado}
            </strong>
          </div>

        </div>


        {/* PRODUCTOS */}

        <div className="modal-ver-provedor-productos">

          <div className="modal-ver-provedor-productos-header">

            <span>Productos</span>

            <span>
              {productosProveedor.length} producto(s)
            </span>

          </div>


          <div className="modal-ver-provedor-productos-lista">

            {productosProveedor.length > 0 ? (

              productosProveedor.map((producto) => (
                <div
                  className="modal-ver-provedor-producto"
                  key={producto.idProducto}
                >

                  <div>
                    <strong>
                      {producto.nombre}
                    </strong>

                    <small>
                      {producto.categoria}
                    </small>
                  </div>

                  <strong>
                    $
                    {" "}
                    {producto.precioCompra.toLocaleString(
                      "es-CO"
                    )}
                  </strong>

                </div>
              ))

            ) : (

              <div className="modal-ver-provedor-sin-productos">
                Este proveedor no tiene productos registrados.
              </div>

            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default ModalVerProvedor;