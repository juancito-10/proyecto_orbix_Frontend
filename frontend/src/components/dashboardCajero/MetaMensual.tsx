import "./MetaMensual.css";


const META = {
  mesTexto: "Julio 2026",
  actual: 19800,
  objetivo: 25000,
};

const formatoCOP = (valor: number) =>
  valor.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

const MetaMensual = () => {
  const porcentaje = Math.min(100, Math.round((META.actual / META.objetivo) * 100));

  return (
    <div className="meta-mensual">
      <div className="meta-mensual-header">
        <div>
          <h3>Meta mensual</h3>
          <p className="meta-mensual-sub">
            {META.mesTexto} · {formatoCOP(META.actual)} de {formatoCOP(META.objetivo)}
          </p>
        </div>
        <span className="meta-porcentaje">{porcentaje}%</span>
      </div>

      <div className="meta-barra-track">
        <div className="meta-barra-fill" style={{ width: `${porcentaje}%` }} />
      </div>

      <div className="meta-rango">
        <span>$0</span>
        <span>{formatoCOP(META.objetivo)}</span>
      </div>
    </div>
  );
};

export default MetaMensual;