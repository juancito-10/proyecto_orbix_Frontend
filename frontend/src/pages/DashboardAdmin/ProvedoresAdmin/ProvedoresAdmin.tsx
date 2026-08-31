import { Search, Bell, Plus } from "lucide-react";

import "./ProvedoresAdmin.css";

import Sidebar from "../../../components/dashboardAdmin/Sidebar";
import FiltrosProvedor from "../../../components/dashboardAdmin/ProvedoresAdmin/FiltrosProvedor";
import { useState } from "react";
import TablaProvedor from "../../../components/dashboardAdmin/ProvedoresAdmin/TablaProvedor";
import CardsProvedor from "../../../components/dashboardAdmin/ProvedoresAdmin/CardsProvedor";

const ProvedoresAdmin = () => {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  return (
    <main className="provedores-main">
      <Sidebar />

      <div className="provedores-contenido">
        {/* BARRA SUPERIOR */}
        <div className="provedores-barra-superior">
          <p>
            <span className="provedores-orbix">Orbix</span> /{" "}
            <span className="provedores-admin">Admin</span> /{" "}
            <span className="provedores-titulo">Proveedores</span>
          </p>

          <div className="provedores-acciones-superiores">
            <form className="provedores-buscar">
              <Search size={20} />
              <input type="text" placeholder="Buscar..." />
            </form>

            <div className="provedores-notifi">
              <Bell size={20} />
            </div>

            <div className="provedores-usuario">VO</div>
          </div>
        </div>

        {/* ENCABEZADO */}
        <div className="provedores-encabezado">
          <div>
            <h2>Proveedores</h2>

            <p className="provedores-fecha">8 proveedores registrados</p>
          </div>

          <button className="provedores-button-agregar">
            <Plus size={20} />
            Nuevo proveedor
          </button>
        </div>
        <CardsProvedor />

        <FiltrosProvedor
          filtro={filtro}
          setFiltro={setFiltro}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />
        <TablaProvedor filtro={filtro} busqueda={busqueda} />
      </div>
    </main>
  );
};

export default ProvedoresAdmin;
