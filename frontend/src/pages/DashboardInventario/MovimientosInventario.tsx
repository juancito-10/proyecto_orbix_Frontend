import { Search, ChevronUp, ChevronDown, Minus } from "lucide-react";
import "./MovimientosInventario.css";

const movData = [
  { id: "MOV-0048", fecha: "30 Jul 2026", hora: "09:14", tipo: "Entrada", producto: "Laptop Lenovo IdeaPad 5", sku: "PRD-001", cantidad: "+10 u.", isPositive: true, valor: 84500, responsable: "Luis Herrera", nota: "Reposición mensual" },
  { id: "MOV-0047", fecha: "30 Jul 2026", hora: "08:32", tipo: "Salida", producto: "Smartphone Samsung Galaxy A55", sku: "PRD-005", cantidad: "+3 u.", isPositive: true, valor: 17700, responsable: "Ana Torres", nota: "ORD-2843" },
  { id: "MOV-0046", fecha: "29 Jul 2026", hora: "16:55", tipo: "Salida", producto: "Monitor Samsung 27\" FHD", sku: "PRD-002", cantidad: "+2 u.", isPositive: true, valor: 6400, responsable: "Diego Ruiz", nota: "ORD-2846" },
  { id: "MOV-0045", fecha: "29 Jul 2026", hora: "14:20", tipo: "Ajuste", producto: "Zapatillas Nike Air Max 270", sku: "PRD-003", cantidad: "-4 u.", isPositive: false, valor: 7560, responsable: "Luis Herrera", nota: "Conteo físico - diferen..." }
];

const MovimientosInventario = () => {
  return (
    <>
      <div className="mov-header">
        <div className="mov-title">
          <h2>Movimientos de inventario</h2>
          <p>Registro de entradas, salidas y ajustes de stock</p>
        </div>
        <div className="mov-actions">
          <button className="btn-outline">
            <ChevronUp size={18} /> Registrar entrada
          </button>
          <button className="btn-primary">
            <ChevronDown size={18} /> Registrar salida
          </button>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-card-header">
            <div className="dot blue"></div>
            <p>Movimientos registrados</p>
          </div>
          <h3>8</h3>
          <p className="subtitle text-gray">últimos 7 días</p>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <div className="dot green"></div>
            <p>Total entradas</p>
          </div>
          <h3>$ 112.200</h3>
          <p className="subtitle text-green">3 operaciones</p>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <div className="dot red"></div>
            <p>Total salidas</p>
          </div>
          <h3>$ 45.330</h3>
          <p className="subtitle text-red">4 operaciones</p>
        </div>
      </div>
      
      <div className="filters-bar">
        <div className="search-input">
          <Search size={16} />
          <input type="text" placeholder="Buscar producto o ID..." />
        </div>
        
        <div className="filter-pills">
          <button className="pill active-green">Todos</button>
          <button className="pill">Entrada</button>
          <button className="pill">Salida</button>
          <button className="pill">Ajuste</button>
        </div>
      </div>

      <div className="table-container">
        <table className="mov-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FECHA / HORA</th>
              <th>TIPO</th>
              <th>PRODUCTO</th>
              <th>CANTIDAD</th>
              <th>VALOR</th>
              <th>RESPONSABLE</th>
              <th>NOTA</th>
            </tr>
          </thead>
          <tbody>
            {movData.map((mov, index) => {
              let badgeClass = '';
              let Icon = null;
              if (mov.tipo === 'Entrada') {
                badgeClass = 'badge-entrada';
                Icon = ChevronUp;
              } else if (mov.tipo === 'Salida') {
                badgeClass = 'badge-salida';
                Icon = ChevronDown;
              } else {
                badgeClass = 'badge-ajuste';
                Icon = Minus;
              }

              return (
                <tr key={index}>
                  <td className="text-green">{mov.id}</td>
                  <td className="text-gray">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="text-dark">{mov.fecha}</span>
                      <span>{mov.hora}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge-tipo ${badgeClass}`}>
                      <Icon size={14} strokeWidth={3} /> {mov.tipo}
                    </span>
                  </td>
                  <td>
                    <div className="prod-info">
                      <span className="prod-name">{mov.producto}</span>
                      <span className="prod-sku">{mov.sku}</span>
                    </div>
                  </td>
                  <td className={mov.isPositive ? 'text-green' : 'text-red'} style={{ fontWeight: 600 }}>
                    {mov.cantidad}
                  </td>
                  <td className="text-dark">$ {mov.valor.toLocaleString('es-AR')}</td>
                  <td className="text-gray">{mov.responsable}</td>
                  <td className="text-gray">{mov.nota}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MovimientosInventario;
