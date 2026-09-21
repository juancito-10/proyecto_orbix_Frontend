import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./VentasMensuales.css";

import ventasService, {
  type Venta,
} from "../../../services/ventas.services";

interface DatoVentaMensual {
  mes: string;
  ventas: number;
}

const VentasMensuales = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  /*
   * Meses que vamos a mostrar en la gráfica.
   */
  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  /*
   * Cargar las ventas desde la API.
   */
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
          "Error al cargar las ventas:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar las ventas."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarVentas();
  }, []);

  /*
   * Agrupamos las ventas por mes.
   *
   * Solo tomamos las ventas del año 2026.
   */
  const datosVentas: DatoVentaMensual[] =
    meses.map((mes, indiceMes) => {
      const ventasDelMes = ventas.filter((venta) => {
        const fecha = new Date(venta.fecha);

        return (
          fecha.getFullYear() === 2026 &&
          fecha.getMonth() === indiceMes
        );
      });

      const totalMes = ventasDelMes.reduce(
        (total, venta) =>
          total + Number(venta.total),
        0
      );

      return {
        mes,
        ventas: totalMes,
      };
    });

  /*
   * Calculamos el acumulado anual.
   */
  const acumuladoAnual = datosVentas.reduce(
    (total, dato) => total + dato.ventas,
    0
  );

  /*
   * Estado de carga.
   */
  if (cargando) {
    return (
      <section className="ventas-mensuales">
        <div className="ventas-mensuales-titulo">
          <h3>Ventas mensuales 2026</h3>

          <p>
            Cargando información...
          </p>
        </div>

        <div className="ventas-mensuales-grafica">
          Cargando ventas...
        </div>
      </section>
    );
  }

  /*
   * Error.
   */
  if (error) {
    return (
      <section className="ventas-mensuales">
        <div className="ventas-mensuales-titulo">
          <h3>Ventas mensuales 2026</h3>

          <p>
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="ventas-mensuales">
      <div className="ventas-mensuales-titulo">
        <h3>Ventas mensuales 2026</h3>

        <p>
          Acumulado anual: ${" "}
          {acumuladoAnual.toLocaleString("es-CO")}
        </p>
      </div>

      <div className="ventas-mensuales-grafica">
        <ResponsiveContainer
          width="100%"
          height={270}
        >
          <BarChart
            data={datosVentas}
            margin={{
              top: 10,
              right: 5,
              left: 5,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#d9e0e8"
            />

            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#58708c",
                fontSize: 13,
              }}
            />

            <YAxis
              domain={[0, "auto"]}
              axisLine={false}
              tickLine={false}
              tickFormatter={(valor) =>
                `$${Number(valor) / 1000}k`
              }
              tick={{
                fill: "#58708c",
                fontSize: 13,
              }}
            />

            <Tooltip
              formatter={(valor) =>
                `$ ${Number(valor).toLocaleString(
                  "es-CO"
                )}`
              }
              labelFormatter={(mes) => mes}
              contentStyle={{
                border: "1px solid #d9e0e8",
                borderRadius: "12px",
                fontSize: "14px",
              }}
            />

            <Bar
              dataKey="ventas"
              fill="#087c9c"
              radius={[6, 6, 0, 0]}
              barSize={23}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default VentasMensuales;