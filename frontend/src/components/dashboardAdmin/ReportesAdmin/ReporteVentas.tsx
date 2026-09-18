import { useEffect, useState } from "react";
import { ArrowLeft, Download } from "lucide-react";
import jsPDF from "jspdf";

import ventasService, {
  type Venta,
} from "../../../services/ventas.services";

import "./ReporteVentas.css";

type ReporteVentasProps = {
  onVolver: () => void;
};

type Periodo =
  | "Semanal"
  | "Mensual"
  | "Anual"
  | "Personalizado";

const ReporteVentas = ({ onVolver }: ReporteVentasProps) => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [periodo, setPeriodo] =
    useState<Periodo>("Semanal");

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarVentas = async () => {
      try {
        setCargando(true);
        setError("");

        const data =
          await ventasService.obtenerVentas();

        setVentas(data);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Error al cargar las ventas.",
        );
      } finally {
        setCargando(false);
      }
    };

    cargarVentas();
  }, []);

  const ventasFiltradas = ventas.filter((venta) => {
    const fechaVenta = new Date(venta.fecha);

    if (Number.isNaN(fechaVenta.getTime())) {
      return false;
    }

    const ahora = new Date();

    if (periodo === "Semanal") {
      const inicioSemana = new Date(ahora);

      const diaSemana = ahora.getDay();

      const diferenciaLunes =
        diaSemana === 0 ? 6 : diaSemana - 1;

      inicioSemana.setDate(
        ahora.getDate() - diferenciaLunes,
      );

      inicioSemana.setHours(0, 0, 0, 0);

      const finSemana = new Date(inicioSemana);

      finSemana.setDate(
        inicioSemana.getDate() + 6,
      );

      finSemana.setHours(
        23,
        59,
        59,
        999,
      );

      return (
        fechaVenta >= inicioSemana &&
        fechaVenta <= finSemana
      );
    }

    if (periodo === "Mensual") {
      const inicioMes = new Date(
        ahora.getFullYear(),
        ahora.getMonth(),
        1,
      );

      inicioMes.setHours(0, 0, 0, 0);

      const finMes = new Date(
        ahora.getFullYear(),
        ahora.getMonth() + 1,
        0,
      );

      finMes.setHours(
        23,
        59,
        59,
        999,
      );

      return (
        fechaVenta >= inicioMes &&
        fechaVenta <= finMes
      );
    }

    if (periodo === "Anual") {
      const inicioAno = new Date(
        ahora.getFullYear(),
        0,
        1,
      );

      inicioAno.setHours(0, 0, 0, 0);

      const finAno = new Date(
        ahora.getFullYear(),
        11,
        31,
      );

      finAno.setHours(
        23,
        59,
        59,
        999,
      );

      return (
        fechaVenta >= inicioAno &&
        fechaVenta <= finAno
      );
    }

    if (periodo === "Personalizado") {
      if (!fechaInicio || !fechaFin) {
        return false;
      }

      const inicio = new Date(
        `${fechaInicio}T00:00:00`,
      );

      const fin = new Date(
        `${fechaFin}T23:59:59`,
      );

      return (
        fechaVenta >= inicio &&
        fechaVenta <= fin
      );
    }

    return true;
  });

  const totalVendido =
    ventasFiltradas.reduce((total, venta) => {
      return total + Number(venta.total);
    }, 0);

  const totalVentas =
    ventasFiltradas.length;

  const ventaPromedio =
    totalVentas > 0
      ? totalVendido / totalVentas
      : 0;

  const ventasCompletadas =
    ventasFiltradas.filter((venta) => {
      const estado =
        venta.estado
          .toLowerCase()
          .trim();

      return (
        estado === "completada" ||
        estado === "completado" ||
        estado === "pagada" ||
        estado === "pago"
      );
    }).length;

  const formatoDinero = (
    valor: number,
  ) => {
    return new Intl.NumberFormat(
      "es-CO",
      {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      },
    ).format(valor);
  };

  const formatoFecha = (
    fecha: string,
  ) => {
    const fechaFormateada =
      new Date(fecha);

    if (
      Number.isNaN(
        fechaFormateada.getTime(),
      )
    ) {
      return fecha;
    }

    return fechaFormateada.toLocaleDateString(
      "es-CO",
    );
  };

  const obtenerTextoPeriodo = () => {
    if (periodo === "Semanal") {
      return "Semana actual";
    }

    if (periodo === "Mensual") {
      return "Mes actual";
    }

    if (periodo === "Anual") {
      return "Año actual";
    }

    if (
      periodo === "Personalizado" &&
      fechaInicio &&
      fechaFin
    ) {
      return `${fechaInicio
        .split("-")
        .reverse()
        .join("/")} - ${fechaFin
        .split("-")
        .reverse()
        .join("/")}`;
    }

    return "Período personalizado";
  };

  const exportarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Reporte de Ventas",
      20,
      20,
    );

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(
      "Análisis completo de óÓrdenes y facturación",
      20,
      29,
    );

    doc.setFontSize(10);

    doc.text(
      `Período: ${obtenerTextoPeriodo()}`,
      20,
      38,
    );

    doc.line(
      20,
      44,
      190,
      44,
    );

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Resumen",
      20,
      55,
    );

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    doc.text(
      `Total vendido: ${formatoDinero(totalVendido)}`,
      20,
      64,
    );

    doc.text(
      `Total de ventas: ${totalVentas}`,
      20,
      72,
    );

    doc.text(
      `Venta promedio: ${formatoDinero(ventaPromedio)}`,
      20,
      80,
    );

    doc.text(
      `Ventas completadas: ${ventasCompletadas}`,
      20,
      88,
    );

    let y = 102;

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Ventas del período",
      20,
      y,
    );

    y += 10;

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");

    doc.text("Código", 20, y);
    doc.text("Fecha", 48, y);
    doc.text("Cliente", 75, y);
    doc.text("Pago", 120, y);
    doc.text("Estado", 145, y);
    doc.text("Total", 175, y);

    y += 5;

    doc.line(
      20,
      y,
      190,
      y,
    );

    y += 7;

    if (ventasFiltradas.length === 0) {
      doc.setFont("helvetica", "normal");

      doc.text(
        "No hay ventas registradas para este período.",
        20,
        y,
      );
    }

    ventasFiltradas.forEach(
      (venta) => {
        if (y > 275) {
          doc.addPage();

          y = 20;

          doc.setFontSize(8);
          doc.setFont(
            "helvetica",
            "bold",
          );

          doc.text(
            "Código",
            20,
            y,
          );

          doc.text(
            "Fecha",
            48,
            y,
          );

          doc.text(
            "Cliente",
            75,
            y,
          );

          doc.text(
            "Pago",
            120,
            y,
          );

          doc.text(
            "Estado",
            145,
            y,
          );

          doc.text(
            "Total",
            175,
            y,
          );

          y += 8;
        }

        doc.setFont(
          "helvetica",
          "normal",
        );

        const codigo =
          venta.codigoVenta
            ?.substring(0, 14) ||
          "-";

        const cliente =
          venta.cliente?.nombre
            ?.substring(0, 20) ||
          "Sin cliente";

        const metodoPago =
          venta.metodoPago
            ?.substring(0, 12) ||
          "-";

        const estado =
          venta.estado
            ?.substring(0, 12) ||
          "-";

        doc.text(
          codigo,
          20,
          y,
        );

        doc.text(
          formatoFecha(
            venta.fecha,
          ),
          48,
          y,
        );

        doc.text(
          cliente,
          75,
          y,
        );

        doc.text(
          metodoPago,
          120,
          y,
        );

        doc.text(
          estado,
          145,
          y,
        );

        doc.text(
          formatoDinero(
            Number(venta.total),
          ),
          175,
          y,
        );

        y += 8;

        doc.setDrawColor(
          220,
          225,
          230,
        );

        doc.line(
          20,
          y - 3,
          190,
          y - 3,
        );
      },
    );

    const paginas =
      doc.getNumberOfPages();

    for (
      let pagina = 1;
      pagina <= paginas;
      pagina++
    ) {
      doc.setPage(pagina);

      doc.setFontSize(8);
      doc.setFont(
        "helvetica",
        "normal",
      );

      doc.text(
        `Reporte generado por Orbix · Página ${pagina} de ${paginas}`,
        20,
        290,
      );
    }

    const fechaArchivo =
      new Date()
        .toISOString()
        .split("T")[0];

    doc.save(
      `reporte-ventas-${fechaArchivo}.pdf`,
    );
  };

  return (
    <section className="reporte-ventas">

      <div className="reporte-ventas-header">

        <button
          className="reporte-ventas-volver"
          onClick={onVolver}
        >
          <ArrowLeft size={20} />

          Volver a reportes
        </button>

        <div>
          <h3>
            Reporte de Ventas
          </h3>

          <p>
            Análisis completo de óÓrdenes y facturación
          </p>
        </div>

      </div>

      <div className="reporte-ventas-periodos">

        <div className="reporte-ventas-periodos-botones">

          <button
            className={
              periodo === "Semanal"
                ? "periodo-activo"
                : ""
            }
            onClick={() =>
              setPeriodo("Semanal")
            }
          >
            Semanal
          </button>

          <button
            className={
              periodo === "Mensual"
                ? "periodo-activo"
                : ""
            }
            onClick={() =>
              setPeriodo("Mensual")
            }
          >
            Mensual
          </button>

          <button
            className={
              periodo === "Anual"
                ? "periodo-activo"
                : ""
            }
            onClick={() =>
              setPeriodo("Anual")
            }
          >
            Anual
          </button>

          <button
            className={
              periodo === "Personalizado"
                ? "periodo-activo"
                : ""
            }
            onClick={() =>
              setPeriodo("Personalizado")
            }
          >
            Personalizado
          </button>

        </div>

        <button
          className="reporte-ventas-pdf"
          onClick={exportarPDF}
          disabled={cargando}
        >
          <Download size={18} />

          Descargar PDF
        </button>

      </div>

      {periodo === "Personalizado" && (
        <div className="reporte-ventas-fechas">

          <div className="reporte-ventas-fecha">

            <label>
              Fecha inicial
            </label>

            <input
              type="date"
              value={fechaInicio}
              onChange={(e) =>
                setFechaInicio(
                  e.target.value,
                )
              }
            />

          </div>

          <div className="reporte-ventas-fecha">

            <label>
              Fecha final
            </label>

            <input
              type="date"
              value={fechaFin}
              min={fechaInicio || undefined}
              onChange={(e) =>
                setFechaFin(
                  e.target.value,
                )
              }
            />

          </div>

        </div>
      )}

      {cargando && (
        <div className="reporte-ventas-cargando">
          Cargando ventas...
        </div>
      )}

      {!cargando && error && (
        <div className="reporte-ventas-error">
          {error}
        </div>
      )}

      {!cargando && !error && (
        <>

          <div className="reporte-ventas-resumen">

            <div className="reporte-ventas-card">

              <span>
                Total vendido
              </span>

              <strong>
                {formatoDinero(
                  totalVendido,
                )}
              </strong>

            </div>

            <div className="reporte-ventas-card">

              <span>
                Total de ventas
              </span>

              <strong>
                {totalVentas}
              </strong>

            </div>

            <div className="reporte-ventas-card">

              <span>
                Venta promedio
              </span>

              <strong>
                {formatoDinero(
                  ventaPromedio,
                )}
              </strong>

            </div>

            <div className="reporte-ventas-card">

              <span>
                Ventas completadas
              </span>

              <strong>
                {ventasCompletadas}
              </strong>

            </div>

          </div>

          <div className="reporte-ventas-contenido">

            <h4>
              Ventas del período
            </h4>

            <p>
              Se encontraron{" "}
              <strong>
                {totalVentas}
              </strong>{" "}
              ventas en el período{" "}
              <strong>
                {periodo.toLowerCase()}
              </strong>
              .
            </p>

            {ventasFiltradas.length > 0 && (

              <div className="tabla-ventas-reporte">

                <table>

                  <thead>

                    <tr>
                      <th>Código</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Método de pago</th>
                      <th>Estado</th>
                      <th>Total</th>
                    </tr>

                  </thead>

                  <tbody>

                    {ventasFiltradas.map(
                      (venta) => (

                        <tr
                          key={
                            venta.idVenta
                          }
                        >

                          <td>
                            {
                              venta.codigoVenta
                            }
                          </td>

                          <td>
                            {formatoFecha(
                              venta.fecha,
                            )}
                          </td>

                          <td>
                            {venta.cliente
                              ?.nombre ||
                              "Sin cliente"}
                          </td>

                          <td>
                            {venta.metodoPago ||
                              "No registrado"}
                          </td>

                          <td>
                            {venta.estado}
                          </td>

                          <td>
                            {formatoDinero(
                              Number(
                                venta.total,
                              ),
                            )}
                          </td>

                        </tr>

                      ),
                    )}

                  </tbody>

                </table>

              </div>

            )}

            {ventasFiltradas.length === 0 && (

              <div className="ventas-sin-datos">

                No hay ventas registradas
                para este período.

              </div>

            )}

          </div>

        </>
      )}

    </section>
  );
};

export default ReporteVentas;