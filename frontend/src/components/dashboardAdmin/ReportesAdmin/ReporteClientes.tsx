import { useEffect, useState } from "react";
import { ArrowLeft, Download } from "lucide-react";
import jsPDF from "jspdf";

import clienteService, {
  type Cliente,
} from "../../../services/clientes.services";

import "./ReporteClientes.css";

type ReporteClientesProps = {
  onVolver: () => void;
};

const ReporteClientes = ({
  onVolver,
}: ReporteClientesProps) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        setCargando(true);
        setError("");

        const data =
          await clienteService.obtenerClientes();

        setClientes(data);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Error al cargar los clientes."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarClientes();
  }, []);

  const totalClientes = clientes.length;

  const clientesMinoristas = clientes.filter(
    (cliente) =>
      cliente.segmento?.toLowerCase() === "minorista"
  ).length;

  const clientesMayoristas = clientes.filter(
    (cliente) =>
      cliente.segmento?.toLowerCase() === "mayorista"
  ).length;

  const clientesFrecuentes = clientes.filter(
    (cliente) =>
      cliente.segmento?.toLowerCase() === "frecuente"
  ).length;

  const formatoSegmento = (
    segmento?: string
  ) => {
    if (!segmento) {
      return "Sin segmento";
    }

    return (
      segmento.charAt(0).toUpperCase() +
      segmento.slice(1)
    );
  };

  const exportarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Reporte de Clientes",
      20,
      20
    );

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(
      "Comportamiento y segmentación de clientes",
      20,
      29
    );

    doc.setFontSize(10);

    doc.text(
      `Fecha: ${new Date().toLocaleDateString(
        "es-CO"
      )}`,
      20,
      38
    );

    doc.line(
      20,
      44,
      190,
      44
    );

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Resumen",
      20,
      55
    );

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    doc.text(
      `Total de clientes: ${totalClientes}`,
      20,
      64
    );

    doc.text(
      `Clientes minoristas: ${clientesMinoristas}`,
      20,
      72
    );

    doc.text(
      `Clientes mayoristas: ${clientesMayoristas}`,
      20,
      80
    );

    doc.text(
      `Clientes frecuentes: ${clientesFrecuentes}`,
      20,
      88
    );

    let y = 102;

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Clientes registrados",
      20,
      y
    );

    y += 10;

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Cliente",
      20,
      y
    );

    doc.text(
      "Documento",
      70,
      y
    );

    doc.text(
      "Teléfono",
      115,
      y
    );

    doc.text(
      "Ciudad",
      145,
      y
    );

    doc.text(
      "Segmento",
      175,
      y
    );

    y += 5;

    doc.line(
      20,
      y,
      190,
      y
    );

    y += 7;

    if (clientes.length === 0) {
      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.text(
        "No hay clientes registrados.",
        20,
        y
      );
    }

    clientes.forEach((cliente) => {
      if (y > 275) {
        doc.addPage();

        y = 20;

        doc.setFontSize(8);
        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.text(
          "Cliente",
          20,
          y
        );

        doc.text(
          "Documento",
          70,
          y
        );

        doc.text(
          "Teléfono",
          115,
          y
        );

        doc.text(
          "Ciudad",
          145,
          y
        );

        doc.text(
          "Segmento",
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
        cliente.nombre
          ?.substring(0, 25) ||
        "Sin nombre";

      const documento =
        cliente.documento
          ?.substring(0, 20) ||
        "Sin documento";

      const telefono =
        cliente.telefono
          ?.substring(0, 15) ||
        "Sin teléfono";

      const ciudad =
        cliente.ciudad
          ?.substring(0, 15) ||
        "Sin ciudad";

      const segmento =
        formatoSegmento(
          cliente.segmento
        );

      doc.text(
        nombre,
        20,
        y
      );

      doc.text(
        documento,
        70,
        y
      );

      doc.text(
        telefono,
        115,
        y
      );

      doc.text(
        ciudad,
        145,
        y
      );

      doc.text(
        segmento,
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
        20,
        y - 3,
        190,
        y - 3
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
      `reporte-clientes-${fechaArchivo}.pdf`
    );
  };

  return (
    <section className="reporte-clientes">

      <div className="reporte-clientes-header">

        <button
          className="reporte-clientes-volver"
          onClick={onVolver}
        >
          <ArrowLeft size={20} />

          Volver a reportes
        </button>

        <div>
          <h3>
            Reporte de Clientes
          </h3>

          <p>
            Comportamiento y segmentación de clientes
          </p>
        </div>

      </div>

      <div className="reporte-clientes-acciones">

        <div>
          <h4>
            Clientes actuales
          </h4>

          <p>
            Información actual de los clientes registrados.
          </p>
        </div>

        <button
          className="reporte-clientes-pdf"
          onClick={exportarPDF}
          disabled={cargando}
        >
          <Download size={18} />

          Descargar PDF
        </button>

      </div>

      {cargando && (
        <div className="reporte-clientes-cargando">
          Cargando clientes...
        </div>
      )}

      {!cargando && error && (
        <div className="reporte-clientes-error">
          {error}
        </div>
      )}

      {!cargando && !error && (
        <>

          <div className="reporte-clientes-resumen">

            <div className="reporte-clientes-card">
              <span>
                Total de clientes
              </span>

              <strong>
                {totalClientes}
              </strong>
            </div>

            <div className="reporte-clientes-card">
              <span>
                Clientes minoristas
              </span>

              <strong>
                {clientesMinoristas}
              </strong>
            </div>

            <div className="reporte-clientes-card">
              <span>
                Clientes mayoristas
              </span>

              <strong>
                {clientesMayoristas}
              </strong>
            </div>

            <div className="reporte-clientes-card">
              <span>
                Clientes frecuentes
              </span>

              <strong>
                {clientesFrecuentes}
              </strong>
            </div>

          </div>

          <div className="reporte-clientes-contenido">

            <h4>
              Clientes registrados
            </h4>

            <p>
              Se encontraron{" "}
              <strong>
                {totalClientes}
              </strong>{" "}
              clientes registrados actualmente.
            </p>

            {clientes.length > 0 && (
              <div className="tabla-clientes-reporte">

                <table>

                  <thead>

                    <tr>
                      <th>Cliente</th>
                      <th>Documento</th>
                      <th>Teléfono</th>
                      <th>Correo</th>
                      <th>Ciudad</th>
                      <th>Segmento</th>
                    </tr>

                  </thead>

                  <tbody>

                    {clientes.map(
                      (cliente) => (
                        <tr
                          key={
                            cliente.idCliente
                          }
                        >

                          <td>
                            {
                              cliente.nombre
                            }
                          </td>

                          <td>
                            {
                              cliente.documento
                            }
                          </td>

                          <td>
                            {cliente.telefono ||
                              "—"}
                          </td>

                          <td>
                            {cliente.correo ||
                              "—"}
                          </td>

                          <td>
                            {cliente.ciudad ||
                              "—"}
                          </td>

                          <td>
                            {formatoSegmento(
                              cliente.segmento
                            )}
                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>
            )}

            {clientes.length === 0 && (
              <div className="clientes-sin-datos">
                No hay clientes registrados.
              </div>
            )}

          </div>

        </>
      )}

    </section>
  );
};

export default ReporteClientes;