import { TriangleAlert } from "lucide-react";
import "./StockBajoTable.css";

export interface ProductoStockBajo {
  producto: string;
  stockActual: number;
  stockMin: number;
  deficit: number;
  proveedor: string;
}

export interface StockBajoTableProps {
  data: ProductoStockBajo[];
  isLoading?: boolean;
}

const StockBajoTable = ({ data, isLoading = false }: StockBajoTableProps) => {
  return (
    <div className="table-container">
      <div className="table-header-alert">
        <div className="alert-title">
          <TriangleAlert size={20} className="alert-icon" />
          <span>Productos con stock bajo</span>
        </div>
        <div className="alert-badge">{isLoading ? "-" : data.length} alertas</div>
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
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <tr key={i}>
                <td><div className="skeleton skeleton-text" style={{ width: '80%', margin: 0 }}></div></td>
                <td><div className="skeleton skeleton-text" style={{ width: '30%', margin: 0 }}></div></td>
                <td><div className="skeleton skeleton-text" style={{ width: '30%', margin: 0 }}></div></td>
                <td><div className="skeleton skeleton-text" style={{ width: '30%', margin: 0 }}></div></td>
                <td><div className="skeleton skeleton-text" style={{ width: '70%', margin: 0 }}></div></td>
              </tr>
            ))
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td className="product-name">{item.producto}</td>
                <td className="stock-actual">{item.stockActual}</td>
                <td className="stock-min">{item.stockMin}</td>
                <td className="deficit">{item.deficit}</td>
                <td className="proveedor">{item.proveedor}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                No hay productos con stock bajo
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockBajoTable;
