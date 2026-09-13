import { useEffect, useState } from "react";

import "./RendimientoEquipo.css";

import ventasService, {
  type Venta,
} from "../../../services/ventas.services";

interface Vendedor {
  idUsuario: string;
  iniciales: string;
  nombre: string;
  ventas: number;
  pedidos: number;
  conversion: number;
}

const RendimientoEquipo = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarVentas = async () => {
      try {
        setCargando(true);
        setError("");

        const ventasObtenidas =
          await ventasService.obtenerVentas();

        setVentas(ventasObtenidas);
      } catch (error) {
        console.error(
          "Error al cargar rendimiento del equipo:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "No se pudo cargar el rendimiento del equipo."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarVentas();
  }, []);

  /*
   * SOLAMENTE tomamos las ventas completadas.
   *
   * Las ventas:
   * - canceladas
   * - devueltas
   * - pendientes
   * - en proceso
   *
   * NO se tienen en cuenta para el rendimiento.
   */
  const ventasCompletadas = ventas.filter(
    (venta) => venta.estado === "completada"
  );

  /*
   * Agrupamos únicamente las ventas completadas
   * por usuario/vendedor.
   */
  const rendimientoVendedores: Vendedor[] = Object.values(
    ventasCompletadas.reduce(
      (acumulado, venta) => {
        const idUsuario = venta.usuario.idUsuario;

        if (!acumulado[idUsuario]) {
          acumulado[idUsuario] = {
            idUsuario,
            iniciales: obtenerIniciales(
              venta.usuario.nombre
            ),
            nombre: venta.usuario.nombre,
            ventas: 0,
            pedidos: 0,
            conversion: 0,
          };
        }

        /*
         * Sumamos el total solamente porque
         * esta venta está COMPLETADA.
         */
        acumulado[idUsuario].ventas += Number(
          venta.total
        );

        /*
         * Cada venta completada cuenta como un pedido.
         */
        acumulado[idUsuario].pedidos += 1;

        return acumulado;
      },
      {} as Record<string, Vendedor>
    )
  );

  /*
   * Como aquí solamente tenemos ventas completadas,
   * la conversión queda en 100% para los vendedores
   * que tienen al menos una venta completada.
   */
  rendimientoVendedores.forEach((vendedor) => {
    vendedor.conversion =
      vendedor.pedidos > 0 ? 100 : 0;
  });

  /*
   * Ordenamos de mayor a menor según
   * las ventas totales.
   */
  rendimientoVendedores.sort(
    (a, b) => b.ventas - a.ventas
  );

  /*
   * Estado de carga.
   */
  if (cargando) {
    return (
      <section className="rendimiento-equipo">
        <p>Cargando rendimiento del equipo...</p>
      </section>
    );
  }

  /*
   * Estado de error.
   */
  if (error) {
    return (
      <section className="rendimiento-equipo">
        <p>{error}</p>
      </section>
    );
  }

  /*
   * No hay ventas completadas.
   */
  if (rendimientoVendedores.length === 0) {
    return (
      <section className="rendimiento-equipo">
        <p>
          No hay ventas completadas para mostrar
          el rendimiento del equipo.
        </p>
      </section>
    );
  }

  return (
    <section className="rendimiento-equipo">
      {rendimientoVendedores.map((vendedor) => (
        <div
          className="card-rendimiento"
          key={vendedor.idUsuario}
        >
          <div className="rendimiento-persona">
            <div className="rendimiento-avatar">
              {vendedor.iniciales}
            </div>

            <div className="rendimiento-nombre">
              <h3>{vendedor.nombre}</h3>

              <span>Vendedor</span>
            </div>
          </div>

          <div className="rendimiento-ventas">
            <span>VENTAS TOTALES</span>

            <strong>
              ${" "}
              {vendedor.ventas.toLocaleString(
                "es-CO"
              )}
            </strong>
          </div>

          <div className="rendimiento-estadisticas">
            <div>
              <span>PEDIDOS</span>

              <strong>
                {vendedor.pedidos}
              </strong>
            </div>

            <div>
              <span>CONVERSIÓN</span>

              <strong className="conversion">
                {vendedor.conversion}%
              </strong>
            </div>
          </div>

          <div className="rendimiento-barra">
            <div
              className="rendimiento-barra-progreso"
              style={{
                width: `${vendedor.conversion}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </section>
  );
};

/*
 * Obtiene las iniciales del nombre.
 *
 * Ejemplo:
 * "Ana Torres" -> "AT"
 * "Luis Herrera" -> "LH"
 */
function obtenerIniciales(
  nombre: string
): string {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) =>
      parte.charAt(0).toUpperCase()
    )
    .join("");
}

export default RendimientoEquipo;