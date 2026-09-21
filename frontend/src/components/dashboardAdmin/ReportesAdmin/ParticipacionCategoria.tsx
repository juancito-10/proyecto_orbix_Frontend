import { useEffect, useState } from "react";

import ventasService from "../../../services/ventas.services";
import productosService from "../../../services/productos.services";

import "./ParticipacionCategoria.css";

type DatoCategoria = {
  categoria: string;
  porcentaje: number;
  color: string;
};

const COLORES = [
  "#087c9c",
  "#f59e0b",
  "#10b981",
  "#8b5cf6",
  "#94a3b8",
  "#ef4444",
  "#ec4899",
  "#6366f1",
  "#14b8a6",
  "#f97316",
  "#84cc16",
  "#a855f7",
  "#06b6d4",
  "#e11d48",
  "#64748b",
  "#22c55e",
];

const ParticipacionCategoria = () => {
  const [datosCategorias, setDatosCategorias] = useState<
    DatoCategoria[]
  >([]);

  const [cargando, setCargando] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const cargarParticipacionCategorias = async () => {
      try {
        setCargando(true);
        setError("");

        const [ventas, productos] = await Promise.all([
          ventasService.obtenerVentas(),
          productosService.obtenerProductos(),
        ]);

        // Solo tenemos en cuenta las ventas completadas
        const ventasCompletadas = ventas.filter(
          (venta) =>
            venta.estado.toLowerCase() === "completada",
        );

        // Guardamos el dinero vendido por cada categoría
        const ventasPorCategoria: Record<string, number> = {};

        ventasCompletadas.forEach((venta) => {
          venta.detalles.forEach((detalle) => {
            const producto = productos.find(
              (item) =>
                item.idProducto ===
                detalle.producto.idProducto,
            );

            const categoria =
              producto?.categoria || "Otros";

            const subtotal = Number(detalle.subtotal);

            ventasPorCategoria[categoria] =
              (ventasPorCategoria[categoria] || 0) +
              subtotal;
          });
        });

        // Calculamos el total de dinero vendido
        const totalVentas = Object.values(
          ventasPorCategoria,
        ).reduce(
          (total, valor) => total + valor,
          0,
        );

        // Convertimos cada categoría a porcentaje
        const datos = Object.entries(
          ventasPorCategoria,
        )
          .map(([categoria, valor], index) => ({
            categoria,

            porcentaje:
              totalVentas > 0
                ? Math.round(
                    (valor / totalVentas) * 100,
                  )
                : 0,

            color:
              COLORES[index % COLORES.length],
          }))
          .filter(
            (dato) => dato.porcentaje > 0,
          )
          .sort(
            (a, b) =>
              b.porcentaje - a.porcentaje,
          );

        setDatosCategorias(datos);
      } catch (error) {
        console.error(
          "Error al cargar la participación por categoría:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "No se pudo cargar la participación por categoría.",
        );
      } finally {
        setCargando(false);
      }
    };

    cargarParticipacionCategorias();
  }, []);

  return (
    <section className="participacion-categoria">

      <div className="participacion-categoria-titulo">
        <h3>Participación por categoría</h3>

        <p>
          Distribución del volumen de ventas
        </p>
      </div>

      {cargando && (
        <div
          style={{
            marginTop: "20px",
            color: "#58708c",
            fontSize: "14px",
          }}
        >
          Cargando datos...
        </div>
      )}

      {!cargando && error && (
        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            borderRadius: "10px",
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {!cargando &&
        !error &&
        datosCategorias.length === 0 && (
          <div
            style={{
              marginTop: "20px",
              color: "#58708c",
              fontSize: "14px",
            }}
          >
            No hay ventas completadas.
          </div>
        )}

      {!cargando &&
        !error &&
        datosCategorias.length > 0 && (
          <div className="participacion-categoria-lista">

            {datosCategorias.map((dato) => (
              <div
                className="participacion-categoria-item"
                key={dato.categoria}
              >

                <div className="participacion-categoria-info">

                  <span className="participacion-categoria-nombre">
                    {dato.categoria}
                  </span>

                  <span className="participacion-categoria-porcentaje">
                    {dato.porcentaje}%
                  </span>

                </div>

                <div className="participacion-categoria-barra-fondo">

                  <div
                    className="participacion-categoria-barra"
                    style={{
                      width: `${dato.porcentaje}%`,
                      backgroundColor: dato.color,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>
        )}

    </section>
  );
};

export default ParticipacionCategoria;