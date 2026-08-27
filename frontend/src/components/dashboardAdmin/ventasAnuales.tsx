import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./VentasAnuales.css"


const Ventasanuales = () => {
  const datos = [
    { mes: "Ene", ventas: 48000, meta: 45000 },
    { mes: "Feb", ventas: 52000, meta: 48000 },
    { mes: "Mar", ventas: 47000, meta: 51000 },
    { mes: "Abr", ventas: 61000, meta: 54000 },
    { mes: "May", ventas: 58000, meta: 57000 },
    { mes: "Jun", ventas: 74000, meta: 60000 },
    { mes: "Jul", ventas: 70000, meta: 65000 },
    { mes: "Ago", ventas: 82000, meta: 70000 },
    { mes: "Sep", ventas: 78000, meta: 75000 },
    { mes: "Oct", ventas: 92000, meta: 78000 },
    { mes: "Nov", ventas: 88000, meta: 82000 },
    { mes: "Dic", ventas: 105000, meta: 85000 },
  ];

  return (
    <section className="ventas-anuales">
      <div className="ventas-header">
        <div>
          <h3>Ventas anuales</h3>
          <p>Comparativo ventas vs meta 2026</p>
        </div>

        <div className="leyenda">
          <span>● Ventas</span>
          <span>● Meta</span>
        </div>
      </div>

      <div className="grafica">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={datos}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="mes" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="ventas"
              stroke="#087c9c"
              strokeWidth={3}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="meta"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="6 6"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default Ventasanuales;