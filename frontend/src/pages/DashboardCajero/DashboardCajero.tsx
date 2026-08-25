import Sidebar from "../../components/dashboardCajero/Sidebar";
import MetricCards from "../../components/dashboardCajero/MetricCards";
import MetaMensual from "../../components/dashboardCajero/MetaMensual";
import VentasChart from "../../components/dashboardCajero/VentasChart";
import SemanaChart from "../../components/dashboardCajero/SemanaChart";
import ActividadReciente from "../../components/dashboardCajero/ActividadReciente";
import { Search, Bell } from "lucide-react";
import "./DashboardCajero.css";

const obtenerUsuario = () => {
  try {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      return {
        nombre: "Vendedor",
        iniciales: "VD",
      };
    }

    const usuario = JSON.parse(usuarioGuardado);

    const nombre: string = usuario?.nombre ?? "Vendedor";

    const primerNombre =
      nombre.trim().split(/\s+/)[0] || "Vendedor";

    const iniciales = nombre
      .trim()
      .split(/\s+/)
      .map((palabra: string) => palabra[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return {
      nombre: primerNombre,
      iniciales: iniciales || "VD",
    };
  } catch {
    return {
      nombre: "Vendedor",
      iniciales: "VD",
    };
  }
};

const DashboardCajero = () => {
  const { nombre, iniciales } = obtenerUsuario();

  const fecha = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const fechaCapitalizada =
    fecha.charAt(0).toUpperCase() + fecha.slice(1);

  return (
    <main className="main-vendedor">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="contenido-vendedor">

        {/* =========================
            BARRA SUPERIOR
        ========================== */}
        <div className="barra-superior-vendedor">
          <p>
            <span className="orbix">Orbix</span> /{" "}
            <span className="vendedor">Vendedor</span> /{" "}
            <span className="dashboard-letra">
              Mi Dashboard
            </span>
          </p>

          <div className="acciones-superiores">

            {/* Buscador */}
            <form className="buscar">
              <Search size={20} />

              <input
                type="text"
                placeholder="Buscar..."
              />
            </form>

            {/* Notificaciones */}
            <div className="notifi">
              <Bell size={20} />
              <span className="notifi-dot" />
            </div>

            {/* Usuario */}
            <div className="usuario">
              {iniciales}
            </div>
          </div>
        </div>

        {/* =========================
            SALUDO
        ========================== */}
        <div className="saludo">
          <h2>
            Buen día, {nombre} 
          </h2>

          <p className="fecha-mes">
            {fechaCapitalizada} · Tus métricas de hoy
          </p>
        </div>

        {/* =========================
            MÉTRICAS
        ========================== */}
        <MetricCards />

        {/* =========================
            META MENSUAL
        ========================== */}
        <MetaMensual />

        {/* =========================
            GRÁFICOS + ACTIVIDAD
        ========================== */}
        <div className="dashboard-seccion">

          {/* Gráficos */}
          <div className="charts-row">
            <VentasChart />
            <SemanaChart />
          </div>

          {/* Actividad reciente */}
          <ActividadReciente />

        </div>

      </div>
    </main>
  );
};

export default DashboardCajero;
