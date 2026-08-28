const ProductosInventario = () => {
  return (
    <>
      <div className="encabezado-dashboard-inv">
        <h2>Productos</h2>
        <p className="fecha-mes-inv">Gestión del catálogo de productos</p>
      </div>
      
      <div className="dashboard-content" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #f1f5f9', minHeight: '400px' }}>
        <p style={{ color: '#64748b' }}>Cargando módulo de productos...</p>
        {/* Aquí construiremos la tabla visual interactiva de productos */}
      </div>
    </>
  );
};

export default ProductosInventario;
