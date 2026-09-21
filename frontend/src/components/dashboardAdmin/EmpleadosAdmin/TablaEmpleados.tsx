import { useEffect, useState } from "react";
import "./TablaEmpleados.css";

import ModalEditarEmpleados from "./ModalEditarEmpleados";

import usuariosService, {
  type Usuario,
} from "../../../services/usuarios.services";

interface TablaEmpleadosProps {
  filtro: string;
  busqueda: string;
  actualizar: number;
  onEmpleadoActualizado: () => void;
}

const TablaEmpleados = ({
  filtro,
  busqueda,
  actualizar,
  onEmpleadoActualizado,
}: TablaEmpleadosProps) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [empleadoEditar, setEmpleadoEditar] =
    useState<Usuario | null>(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        setCargando(true);
        setError("");

        const data =
          await usuariosService.obtenerUsuarios();

        setUsuarios(data);
      } catch (error) {
        console.error(
          "Error al cargar los usuarios:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Error al cargar los usuarios.",
        );
      } finally {
        setCargando(false);
      }
    };

    cargarUsuarios();
  }, [actualizar]);

  const textoBusqueda =
    busqueda.toLocaleLowerCase().trim();

  const usuariosFiltrados =
    usuarios.filter((usuario) => {
      const rolMostrar =
        usuario.rol === "admin"
          ? "Administrador"
          : usuario.rol === "vendedor"
            ? "Vendedor"
            : usuario.rol === "inventario"
              ? "Inventario"
              : "Consulta";

      const coincideRol =
        filtro === "Todos" ||
        rolMostrar === filtro;

      const coincideBusqueda =
        usuario.nombre
          .toLocaleLowerCase()
          .includes(textoBusqueda) ||
        usuario.correo
          .toLocaleLowerCase()
          .includes(textoBusqueda) ||
        (usuario.codigoEmpleado ?? "")
          .toLocaleLowerCase()
          .includes(textoBusqueda) ||
        (usuario.ciudad ?? "")
          .toLocaleLowerCase()
          .includes(textoBusqueda) ||
        (usuario.celular ?? "")
          .toLocaleLowerCase()
          .includes(textoBusqueda);

      return coincideRol && coincideBusqueda;
    });

  if (cargando) {
    return (
      <section className="tabla-empleados-wrapper">
        <div className="tabla-empleados-contenedor">
          <p className="empleados-sin-resultados">
            Cargando empleados...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="tabla-empleados-wrapper">
        <div className="tabla-empleados-contenedor">
          <p className="empleados-sin-resultados">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="tabla-empleados-wrapper">
      <div className="tabla-empleados-contenedor">
        <table className="tabla-empleados">
          <thead>
            <tr>
              <th>EMPLEADO</th>
              <th>CONTACTO</th>
              <th>CIUDAD</th>
              <th>ROL</th>
              <th>ESTADO</th>
              <th>FECHA INGRESO</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.map((usuario) => {
              const iniciales =
                usuario.nombre
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((nombre) => nombre[0])
                  .join("")
                  .toUpperCase();

              const rolMostrar =
                usuario.rol === "admin"
                  ? "Administrador"
                  : usuario.rol === "vendedor"
                    ? "Vendedor"
                    : usuario.rol === "inventario"
                      ? "Inventario"
                      : "Consulta";

              const estadoMostrar =
                usuario.estado === "activo"
                  ? "Activo"
                  : "Inactivo";

              const codigoEmpleado =
                usuario.codigoEmpleado || "—";

              const fechaIngreso =
                usuario.fechaIngreso
                  ? new Date(
                      usuario.fechaIngreso,
                    ).toLocaleDateString(
                      "es-CO",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )
                  : "—";

              return (
                <tr
                  key={usuario.idUsuario}
                >
                  <td className="empleado-info">
                    <div className="empleado-contenido">
                      <div className="empleado-avatar">
                        {iniciales}
                      </div>

                      <div className="empleado-datos">
                        <span className="empleado-nombre">
                          {usuario.nombre}
                        </span>

                        <span className="empleado-id">
                          {codigoEmpleado}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="contacto-empleado-info">
                    <div className="contacto-empleado-datos">
                      <span className="contacto-empleado-correo">
                        {usuario.correo}
                      </span>

                      <span className="contacto-empleado-telefono">
                        {usuario.celular || "—"}
                      </span>
                    </div>
                  </td>

                  <td className="ciudad-empleado-info">
                    {usuario.ciudad || "—"}
                  </td>

                  <td className="rol-empleado-info">
                    <span
                      className={
                        usuario.rol === "vendedor"
                          ? "rol-vendedor"
                          : usuario.rol === "inventario"
                            ? "rol-cajero"
                            : "rol-vendedor"
                      }
                    >
                      {rolMostrar}
                    </span>
                  </td>

                  <td className="estado-empleado-info">
                    <span
                      className={
                        usuario.estado === "activo"
                          ? "estado-activo"
                          : "estado-inactivo"
                      }
                    >
                      {estadoMostrar}
                    </span>
                  </td>

                  <td className="fecha-empleado-info">
                    {fechaIngreso}
                  </td>

                  <td className="editar-empleado-info">
                    <button
                      type="button"
                      className="boton-editar-empleado"
                      onClick={() =>
                        setEmpleadoEditar(usuario)
                      }
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}

            {usuariosFiltrados.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="empleados-sin-resultados"
                >
                  No se encontraron empleados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {empleadoEditar && (
        <ModalEditarEmpleados
          usuario={empleadoEditar}
          onCerrar={() =>
            setEmpleadoEditar(null)
          }
          onActualizado={(usuarioActualizado) => {
            setUsuarios(
              (usuariosActuales) =>
                usuariosActuales.map(
                  (usuario) =>
                    usuario.idUsuario ===
                    usuarioActualizado.idUsuario
                      ? usuarioActualizado
                      : usuario,
                ),
            );

            setEmpleadoEditar(null);

            onEmpleadoActualizado();
          }}
        />
      )}
    </section>
  );
};

export default TablaEmpleados;