import { useState, useEffect } from "react";
import CardsInventario, { type CardsInventarioProps } from "../../components/dashboardInventario/CardsInventario";
import StockBajoTable, { type ProductoStockBajo } from "../../components/dashboardInventario/StockBajoTable";
import StockChart, { type StockChartData } from "../../components/dashboardInventario/StockChart";
import UltimosMovimientos, { type Movimiento } from "../../components/dashboardInventario/UltimosMovimientos";

const DashboardInventario = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [dashboardMetrics, setDashboardMetrics] = useState<CardsInventarioProps['metrics']>({
    valorTotal: 0,
    totalProductos: 0,
    productosStockBajo: 0,
    sinStock: 0,
    movimientosHoy: { total: 0, entradas: 0, salidas: 0 }
  });

  const [stockBajo, setStockBajo] = useState<ProductoStockBajo[]>([]);
  const [chartData, setChartData] = useState<StockChartData[]>([]);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setTimeout(() => {
        setDashboardMetrics({
          valorTotal: 523330,
          totalProductos: 12,
          productosStockBajo: 3,
          sinStock: 0,
          movimientosHoy: { total: 7, entradas: 4, salidas: 3 }
        });

        setStockBajo([
          { producto: "Zapatillas Nike Air Max 270", stockActual: 3, stockMin: 10, deficit: -7, proveedor: "Nike Distribuidora" },
          { producto: "Impresora HP LaserJet Pro", stockActual: 2, stockMin: 3, deficit: -1, proveedor: "HP Argentina" },
          { producto: "Teclado Mecánico Logitech G413", stockActual: 4, stockMin: 5, deficit: -1, proveedor: "Logitech Corp" }
        ]);

        setChartData([
          { name: "Electrónica", valor: 210000 },
          { name: "Ropa", valor: 65000 },
          { name: "Hogar", valor: 85000 },
          { name: "Alimentos", valor: 38200 }
        ]);

        setMovimientos([
          { tipo: "Entrada", producto: "Laptop Lenovo IdeaPad 5", detalle: "+10 u. · Luis Herrera", fecha: "28 Jul", iconType: "in" },
          { tipo: "Salida", producto: "Smartphone Samsung Galaxy A55", detalle: "-3 u. · Ana Torres", fecha: "28 Jul", iconType: "out" },
          { tipo: "Salida", producto: "Monitor Samsung 27\" FHD", detalle: "-2 u. · Diego Ruiz", fecha: "27 Jul", iconType: "out" },
          { tipo: "Ajuste", producto: "Zapatillas Nike Air Max 270", detalle: "-4 u. · Luis Herrera", fecha: "27 Jul", iconType: "adj" },
          { tipo: "Entrada", producto: "Arroz Largo Fino x5kg", detalle: "+50 u. · Luis Herrera", fecha: "26 Jul", iconType: "in" }
        ]);

        setIsLoading(false);
      }, 2000); 
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <div className="encabezado-dashboard-inv">
        <h2>Dashboard Principal</h2>
        <p className="fecha-mes-inv">Resumen general del inventario</p>
      </div>
      
      <div className="dashboard-content">
        <CardsInventario metrics={dashboardMetrics} isLoading={isLoading} />
        <StockBajoTable data={stockBajo} isLoading={isLoading} />
        
        <div className="bottom-row-inv">
          <StockChart data={chartData} isLoading={isLoading} />
          <UltimosMovimientos data={movimientos} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default DashboardInventario;