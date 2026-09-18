import { useEffect, useState } from "react";
import "./TablaProvedor.css";

import proveedoresService, {
  type Proveedor,
} from "../../../services/proveedores.services";

import productosService, {
  type ProductoInventario,
} from "../../../services/productos.services";

import ventasService, {
  type Venta,
} from "../../../services/ventas.services";

import ModalVerProvedor from "../../dashboardAdmin/ProvedoresAdmin/ModalVerProvedor";
import ModalEditarProvedores from "../../dashboardAdmin/ProvedoresAdmin/ModalEditarProvedores";

interface TablaProvedoresProps {
  filtro: string;
  busqueda: string;
}

const TablaProvedor = ({
  filtro: _filtro,
  busqueda,
}: TablaProvedoresProps) => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);

  const [productos, setProductos] = useState<ProductoInventario[]>([]);

  const [ventas, setVentas] = useState<Venta[]>([]);

  const [cargando, setCargando] = useState(true);

  const [error, setError] = useState("");

  /* Proveedor seleccionado para VER */
  const [proveedorVer, setProveedorVer] =
    useState<Proveedor | null>(null);

  /* Proveedor seleccionado para EDITAR */
  const [proveedorEditar, setProveedorEditar] =
    useState<Proveedor | null>(null);

  /* Cargamos los datos */
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError("");

        const [
          proveedoresData,
          productosData,
          ventasData,
        ] = await Promise.all([
          proveedoresService.obtenerProveedores(),
          productosService.obtenerProductos(),
          ventasService.obtenerVentas(),
        ]);

        setProveedores(proveedoresData);
        setProductos(productosData);
        setVentas(ventasData);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error al cargar los datos.",
        );
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const textoBusqueda = busqueda
    .toLocaleLowerCase()
    .trim();

  /*
   * Busca los productos relacionados
   * con un proveedor.
   */
  const obtenerProductosProveedor = (
    idProveedor: string,
  ) => {
    return productos.filter((producto) => {
      const proveedor = proveedores.find(
        (p) => p.idProveedor === idProveedor,
      );

      if (!proveedor) {
        return false;
      }

      return (
        producto.proveedor
          .toLocaleLowerCase()
          .trim() ===
        proveedor.nombre
          .toLocaleLowerCase()
          .trim()
      );
    });
  };

  /*
   * Calcula la información relacionada
   * con las compras del proveedor.
   *
   * Ya no manejamos categoría aquí.
   */
  const obtenerInformacionProveedor = (
    proveedor: Proveedor,
  ) => {
    const productosProveedor =
      obtenerProductosProveedor(
        proveedor.idProveedor,
      );

    const idsProductos = new Set(
      productosProveedor.map(
        (producto) => producto.idProducto,
      ),
    );

    const ventasProveedor = ventas.filter((venta) =>
      venta.detalles.some((detalle) =>
        idsProductos.has(detalle.idProducto),
      ),
    );

    let totalComprado = 0;

    ventasProveedor.forEach((venta) => {
      venta.detalles.forEach((detalle) => {
        const producto = productosProveedor.find(
          (p) =>
            p.idProducto === detalle.idProducto,
        );

        if (producto) {
          totalComprado +=
            producto.precioCompra *
            detalle.cantidad;
        }
      });
    });

    const oÓrdenes = ventasProveedor.length;

    return {
      totalComprado,
      oÓrdenes,
    };
  };

  /*
   * Filtramos los proveedores únicamente
   * por búsqueda.
   *
   * La categoría ya no pertenece a esta tabla.
   */
  const proveedoresFiltrados =
    proveedores.filter((proveedor) => {
      const coincideBusqueda =
        proveedor.nombre
          .toLocaleLowerCase()
          .includes(textoBusqueda) ||
        proveedor.nit
          .toLocaleLowerCase()
          .includes(textoBusqueda) ||
        (proveedor.telefono || "")
          .toLocaleLowerCase()
          .includes(textoBusqueda) ||
        (proveedor.correo || "")
          .toLocaleLowerCase()
          .includes(textoBusqueda) ||
        (proveedor.ciudad || "")
          .toLocaleLowerCase()
          .includes(textoBusqueda);

      return coincideBusqueda;
    });

  /* Cargando */
  if (cargando) {
    return (
      <section className="tabla-provedores-wrapper">
        <div className="tabla-provedores-contenedor">
          <table className="tabla-provedores">
            <tbody>
              <tr>
                <td
                  colSpan={8}
                  className="provedores-sin-resultados"
                >
                  Cargando proveedores...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  /* Error */
  if (error) {
    return (
      <section className="tabla-provedores-wrapper">
        <div className="tabla-provedores-contenedor">
          <table className="tabla-provedores">
            <tbody>
              <tr>
                <td
                  colSpan={8}
                  className="provedores-sin-resultados"
                >
                  {error}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  /* Tabla */
  return (
    <section className="tabla-provedores-wrapper">
      <div className="tabla-provedores-contenedor">
        <table className="tabla-provedores">
          <thead>
            <tr>
              <th>PROVEEDOR</th>
              <th>CONTACTO</th>
              <th>CIUDAD</th>
              <th>TOTAL COMPRADO</th>
              <th>ÓRDENES</th>
              <th>TELÉFONO</th>
              <th>ESTADO</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {proveedoresFiltrados.map((proveedor) => {
              const informacion =
                obtenerInformacionProveedor(
                  proveedor,
                );

              /* Iniciales */
              const iniciales = proveedor.nombre
                .split(" ")
                .slice(0, 2)
                .map((nombre) => nombre[0])
                .join("")
                .toUpperCase();

              /* Estado */
              const estado =
                proveedor.estado?.toLowerCase() ===
                "inactivo"
                  ? "Inactivo"
                  : "Activo";

              return (
                <tr key={proveedor.idProveedor}>
                  {/* PROVEEDOR */}

                  <td className="provedor-info">
                    <div className="provedor-contenido">
                      <div className="provedor-avatar">
                        {iniciales}
                      </div>

                      <div className="provedor-datos">
                        <span className="provedor-nombre">
                          {proveedor.nombre}
                        </span>

                        <span className="provedor-id">
                          {proveedor.nit}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* CONTACTO */}

                  <td className="contacto-info">
                    <div className="contacto-datos">
                      <span className="contacto-nombre">
                        {proveedor.nombre}
                      </span>

                      <span className="contacto-correo">
                        {proveedor.correo || "-"}
                      </span>
                    </div>
                  </td>

                  {/* CIUDAD */}

                  <td className="ciudad-info">
                    {proveedor.ciudad || "-"}
                  </td>

                  {/* TOTAL COMPRADO */}

                  <td className="compras-info">
                    ${" "}
                    {informacion.totalComprado.toLocaleString(
                      "es-CO",
                    )}
                  </td>

                  {/* ÓRDENES */}

                  <td className="oÓrdenes-info">
                    {informacion.oÓrdenes}
                  </td>

                  {/* TELÉFONO */}

                  <td className="telefono-info">
                    {proveedor.telefono || "-"}
                  </td>

                  {/* ESTADO */}

                  <td className="estado-info">
                    <span
                      className={`estado-badge ${
                        estado === "Activo"
                          ? "estado-activo"
                          : "estado-inactivo"
                      }`}
                    >
                      {estado}
                    </span>
                  </td>

                  {/* BOTONES */}

                  <td className="ver-info">
                    <div className="acciones-proveedor">
                      {/* BOTÓN VER */}

                      <button
                        type="button"
                        className="boton-ver"
                        onClick={() =>
                          setProveedorVer(proveedor)
                        }
                      >
                        Ver
                      </button>

                      {/* BOTÓN EDITAR */}

                      <button
                        type="button"
                        className="boton-editar"
                        onClick={() =>
                          setProveedorEditar(proveedor)
                        }
                      >
                        Editar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {/* SIN RESULTADOS */}

            {proveedoresFiltrados.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="provedores-sin-resultados"
                >
                  No se encontraron proveedores.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* =========================================
            MODAL VER
        ========================================= */}

        {proveedorVer && (
          <ModalVerProvedor
            proveedor={proveedorVer}
            productos={obtenerProductosProveedor(
              proveedorVer.idProveedor,
            )}
            informacion={obtenerInformacionProveedor(
              proveedorVer,
            )}
            onCerrar={() =>
              setProveedorVer(null)
            }
          />
        )}

        {/* =========================================
            MODAL EDITAR
        ========================================= */}

        {proveedorEditar && (
          <ModalEditarProvedores
            proveedor={proveedorEditar}
            onCerrar={() =>
              setProveedorEditar(null)
            }
            onActualizado={(
              proveedorActualizado,
            ) => {
              setProveedores(
                (proveedoresActuales) =>
                  proveedoresActuales.map(
                    (proveedorActual) =>
                      proveedorActual.idProveedor ===
                      proveedorActualizado.idProveedor
                        ? proveedorActualizado
                        : proveedorActual,
                  ),
              );

              setProveedorEditar(null);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default TablaProvedor;