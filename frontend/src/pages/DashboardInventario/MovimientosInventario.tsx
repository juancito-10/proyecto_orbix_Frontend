const MovimientosInventario = () => {
  return (
    <>
      <div className="encabezado-dashboard-inv">
        <h2>Historial de Movimientos</h2>
        <p className="fecha-mes-inv">Registro de entradas, salidas y ajustes</p>
      </div>
      
      <div className="dashboard-content" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #f1f5f9', minHeight: '400px' }}>
        <p style={{ color: '#64748b' }}>Cargando módulo de historial de movimientos...</p>
        {/* Aquí construiremos la lista y filtros visuales */}
      </div>
    </>
  );
};

export default MovimientosInventario;
