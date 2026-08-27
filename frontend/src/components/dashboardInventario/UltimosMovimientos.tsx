import { ChevronUp, ChevronDown, Minus } from "lucide-react";
import "./UltimosMovimientos.css";

const movimientos = [
  {
    tipo: "Entrada",
    producto: "Laptop Lenovo IdeaPad 5",
    detalle: "+10 u. · Luis Herrera",
    fecha: "28 Jul",
    iconType: "in"
  },
  {
    tipo: "Salida",
    producto: "Smartphone Samsung Galaxy A55",
    detalle: "+3 u. · Ana Torres",
    fecha: "28 Jul",
    iconType: "out"
  },
  {
    tipo: "Salida",
    producto: "Monitor Samsung 27\" FHD",
    detalle: "+2 u. · Diego Ruiz",
    fecha: "27 Jul",
    iconType: "out"
  },
  {
    tipo: "Ajuste",
    producto: "Zapatillas Nike Air Max 270",
    detalle: "-4 u. · Luis Herrera",
    fecha: "27 Jul",
    iconType: "adj"
  },
  {
    tipo: "Entrada",
    producto: "Arroz Largo Fino x5kg",
    detalle: "+50 u. · Luis Herrera",
    fecha: "26 Jul",
    iconType: "in"
  }
];

const UltimosMovimientos = () => {
  return (
    <div className="movimientos-container">
      <h3>Últimos movimientos</h3>
      <div className="movimientos-list">
        {movimientos.map((mov, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default UltimosMovimientos;
