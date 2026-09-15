import ProfileDropdown from "../../../components/ProfileDropdown";
import { useState } from "react";
import { Bell, Plus, Search } from "lucide-react";

import Sidebar from "../../../components/dashboardAdmin/Sidebar";

import "./EmpleadosAdmin.css";

import CardsEmpleados from "../../../components/dashboardAdmin/EmpleadosAdmin/CardsEmpleados";
import FiltrosEmpleados from "../../../components/dashboardAdmin/EmpleadosAdmin/FiltrosEmpleados";
import TablaEmpleados from "../../../components/dashboardAdmin/EmpleadosAdmin/TablaEmpleados";
import ModalAgregarEmpleados from "../../../components/dashboardAdmin/EmpleadosAdmin/ModalAgregarEmpleados";

const EmpleadosAdmin = () => {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const [mostrarModalAgregar, setMostrarModalAgregar] =
    useState(false);

  const [actualizar, setActualizar] = useState(0);

  const handleEmpleadoAgregado = () => {
    setMostrarModalAgregar(false);

    setActualizar((valor) => valor + 1);
  };

  const handleEmpleadoActualizado = () => {
    setActualizar((valor) => valor + 1);
  };

  return (
    <main className="empleados-main">
      <Sidebar />

      <div className="empleados-contenido">
        <div className="empleados-barra-superior">
          <p>
            <span className="empleados-orbix">
              Orbix
            </span>{" "}
            /{" "}
            <span className="empleados-admin">
              Admin
            </span>{" "}
            /{" "}
            <span className="empleados-titulo">
              Empleados
            </span>
          </p>

          <div className="empleados-acciones-superiores">
            <form className="empleados-buscar">
              <Search size={20} />

              <input
                type="text"
                placeholder="Buscar..."
              />
            </form>

            <div className="empleados-notifi">
              <Bell size={20} />
            </div>

            <ProfileDropdown />
          </div>
        </div>

        <div className="empleados-encabezado">
          <div>
            <h2>Empleados</h2>

            <p className="empleados-fecha">
              5 empleados registrados Â· 4 activos
            </p>
          </div>

          <button
            type="button"
            className="empleados-button-agregar"
            onClick={() =>
              setMostrarModalAgregar(true)
            }
          >
            <Plus size={20} />
            Agregar empleado
          </button>
        </div>

        <CardsEmpleados
          actualizar={actualizar}
        />

        <FiltrosEmpleados
          busqueda={busqueda}
          filtro={filtro}
          onBusquedaChange={setBusqueda}
          onFiltroChange={setFiltro}
        />

        <TablaEmpleados
          busqueda={busqueda}
          filtro={filtro}
          actualizar={actualizar}
          onEmpleadoActualizado={
            handleEmpleadoActualizado
          }
        />
      </div>

      {mostrarModalAgregar && (
        <ModalAgregarEmpleados
          onCerrar={() =>
            setMostrarModalAgregar(false)
          }
          onAgregado={handleEmpleadoAgregado}
        />
      )}
    </main>
  );
};

export default EmpleadosAdmin;

