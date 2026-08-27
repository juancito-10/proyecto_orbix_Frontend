import { TriangleAlert } from "lucide-react";
import "./StockBajoTable.css";

const StockBajoTable = () => {
  return (
    <div className="table-container">
      <div className="table-header-alert">
        <div className="alert-title">
          <TriangleAlert size={20} className="alert-icon" />
          <span>Productos con stock bajo</span>
        </div>
        <div className="alert-badge">3 alertas</div>
      </div>
      
      <table className="stock-table">
        <thead>
          <tr>
            <th>PRODUCTO</th>
            <th>STOCK ACTUAL</th>
            <th>STOCK MÍN.</th>
            <th>DÉFICIT</th>
            <th>PROVEEDOR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="product-name">Zapatillas Nike Air Max 270</td>
            <td className="stock-actual">3</td>
            <td className="stock-min">10</td>
            <td className="deficit">-7</td>
            <td className="proveedor">Nike Distribuidora</td>
          </tr>
          <tr>
            <td className="product-name">Impresora HP LaserJet Pro</td>
            <td className="stock-actual">2</td>
            <td className="stock-min">3</td>
            <td className="deficit">-1</td>
            <td className="proveedor">HP Argentina</td>
          </tr>
          <tr>
            <td className="product-name">Teclado Mecánico Logitech G413</td>
            <td className="stock-actual">4</td>
            <td className="stock-min">5</td>
            <td className="deficit">-1</td>
            <td className="proveedor">Logitech Corp</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StockBajoTable;
