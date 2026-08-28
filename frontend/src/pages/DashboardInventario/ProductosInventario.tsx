import { Search, Plus } from "lucide-react";
import "./ProductosInventario.css";

const productosData = [
  { id: "PRD-001", nombre: "Laptop Lenovo IdeaPad 5", categoria: "Electrónica", precio: 8450, stock: 14, stockMin: 5, valor: 118300, proveedor: "Lenovo Argentina" },
  { id: "PRD-002", nombre: "Monitor Samsung 27\" FHD", categoria: "Electrónica", precio: 3200, stock: 8, stockMin: 5, valor: 25600, proveedor: "Samsung Corp" },
  { id: "PRD-003", nombre: "Zapatillas Nike Air Max 270", categoria: "Ropa y calzado", precio: 1890, stock: 3, stockMin: 10, valor: 5670, proveedor: "Nike Distribuidora" },
  { id: "PRD-004", nombre: "Set Utensilios Cocina 12pz", categoria: "Hogar", precio: 4620, stock: 22, stockMin: 5, valor: 101640, proveedor: "Menaje del Sur" },
  { id: "PRD-005", nombre: "Smartphone Samsung Galaxy A55", categoria: "Electrónica", precio: 5900, stock: 19, stockMin: 8, valor: 112100, proveedor: "Samsung Corp" },
  { id: "PRD-006", nombre: "Impresora HP LaserJet Pro", categoria: "Electrónica", precio: 2750, stock: 2, stockMin: 3, valor: 5500, proveedor: "HP Argentina" }
];

const ProductosInventario = () => {
  return (
    <>
      <div className="productos-header">
        <div className="productos-title">
          <h2>Productos</h2>
          <p>12 productos · valor total $ 523.330</p>
        </div>
        <div className="productos-actions">
          <button className="btn-outline">Importar</button>
          <button className="btn-primary">
            <Plus size={18} /> Agregar producto
          </button>
        </div>
      </div>
      
      <div className="filters-bar">
        <div className="search-input">
          <Search size={16} />
          <input type="text" placeholder="Buscar producto o código..." />
        </div>
        
        <div className="filter-pills">
          <button className="pill active-green">Todas</button>
          <button className="pill">Electrónica</button>
          <button className="pill">Ropa y calzado</button>
          <button className="pill">Alimentos</button>
          <button className="pill">Hogar</button>
        </div>

        <div className="filter-pills" style={{ marginLeft: 'auto' }}>
          <button className="pill active-dark">Todos</button>
          <button className="pill">Disponible</button>
          <button className="pill">Stock bajo</button>
          <button className="pill">Sin stock</button>
        </div>
      </div>

      <div className="table-container">
        <table className="productos-table">
          <thead>
            <tr>
              <th>CÓDIGO</th>
              <th>PRODUCTO</th>
              <th>CATEGORÍA</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th>STOCK MÍN.</th>
              <th>VALOR EN STOCK</th>
              <th>PROVEEDOR</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productosData.map((prod, index) => {
              const statusClass = prod.stock <= prod.stockMin ? 'low' : 'good';
              const fillWidth = Math.min((prod.stock / (prod.stockMin * 3)) * 100, 100);

              return (
                <tr key={index}>
                  <td className="text-green">{prod.id}</td>
                  <td className="text-dark">{prod.nombre}</td>
                  <td className="text-gray">{prod.categoria}</td>
                  <td className="text-dark">$ {prod.precio.toLocaleString('es-AR')}</td>
                  <td>
                    <div className="stock-bar-container">
                      <div className="stock-bar">
                        <div className={`stock-bar-fill ${statusClass}`} style={{ width: `${fillWidth}%` }}></div>
                      </div>
                      <span className={`stock-number ${statusClass}`}>{prod.stock}</span>
                    </div>
                  </td>
                  <td className="text-gray">{prod.stockMin}</td>
                  <td className="text-dark">$ {prod.valor.toLocaleString('es-AR')}</td>
                  <td className="text-gray">{prod.proveedor}</td>
                  <td>
                    <button className="btn-ajustar">Ajustar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductosInventario;
