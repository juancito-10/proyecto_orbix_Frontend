import { useEffect, useState } from "react";
import "./CarsProvedor.css";

import proveedoresService, {
  type Proveedor,
} from "../../../services/proveedores.services";

import productosService, {
  type ProductoInventario,
} from "../../../services/productos.services";

import ventasService, {
  type Venta,
} from "../../../services/ventas.services";

const CardsProvedor = () => {
  const [proveedores, setProveedores] =
    useState<Proveedor[]>([]);

  const [productos, setProductos] =
    useState<ProductoInventario[]>([]);

  const [ventas, setVentas] =
    useState<Venta[]>([]);

  const [cargando, setCargando] =
    useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
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
        console.error(
          "Error al cargar datos de proveedores:",
          error
        );
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  /*
   * TOTAL PROVEEDORES
   */
  const totalProveedores =
    proveedores.length;

  /*
   * PROVEEDORES ACTIVOS
   */
  const proveedoresActivos =
    proveedores.filter(
      (proveedor) =>
        proveedor.estado?.toLowerCase() !==
        "inactivo"
    ).length;

  /*
   * PROVEEDORES INACTIVOS
   */
  const proveedoresInactivos =
    proveedores.filter(
      (proveedor) =>
        proveedor.estado?.toLowerCase() ===
        "inactivo"
    ).length;

  /*
   * TOTAL COMPRADO
   */
  let totalComprado = 0;

  proveedores.forEach((proveedor) => {
    const productosProveedor =
      productos.filter(
        (producto) =>
          producto.proveedor
            .toLocaleLowerCase()
            .trim() ===
          proveedor.nombre
            .toLocaleLowerCase()
            .trim()
      );

    const idsProductos = new Set(
      productosProveedor.map(
        (producto) =>
          producto.idProducto
      )
    );

    ventas.forEach((venta) => {
      venta.detalles.forEach(
        (detalle) => {
          if (
            idsProductos.has(
              detalle.idProducto
            )
          ) {
            const producto =
              productosProveedor.find(
                (p) =>
                  p.idProducto ===
                  detalle.idProducto
              );

            if (producto) {
              totalComprado +=
                producto.precioCompra *
                detalle.cantidad;
            }
          }
        }
      );
    });
  });

  /*
   * FORMATO DEL TOTAL
   */
  const totalCompradoFormateado =
    totalComprado.toLocaleString(
      "es-CO"
    );

  if (cargando) {
    return (
      <section className="cards-ventas">

        <div className="card-venta">
          <div className="card-venta-titulo">
            <span className="punto-verde"></span>
            <span>Total proveedores</span>
          </div>

          <h3>...</h3>
        </div>

        <div className="card-venta">
          <div className="card-venta-titulo">
            <span className="punto-azul"></span>
            <span>Activos</span>
          </div>

          <h3>...</h3>
        </div>

        <div className="card-venta">
          <div className="card-venta-titulo">
            <span className="punto-naranja"></span>
            <span>Inactivos</span>
          </div>

          <h3>...</h3>
        </div>

        <div className="card-venta">
          <div className="card-venta-titulo">
            <span className="punto-rojo"></span>
            <span>Total comprado</span>
          </div>

          <h3>$ ...</h3>
        </div>

      </section>
    );
  }

  return (
    <section className="cards-ventas">

      {/* TOTAL PROVEEDORES */}

      <div className="card-venta">

        <div className="card-venta-titulo">
          <span className="punto-verde"></span>

          <span>
            Total proveedores
          </span>
        </div>

        <h3>
          {totalProveedores}
        </h3>

      </div>


      {/* ACTIVOS */}

      <div className="card-venta">

        <div className="card-venta-titulo">
          <span className="punto-azul"></span>

          <span>
            Activos
          </span>
        </div>

        <h3>
          {proveedoresActivos}
        </h3>

      </div>


      {/* INACTIVOS */}

      <div className="card-venta">

        <div className="card-venta-titulo">
          <span className="punto-naranja"></span>

          <span>
            Inactivos
          </span>
        </div>

        <h3>
          {proveedoresInactivos}
        </h3>

      </div>


      {/* TOTAL COMPRADO */}

      <div className="card-venta">

        <div className="card-venta-titulo">
          <span className="punto-rojo"></span>

          <span>
            Total comprado
          </span>
        </div>

        <h3>
          $ {totalCompradoFormateado}
        </h3>

      </div>

    </section>
  );
};

export default CardsProvedor;