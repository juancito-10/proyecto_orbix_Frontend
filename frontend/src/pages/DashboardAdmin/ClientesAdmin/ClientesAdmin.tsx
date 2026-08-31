import { Search, Bell, Plus } from "lucide-react";
import Sidebar from "../../../components/dashboardAdmin/Sidebar";
import FiltrosClientes from "../../../components/dashboardAdmin/ClientesAdmin/FiltrosClientes";
import "./ClientesAdmin.css";
import { useState } from "react";
import TablaClientes from "../../../components/dashboardAdmin/ClientesAdmin/TablaClientes";
const ClientesAdmin = () => {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  return (
    <main className="clientes-main">
      <Sidebar />
      <div className="clientes-contenido">
        <div className="clientes-barra-superior">
          <p>
            <span className="clientes-orbix">Orbix</span> /{" "}
            <span className="clientes-admin">Admin</span> /{" "}
            <span className="clientes-titulo">Clientes</span>
          </p>

          <div className="clientes-acciones-superiores">
            <form className="clientes-buscar">
              <Search size={20} />
              <input type="text" placeholder="Buscar..." />
            </form>

            <div className="clientes-notifi">
              <Bell size={20} />
            </div>

            <div className="clientes-usuario">VO</div>
          </div>
        </div>

        <div className="clientes-encabezado">
          <div>
            <h2>Clientes</h2>

            <p className="clientes-fecha">
              8 clientes · $ 247.540 en ventas totales
            </p>
          </div>

          <button className="clientes-button-agregar">
            <Plus size={20} />
            Nuevo cliente
          </button>
        </div>
        <FiltrosClientes
          filtro={filtro}
          setFiltro={setFiltro}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />
        <TablaClientes filtro={filtro} busqueda={busqueda} />
      </div>
    </main>
  );
};

export default ClientesAdmin;
