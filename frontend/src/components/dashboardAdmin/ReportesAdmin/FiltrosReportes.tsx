import "./FiltrosReportes.css";

interface FiltrosReportesProps {
  filtro: string;
  setFiltro: React.Dispatch<React.SetStateAction<string>>;
}

const FiltrosReportes = ({ filtro, setFiltro }: FiltrosReportesProps) => {
  return (
    <div className="filtros-reportes">
      <button
        className={`botones-reportes ${filtro === "Resumen" ? "activo" : ""}`}
        onClick={() => setFiltro("Resumen")}
      >
        Resumen
      </button>

      <button
        className={`botones-reportes ${
          filtro === "Rendimiento equipo" ? "activo" : ""
        }`}
        onClick={() => setFiltro("Rendimiento equipo")}
      >
        Rendimiento equipo
      </button>
    </div>
  );
};

export default FiltrosReportes;
