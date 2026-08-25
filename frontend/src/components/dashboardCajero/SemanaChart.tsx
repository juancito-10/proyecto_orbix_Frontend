import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "./ChartsRow.css";

const META_DIARIA = 4000;

// TODO: reemplazar por datos reales del backend (ventas por día de la semana actual)
const DATOS = [
  { dia: "Lun", valor: 3200 },
  { dia: "Mar", valor: 5100 },
  { dia: "Mié", valor: 2900 },
  { dia: "Jue", valor: 5800 },
  { dia: "Vie", valor: 4300 },
  { dia: "Sáb", valor: 3600 },
  { dia: "Dom", valor: 3100 },
];

const formatoCOP = (valor: number) =>
  valor.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

const SemanaChart = () => {
  return (
    <div className="chart-card">
      <h3>Esta semana vs meta</h3>
      <p className="chart-sub">Meta diaria: {formatoCOP(META_DIARIA)}</p>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={DATOS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eceef3" />
          <XAxis dataKey="dia" tick={{ fontSize: 11, fill: "#8890a0" }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={(v) => `$${v / 1000}k`}
            tick={{ fontSize: 11, fill: "#8890a0" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip formatter={(v) => formatoCOP(Number(v))} />
          <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
            {DATOS.map((d) => (
              <Cell key={d.dia} fill={d.valor >= META_DIARIA ? "#7c5cfc" : "#d9d0fe"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SemanaChart;