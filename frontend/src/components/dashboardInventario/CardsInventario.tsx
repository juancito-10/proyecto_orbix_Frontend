import "./CardsInventario.css";

export interface CardsInventarioProps {
  metrics: {
    valorTotal: number;
    totalProductos: number;
    productosStockBajo: number;
    sinStock: number;
    movimientosHoy: {
      total: number;
      entradas: number;
      salidas: number;
    };
  };
}

const CardsInventario = ({ metrics }: CardsInventarioProps) => {
  return (
    <div className="cards-inv-container">
      <div className="card-inv">
        <div className="card-inv-header">
          <p>Valor total de stock</p>
          <span className="dot-green"></span>
        </div>
        <h3 className="card-inv-value">
          $ {metrics.valorTotal.toLocaleString('es-AR')}
        </h3>
        <p className="card-inv-subtitle green-text">
          {metrics.totalProductos} productos
        </p>
      </div>

      <div className="card-inv">
        <div className="card-inv-header">
          <p>Productos con stock bajo</p>
          <span className="dot-yellow"></span>
        </div>
        <h3 className="card-inv-value">{metrics.productosStockBajo}</h3>
        <p className="card-inv-subtitle yellow-text">requieren reposición</p>
      </div>

      <div className="card-inv">
        <div className="card-inv-header">
          <p>Sin stock</p>
          <span className="dot-red"></span>
        </div>
        <h3 className="card-inv-value">{metrics.sinStock}</h3>
        <p className="card-inv-subtitle red-text">productos agotados</p>
      </div>

      <div className="card-inv">
        <div className="card-inv-header">
          <p>Movimientos hoy</p>
          <span className="dot-blue"></span>
        </div>
        <h3 className="card-inv-value">{metrics.movimientosHoy.total}</h3>
        <p className="card-inv-subtitle blue-text">
          {metrics.movimientosHoy.entradas} entradas · {metrics.movimientosHoy.salidas} salidas
        </p>
      </div>
    </div>
  );
};

export default CardsInventario;
