import "./CardsInventario.css";

export interface CardsInventarioProps {
  isLoading?: boolean;
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

const CardsInventario = ({ metrics, isLoading = false }: CardsInventarioProps) => {
  if (isLoading) {
    return (
      <div className="cards-inv-container">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card-inv" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="skeleton skeleton-text" style={{ width: '60%', marginBottom: '15px' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '40%', height: '28px', marginBottom: '10px' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '80%', marginBottom: '0' }}></div>
          </div>
        ))}
      </div>
    );
  }

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
