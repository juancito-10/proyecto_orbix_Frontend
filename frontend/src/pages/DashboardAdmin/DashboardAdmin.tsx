import Sidebar from "../../components/dashboardAdmin/Sidebar";
import CarsDatos from "../../components/dashboardAdmin/CarsDatos";
import Ventasanuales from "../../components/dashboardAdmin/ventasAnuales";
import VentasCategorias from "../../components/dashboardAdmin/VentasCategorias";
import UltimasVentas from "../../components/dashboardAdmin/UltimasVentas";
import { Search, Bell, Download } from "lucide-react";
import "./DashboardAdmin.css";

const DashboardAdmin = () => {
  return (
    <main className="main">
      <Sidebar />

      <div className="contenido-dashboard">
        <div className="barra-superior">
          <p>
            <span className="orbix">Orbix</span> /{" "}
            <span className="admin">Admin</span> /{" "}
            <span className="dashboard-letra">Dashboard</span>
          </p>

          <div className="acciones-superiores">
            <form className="buscar">
              <Search size={20} />
              <input type="text" placeholder="Buscar..." />
            </form>
            <div className="notifi">
              <Bell size={20} />
            </div>
            <div className="usuario">VO</div>
          </div>
        </div>

        <div className="encabezado-dashboard">
          <div>
            <h2>Dashboard</h2>
            <p className="fecha-mes">Miércoles, 30 de julio de 2026</p>
          </div>

          <button className="button-exportar">
            <Download size={20} />
            Exportar reporte
          </button>
        </div>
        <CarsDatos />
        <div className="graficas-dashboard">
          <Ventasanuales />
          <VentasCategorias />
        </div>
        <UltimasVentas />
      </div>
    </main>
  );
};

export default DashboardAdmin;
