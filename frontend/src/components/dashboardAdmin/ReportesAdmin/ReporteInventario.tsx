import { useEffect, useState } from "react";
import { ArrowLeft, Download } from "lucide-react";
import jsPDF from "jspdf";

import inventarioService, {
  type ProductoInventario,
} from "../../../services/inventario.services";

import "./ReporteInventario.css";

type ReporteInventarioProps = {
  onVolver: () => void;
};

const ReporteInventario = ({
  onVolver,
}: ReporteInventarioProps) => {
  const [productos, setProductos] = useState<ProductoInventario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarInventario = async () => {
      try {
        setCargando(true);
        setError("");

        const data =
          await inventarioService.obtenerProductos();

        setProductos(data);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Error al cargar el inventario.",
        );
      } finally {
        setCargando(false);
      }
    };

    cargarInventario();
  }, []);

  const formatoDinero = (valor: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(valor);
  };

  const valorInventario = productos.reduce(
    (total, producto) => {
      return (
        total +
        Number(producto.precio) *
          Number(producto.stock)
      );
    },
    0,
  );

  const totalProductos = productos.length;

  const stockTotal = productos.reduce(
    (total, producto) => {
      return total + Number(producto.stock);
    },
    0,
  );

  const productosAgotados = productos.filter(
    (producto) =>
      Number(producto.stock) <= 0,
  ).length;

  const exportarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Reporte de Inventario",
      20,
      20,
    );

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(
      "Estado de stock y productos registrados",
      20,
      29,
    );

    doc.setFontSize(10);

    doc.text(
      `Fecha: ${new Date().toLocaleDateString(
        "es-CO",
      )}`,
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
      `Valor total del inventario: ${formatoDinero(
        valorInventario,
      )}`,
      20,
      64,
    );

    doc.text(
      `Productos registrados: ${totalProductos}`,
      20,
      72,
    );

    doc.text(
      `Stock total: ${stockTotal}`,
      20,
      80,
    );

    doc.text(
      `Productos agotados: ${productosAgotados}`,
      20,
      88,
    );

    let y = 102;

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Productos del inventario",
      20,
      y,
    );

    y += 10;

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");

    doc.text("Producto", 20, y);
    doc.text("Precio", 90, y);
    doc.text("Stock", 130, y);
    doc.text("Valor total", 160, y);

    y += 5;

    doc.line(
      20,
      y,
      190,
      y,
    );

    y += 7;

    if (productos.length === 0) {
      doc.setFont("helvetica", "normal");

      doc.text(
        "No hay productos registrados en el inventario.",
        20,
        y,
      );
    }

    productos.forEach((producto) => {
      if (y > 275) {
        doc.addPage();

        y = 20;

        doc.setFontSize(8);
        doc.setFont(
          "helvetica",
          "bold",
        );

        doc.text(
          "Producto",
          20,
          y,
        );

        doc.text(
          "Precio",
          90,
          y,
        );

        doc.text(
          "Stock",
          130,
          y,
        );

        doc.text(
          "Valor total",
          160,
          y,
        );

        y += 8;
      }

      doc.setFont(
        "helvetica",
        "normal",
      );

      const nombre =
        producto.nombre
          ?.substring(0, 30) ||
        "Sin nombre";

      const precio =
        formatoDinero(
          Number(producto.precio),
        );

      const stock =
        String(producto.stock);

      const valorTotal =
        formatoDinero(
          Number(producto.precio) *
            Number(producto.stock),
        );

      doc.text(
        nombre,
        20,
        y,
      );

      doc.text(
        precio,
        90,
        y,
      );

      doc.text(
        stock,
        130,
        y,
      );

      doc.text(
        valorTotal,
        160,
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
    });

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
      `reporte-inventario-${fechaArchivo}.pdf`,
    );
  };

  return (
    <section className="reporte-inventario">
      <div className="reporte-inventario-header">
        <button
          className="reporte-inventario-volver"
          onClick={onVolver}
        >
          <ArrowLeft size={20} />

          Volver a reportes
        </button>

        <div>
          <h3>
            Reporte de Inventario
          </h3>

          <p>
            Estado de stock y movimientos de productos
          </p>
        </div>
      </div>

      <div className="reporte-inventario-acciones">
        <div>
          <h4>
            Inventario actual
          </h4>

          <p>
            Información actual de los productos y su disponibilidad.
          </p>
        </div>

        <button
          className="reporte-inventario-pdf"
          onClick={exportarPDF}
          disabled={cargando}
        >
          <Download size={18} />

          Descargar PDF
        </button>
      </div>

      {cargando && (
        <div className="reporte-inventario-cargando">
          Cargando inventario...
        </div>
      )}

      {!cargando && error && (
        <div className="reporte-inventario-error">
          {error}
        </div>
      )}

      {!cargando && !error && (
        <>
          <div className="reporte-inventario-resumen">
            <div className="reporte-inventario-card">
              <span>
                Valor del inventario
              </span>

              <strong>
                {formatoDinero(
                  valorInventario,
                )}
              </strong>
            </div>

            <div className="reporte-inventario-card">
              <span>
                Productos registrados
              </span>

              <strong>
                {totalProductos}
              </strong>
            </div>

            <div className="reporte-inventario-card">
              <span>
                Stock total
              </span>

              <strong>
                {stockTotal}
              </strong>
            </div>

            <div className="reporte-inventario-card">
              <span>
                Productos agotados
              </span>

              <strong>
                {productosAgotados}
              </strong>
            </div>
          </div>

          <div className="reporte-inventario-contenido">
            <h4>
              Productos del inventario
            </h4>

            <p>
              Se encontraron{" "}
              <strong>
                {totalProductos}
              </strong>{" "}
              productos registrados actualmente.
            </p>

            {productos.length > 0 && (
              <div className="tabla-inventario-reporte">
                <table>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Valor total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {productos.map(
                      (producto) => (
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
                            {formatoDinero(
                              Number(
                                producto.precio,
                              ),
                            )}
                          </td>

                          <td>
                            {
                              producto.stock
                            }
                          </td>

                          <td>
                            {formatoDinero(
                              Number(
                                producto.precio,
                              ) *
                                Number(
                                  producto.stock,
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

            {productos.length === 0 && (
              <div className="inventario-sin-datos">
                No hay productos registrados
                en el inventario.
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default ReporteInventario;