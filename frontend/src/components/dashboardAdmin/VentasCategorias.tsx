import {
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";

import "./ventasCategorias.css";

const VentasCategoria = () => {
  const datos = [
    {
      nombre: "Electrónica",
      valor: 38,
      fill: "#087c9c",
    },
    {
      nombre: "Ropa y calzado",
      valor: 24,
      fill: "#f59e0b",
    },
    {
      nombre: "Alimentos",
      valor: 18,
      fill: "#10b981",
    },
    {
      nombre: "Hogar",
      valor: 12,
      fill: "#8b5cf6",
    },
    {
      nombre: "Otros",
      valor: 8,
      fill: "#94a3b8",
    },
  ];

  return (
    <section className="ventas-categoria">
      <div className="categoria-header">
        <h3>Por categoría</h3>
        <p>Distribución de ventas</p>
      </div>

      <div className="grafica-donut">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={datos}
              dataKey="valor"
              nameKey="nombre"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={105}
              paddingAngle={3}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="categorias-lista">
        {datos.map((dato) => (
          <div className="categoria-item" key={dato.nombre}>
            <div className="categoria-nombre">
              <span
                className="categoria-punto"
                style={{ backgroundColor: dato.fill }}
              ></span>

              <span>{dato.nombre}</span>
            </div>

            <span>{dato.valor}%</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VentasCategoria;