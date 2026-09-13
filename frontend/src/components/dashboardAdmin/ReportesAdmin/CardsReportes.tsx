import {
  FileChartColumn,
  Package,
  UsersRound,
  CircleDollarSign,
  ArrowRight,
} from "lucide-react";

import "./CardsReportes.css";

type CardsReportesProps = {
  onGenerarVentas: () => void;
  onGenerarInventario: () => void;
  onGenerarClientes: () => void;
  onGenerarFinanciero: () => void;
};

const CardsReportes = ({
  onGenerarVentas,
  onGenerarInventario,
  onGenerarClientes,
  onGenerarFinanciero,
}: CardsReportesProps) => {
  return (
    <section className="cards-reportes">

      {/* =========================
          REPORTE DE VENTAS
      ========================= */}

      <div className="card-reporte">

        <div className="card-reporte-titulo">

          <FileChartColumn
            color="#0EA5E9"
            size={36}
          />

          <h4>
            Reporte de Venta
          </h4>

        </div>

        <span className="card-reporte-subtitulo-azul">
          Análisis completo de órdenes y facturación
        </span>

        <button
          className="report-button-azul"
          onClick={onGenerarVentas}
        >
          Generar reporte

          <ArrowRight size={18} />
        </button>

      </div>


      {/* =========================
          REPORTE DE INVENTARIO
      ========================= */}

      <div className="card-reporte">

        <div className="card-reporte-titulo">

          <Package
            color="#A16207"
            size={40}
          />

          <h4>
            Reporte de Inventario
          </h4>

        </div>

        <span className="card-reporte-subtitulo-marron">
          Estado de stock y movimientos de productos
        </span>

        <button
          className="report-button-marron"
          onClick={onGenerarInventario}
        >
          Generar reporte

          <ArrowRight size={18} />
        </button>

      </div>


      {/* =========================
          REPORTE DE CLIENTES
      ========================= */}

      <div className="card-reporte">

        <div className="card-reporte-titulo">

          <UsersRound
            color="purple"
            size={36}
          />

          <h4>
            Reportes de Clientes
          </h4>

        </div>

        <span className="card-reporte-subtitulo-morado">
          Comportamiento y segmentación de clientes
        </span>

        <button
          className="report-button-morado"
          onClick={onGenerarClientes}
        >
          Generar reporte

          <ArrowRight size={18} />
        </button>

      </div>


      {/* =========================
          REPORTE FINANCIERO
      ========================= */}

      <div className="card-reporte">

        <div className="card-reporte-titulo">

          <CircleDollarSign
            color="#F59E0B"
            size={36}
          />

          <h4>
            Reporte Financiero
          </h4>

        </div>

        <span className="card-reporte-subtitulo-amarillo">
          Ganancias y rendimiento financiero del negocio
        </span>

        <button
          className="report-button-amarillo"
          onClick={onGenerarFinanciero}
        >
          Generar reporte

          <ArrowRight size={18} />
        </button>

      </div>

    </section>
  );
};

export default CardsReportes;