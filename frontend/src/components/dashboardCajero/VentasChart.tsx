import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./ChartsRow.css";

// TODO: reemplazar por datos reales del backend (ventas acumuladas por mes)
const DATOS = [
  { mes: "Ene", valor: 12200 },
  { mes: "Feb", valor: 13400 },
  { mes: "Mar", valor: 12800 },
  { mes: "Abr", valor: 15100 },
  { mes: "May", valor: 16900 },
  { mes: "Jun", valor: 15800 },
  { mes: "Jul", valor: 19800 },
  { mes: "Ago", valor: 21500 },
  { mes: "Sep", valor: 20600 },
  { mes: "Oct", valor: 22300 },
  { mes: "Nov", valor: 23100 },
  { mes: "Dic", valor: 24000 },
];

const VentasChart = () => {
  return (
    <div className="chart-card">
      <h3>Mis ventas 2026</h3>
      <p className="chart-sub naranja">Evolución mensual acumulada</p>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={DATOS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c5cfc" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#7c5cfc" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eceef3" />
          <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#8890a0" }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={(v) => `$${v / 1000}k`}
            tick={{ fontSize: 11, fill: "#8890a0" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(v) =>
              Number(v).toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })
            }
          />
          <Area type="monotone" dataKey="valor" stroke="#7c5cfc" strokeWidth={2.5} fill="url(#colorVentas)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VentasChart;