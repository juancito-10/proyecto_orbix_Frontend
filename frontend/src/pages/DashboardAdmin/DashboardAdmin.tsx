import ProfileDropdown from "../../components/ProfileDropdown";
import Sidebar from "../../components/dashboardAdmin/Sidebar";

import CarsDatos from "../../components/dashboardAdmin/CarsDatos";

import Ventasanuales from "../../components/dashboardAdmin/ventasAnuales";

import VentasCategorias from "../../components/dashboardAdmin/VentasCategorias";

import UltimasVentas from "../../components/dashboardAdmin/UltimasVentas";



import "./DashboardAdmin.css";
import EstaSemana from "../../components/dashboardAdmin/EstaSemana";

const DashboardAdmin = () => {
  return (
    <main className="dashboard-main">
      <Sidebar />

      <div className="dashboard-contenido">
        {/* BARRA SUPERIOR */}

        <div className="dashboard-barra-superior">
          <p>
            <span className="dashboard-orbix">Orbix</span> /{" "}
            <span className="dashboard-admin">Admin</span> /{" "}
            <span className="dashboard-titulo">Dashboard</span>
          </p>

          <div className="dashboard-acciones-superiores">
            

            

            <ProfileDropdown />
          </div>
        </div>

        {/* ENCABEZADO */}

        <div className="dashboard-encabezado">
          <div>
            <h2>Dashboard</h2>

            <p className="dashboard-fecha">
              {new Date().toLocaleDateString("es-CO", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <CarsDatos />

        <div className="graficas-dashboard">
          <Ventasanuales />
          <VentasCategorias />
        </div>

        <div className="ventas-dashboard">
          <UltimasVentas />
          <EstaSemana />
        </div>
      </div>
    </main>
  );
};

export default DashboardAdmin;



