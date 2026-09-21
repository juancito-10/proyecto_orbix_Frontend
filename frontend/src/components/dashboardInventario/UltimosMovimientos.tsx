import { ChevronUp, ChevronDown, Minus } from "lucide-react";
import "./UltimosMovimientos.css";

export interface Movimiento {
  tipo: string;
  producto: string;
  detalle: string;
  fecha: string;
  iconType: "in" | "out" | "adj";
}

export interface UltimosMovimientosProps {
  data: Movimiento[];
  isLoading?: boolean;
}

const UltimosMovimientos = ({ data, isLoading = false }: UltimosMovimientosProps) => {
  return (
    <div className="movimientos-container">
      <h3>Últimos movimientos</h3>
      <div className="movimientos-list">
        {isLoading ? (
          Array(4).fill(0).map((_, index) => (
            <div className="movimiento-item" key={`skel-${index}`}>
              <div className="skeleton" style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0 }}></div>
              <div className="mov-info" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div className="skeleton skeleton-text" style={{ width: '20%', margin: 0, height: '12px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '70%', margin: 0 }}></div>
                <div className="skeleton skeleton-text" style={{ width: '40%', margin: 0, height: '12px' }}></div>
              </div>
              <div className="skeleton skeleton-text" style={{ width: '40px', margin: 0, height: '14px' }}></div>
            </div>
          ))
        ) : data.length > 0 ? (
          data.map((mov, index) => (
            <div className="movimiento-item" key={index}>
              <div className={`mov-icon ${mov.iconType}`}>
                {mov.iconType === "in" && <ChevronUp size={16} strokeWidth={3} />}
                {mov.iconType === "out" && <ChevronDown size={16} strokeWidth={3} />}
                {mov.iconType === "adj" && <Minus size={16} strokeWidth={3} />}
              </div>
              <div className="mov-info">
                <p className={`mov-tipo ${mov.iconType}-text`}>{mov.tipo}</p>
                <p className="mov-producto">{mov.producto}</p>
                <p className="mov-detalle">{mov.detalle}</p>
              </div>
              <div className="mov-fecha">{mov.fecha}</div>
            </div>
          ))
        ) : (
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "15px" }}>No hay movimientos recientes.</p>
        )}
      </div>
    </div>
  );
};

export default UltimosMovimientos;
