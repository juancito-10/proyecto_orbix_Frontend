import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Download } from "lucide-react";
import jsPDF from "jspdf";

import ventasService, {
  type Venta,
} from "../../../services/ventas.services";

import productosService, {
  type ProductoInventario,
} from "../../../services/productos.services";

import "./ReporteFinanciero.css";

type ReporteFinancieroProps = {
  onVolver: () => void;
};

type Periodo = "Semana" | "Mes" | "Personalizado";

type GananciaProducto = {
  idProducto: string;
  nombre: string;
  cantidad: number;
  ventas: number;
  ganancia: number;
};

const ReporteFinanciero = ({
  onVolver,
}: ReporteFinancieroProps) => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [productos, setProductos] = useState<
    ProductoInventario[]
  >([]);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [periodo, setPeriodo] =
    useState<Periodo>("Semana");

  const [fechaInicio, setFechaInicio] =
    useState("");

  const [fechaFin, setFechaFin] =
    useState("");

  /* =========================
     CARGAR INFORMACIÓN
  ========================= */

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError("");

        const [ventasData, productosData] =
          await Promise.all([
            ventasService.obtenerVentas(),
            productosService.obtenerProductos(),
          ]);

        setVentas(ventasData);
        setProductos(productosData);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Error al cargar la información financiera."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  /* =========================
     PRODUCTOS POR ID
  ========================= */

  const productosPorId = useMemo(() => {
    const mapa = new Map<
      string,
      ProductoInventario
    >();

    productos.forEach((producto) => {
      mapa.set(
        producto.idProducto,
        producto
      );
    });

    return mapa;
  }, [productos]);

  /* =========================
     FILTRAR VENTAS
  ========================= */

  const ventasFiltradas = useMemo(() => {
    const ahora = new Date();

    return ventas.filter((venta) => {
      const estado =
        venta.estado?.toLowerCase();

      if (
        estado &&
        estado !== "completada" &&
        estado !== "completado"
      ) {
        return false;
      }

      const fechaVenta =
        new Date(venta.fecha);

      if (Number.isNaN(fechaVenta.getTime())) {
        return false;
      }

      /* SEMANA */

      if (periodo === "Semana") {
        const dia =
          ahora.getDay();

        const diferencia =
          dia === 0 ? 6 : dia - 1;

        const inicioSemana =
          new Date(ahora);

        inicioSemana.setDate(
          ahora.getDate() - diferencia
        );

        inicioSemana.setHours(
          0,
          0,
          0,
          0
        );

        const finSemana =
          new Date(inicioSemana);

        finSemana.setDate(
          inicioSemana.getDate() + 6
        );

        finSemana.setHours(
          23,
          59,
          59,
          999
        );

        return (
          fechaVenta >= inicioSemana &&
          fechaVenta <= finSemana
        );
      }

      /* MES */

      if (periodo === "Mes") {
        return (
          fechaVenta.getMonth() ===
            ahora.getMonth() &&
          fechaVenta.getFullYear() ===
            ahora.getFullYear()
        );
      }

      /* PERSONALIZADO */

      if (
        periodo === "Personalizado" &&
        fechaInicio &&
        fechaFin
      ) {
        const inicio =
          new Date(
            `${fechaInicio}T00:00:00`
          );

        const fin =
          new Date(
            `${fechaFin}T23:59:59`
          );

        return (
          fechaVenta >= inicio &&
          fechaVenta <= fin
        );
      }

      return true;
    });
  }, [
    ventas,
    periodo,
    fechaInicio,
    fechaFin,
  ]);

  /* =========================
     GANANCIA POR PRODUCTO
  ========================= */

  const gananciasPorProducto =
    useMemo(() => {
      const mapa = new Map<
        string,
        GananciaProducto
      >();

      ventasFiltradas.forEach(
        (venta) => {
          venta.detalles.forEach(
            (detalle) => {
              const producto =
                productosPorId.get(
                  detalle.idProducto
                );

              const precioVenta =
                Number(
                  detalle.precioUnitario
                );

              const cantidad =
                Number(
                  detalle.cantidad
                );

              const precioCompra =
                producto
                  ? Number(
                      producto.precioCompra
                    )
                  : 0;

              const ventaTotal =
                precioVenta *
                cantidad;

              const ganancia =
                (precioVenta -
                  precioCompra) *
                cantidad;

              const existente =
                mapa.get(
                  detalle.idProducto
                );

              if (existente) {
                existente.cantidad +=
                  cantidad;

                existente.ventas +=
                  ventaTotal;

                existente.ganancia +=
                  ganancia;
              } else {
                mapa.set(
                  detalle.idProducto,
                  {
                    idProducto:
                      detalle.idProducto,

                    nombre:
                      detalle.producto
                        ?.nombre ||
                      producto?.nombre ||
                      "Producto",

                    cantidad,

                    ventas:
                      ventaTotal,

                    ganancia,
                  }
                );
              }
            }
          );
        }
      );

      return Array.from(
        mapa.values()
      ).sort(
        (a, b) =>
          b.ganancia -
          a.ganancia
      );
    }, [
      ventasFiltradas,
      productosPorId,
    ]);

  /* =========================
     MÉTRICAS
  ========================= */

  const totalVentas =
    ventasFiltradas.reduce(
      (total, venta) =>
        total +
        Number(venta.total || 0),
      0
    );

  const totalUnidades =
    ventasFiltradas.reduce(
      (total, venta) =>
        total +
        venta.detalles.reduce(
          (subtotal, detalle) =>
            subtotal +
            Number(
              detalle.cantidad
            ),
          0
        ),
      0
    );

  const gananciaBruta =
    gananciasPorProducto.reduce(
      (total, producto) =>
        total +
        producto.ganancia,
      0
    );

  /* =========================
     FORMATO MONEDA
  ========================= */

  const formatoMoneda = (
    valor: number
  ) => {
    return new Intl.NumberFormat(
      "es-CO",
      {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      }
    ).format(valor);
  };

  /* =========================
     FORMATO PERIODO
  ========================= */

  const obtenerTextoPeriodo =
    () => {
      if (periodo === "Semana") {
        return "Semana actual";
      }

      if (periodo === "Mes") {
        return "Mes actual";
      }

      if (
        periodo === "Personalizado" &&
        fechaInicio &&
        fechaFin
      ) {
        return `${fechaInicio} al ${fechaFin}`;
      }

      return "Período personalizado";
    };

  /* =========================
     EXPORTAR PDF
  ========================= */

  const exportarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "Reporte Financiero",
      20,
      20
    );

    doc.setFontSize(11);
    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      "Ganancias y rendimiento financiero",
      20,
      29
    );

    doc.setFontSize(10);

    doc.text(
      `Período: ${obtenerTextoPeriodo()}`,
      20,
      38
    );

    doc.text(
      `Fecha de generación: ${new Date().toLocaleDateString(
        "es-CO"
      )}`,
      20,
      45
    );

    doc.line(
      20,
      51,
      190,
      51
    );

    /* RESUMEN */

    doc.setFontSize(13);
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "Resumen financiero",
      20,
      62
    );

    doc.setFontSize(10);
    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      `Ventas totales: ${formatoMoneda(
        totalVentas
      )}`,
      20,
      72
    );

    doc.text(
      `Ganancia bruta: ${formatoMoneda(
        gananciaBruta
      )}`,
      20,
      80
    );

    doc.text(
      `Ventas realizadas: ${ventasFiltradas.length}`,
      20,
      88
    );

    doc.text(
      `Unidades vendidas: ${totalUnidades}`,
      20,
      96
    );

    /* PRODUCTOS */

    let y = 110;

    doc.setFontSize(13);
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "Ganancia por producto",
      20,
      y
    );

    y += 10;

    doc.setFontSize(8);
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "Producto",
      15,
      y
    );

    doc.text(
      "Cantidad",
      82,
      y
    );

    doc.text(
      "Ventas",
      110,
      y
    );

    doc.text(
      "Ganancia",
      140,
      y
    );

    doc.text(
      "Margen",
      175,
      y
    );

    y += 5;

    doc.line(
      15,
      y,
      195,
      y
    );

    y += 7;

    if (
      gananciasPorProducto.length ===
      0
    ) {
      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.text(
        "No hay información financiera para este período.",
        20,
        y
      );
    }

    gananciasPorProducto.forEach(
      (producto) => {
        if (y > 275) {
          doc.addPage();

          y = 20;

          doc.setFontSize(8);
          doc.setFont(
            "helvetica",
            "bold"
          );

          doc.text(
            "Producto",
            15,
            y
          );

          doc.text(
            "Cantidad",
            82,
            y
          );

          doc.text(
            "Ventas",
            110,
            y
          );

          doc.text(
            "Ganancia",
            140,
            y
          );

          doc.text(
            "Margen",
            175,
            y
          );

          y += 8;
        }

        doc.setFont(
          "helvetica",
          "normal"
        );

        const nombre =
          producto.nombre
            ?.substring(
              0,
              28
            ) ||
          "Sin nombre";

        const margenProducto =
          producto.ventas > 0
            ? (producto.ganancia /
                producto.ventas) *
              100
            : 0;

        doc.text(
          nombre,
          15,
          y
        );

        doc.text(
          String(
            producto.cantidad
          ),
          82,
          y
        );

        doc.text(
          formatoMoneda(
            producto.ventas
          ),
          110,
          y
        );

        doc.text(
          formatoMoneda(
            producto.ganancia
          ),
          140,
          y
        );

        doc.text(
          `${margenProducto.toFixed(
            2
          )}%`,
          175,
          y
        );

        y += 8;

        doc.setDrawColor(
          220,
          225,
          230
        );

        doc.line(
          15,
          y - 3,
          195,
          y - 3
        );
      }
    );

    /* PIE DE PÁGINA */

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
        "normal"
      );

      doc.text(
        `Reporte generado por Orbix · Página ${pagina} de ${paginas}`,
        20,
        290
      );
    }

    const fechaArchivo =
      new Date()
        .toISOString()
        .split("T")[0];

    doc.save(
      `reporte-financiero-${fechaArchivo}.pdf`
    );
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <section className="reporte-financiero">

      <div className="reporte-financiero-header">

        <button
          className="reporte-financiero-volver"
          onClick={onVolver}
        >
          <ArrowLeft size={20} />

          Volver a reportes
        </button>

        <div>
          <h3>
            Reporte Financiero
          </h3>

          <p>
            Ganancias y rendimiento financiero del negocio
          </p>
        </div>

      </div>

      <div className="reporte-financiero-acciones">

        <div>
          <h4>
            Resumen financiero
          </h4>

          <p>
            Información de ganancias y ventas del período seleccionado.
          </p>
        </div>

        <button
          className="reporte-financiero-pdf"
          onClick={exportarPDF}
          disabled={cargando}
        >
          <Download size={18} />

          Descargar PDF
        </button>

      </div>

      <div className="reporte-financiero-periodos">

        <div className="reporte-financiero-periodos-botones">

          <button
            className={
              periodo === "Semana"
                ? "periodo-activo"
                : ""
            }
            onClick={() =>
              setPeriodo("Semana")
            }
          >
            Semana
          </button>

          <button
            className={
              periodo === "Mes"
                ? "periodo-activo"
                : ""
            }
            onClick={() =>
              setPeriodo("Mes")
            }
          >
            Mes
          </button>

          <button
            className={
              periodo ===
              "Personalizado"
                ? "periodo-activo"
                : ""
            }
            onClick={() =>
              setPeriodo(
                "Personalizado"
              )
            }
          >
            Personalizado
          </button>

        </div>

      </div>

      {periodo ===
        "Personalizado" && (
        <div className="reporte-financiero-fechas">

          <div className="reporte-financiero-fecha">

            <label>
              Fecha inicial
            </label>

            <input
              type="date"
              value={fechaInicio}
              onChange={(e) =>
                setFechaInicio(
                  e.target.value
                )
              }
            />

          </div>

          <div className="reporte-financiero-fecha">

            <label>
              Fecha final
            </label>

            <input
              type="date"
              value={fechaFin}
              onChange={(e) =>
                setFechaFin(
                  e.target.value
                )
              }
            />

          </div>

        </div>
      )}

      {cargando && (
        <div className="reporte-financiero-cargando">
          Cargando información financiera...
        </div>
      )}

      {!cargando && error && (
        <div className="reporte-financiero-error">
          {error}
        </div>
      )}

      {!cargando && !error && (
        <>

          {/* MÉTRICAS */}

          <div className="reporte-financiero-resumen">

            {/* VENTAS TOTALES */}

            <div className="reporte-financiero-card">

              <span>
                Ventas totales
              </span>

              <strong>
                {formatoMoneda(
                  totalVentas
                )}
              </strong>

            </div>

            {/* GANANCIA BRUTA */}

            <div className="reporte-financiero-card">

              <span>
                Ganancia bruta
              </span>

              <strong>
                {formatoMoneda(
                  gananciaBruta
                )}
              </strong>

            </div>

            {/* VENTAS REALIZADAS */}

            <div className="reporte-financiero-card">

              <span>
                Ventas realizadas
              </span>

              <strong>
                {ventasFiltradas.length}
              </strong>

            </div>

            {/* UNIDADES VENDIDAS */}

            <div className="reporte-financiero-card">

              <span>
                Unidades vendidas
              </span>

              <strong>
                {totalUnidades}
              </strong>

            </div>

          </div>

          {/* TABLA */}

          <div className="reporte-financiero-contenido">

            <h4>
              Ganancia por producto
            </h4>

            <p>
              Ganancia generada por cada producto durante{" "}
              <strong>
                {obtenerTextoPeriodo()}
              </strong>
              .
            </p>

            {gananciasPorProducto.length >
              0 && (
              <div className="tabla-financiero-reporte">

                <table>

                  <thead>

                    <tr>

                      <th>
                        Producto
                      </th>

                      <th>
                        Cantidad
                      </th>

                      <th>
                        Ventas
                      </th>

                      <th>
                        Ganancia
                      </th>

                      <th>
                        Margen
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {gananciasPorProducto.map(
                      (
                        producto
                      ) => {

                        const margenProducto =
                          producto.ventas >
                          0
                            ? (producto.ganancia /
                                producto.ventas) *
                              100
                            : 0;

                        return (
                          <tr
                            key={
                              producto.idProducto
                            }
                          >

                            <td>
                              {
                                producto.nombre
                              }
                            </td>

                            <td>
                              {
                                producto.cantidad
                              }
                            </td>

                            <td>
                              {formatoMoneda(
                                producto.ventas
                              )}
                            </td>

                            <td>
                              {formatoMoneda(
                                producto.ganancia
                              )}
                            </td>

                            <td>
                              {margenProducto.toFixed(
                                2
                              )}
                              %
                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>
            )}

            {gananciasPorProducto.length ===
              0 && (
              <div className="financiero-sin-datos">
                No hay información financiera para este período.
              </div>
            )}

          </div>

        </>
      )}

    </section>
  );
};

export default ReporteFinanciero;