import { useEffect, useState } from "react";
import "./ModalEditarEmpleados.css";

import usuariosService, {
  type Usuario,
} from "../../../services/usuarios.services";

interface ModalEditarEmpleadosProps {
  usuario: Usuario;
  onCerrar: () => void;
  onActualizado: (usuarioActualizado: Usuario) => void;
}

const ModalEditarEmpleados = ({
  usuario,
  onCerrar,
  onActualizado,
}: ModalEditarEmpleadosProps) => {
  const [codigoEmpleado, setCodigoEmpleado] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [rol, setRol] = useState<Usuario["rol"]>("consulta");
  const [estado, setEstado] = useState<Usuario["estado"]>("activo");

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  // Cargar los datos del empleado

  useEffect(() => {
    setCodigoEmpleado(usuario.codigoEmpleado || "");
    setNombre(usuario.nombre || "");
    setCorreo(usuario.correo || "");
    setCelular(usuario.celular || "");
    setCiudad(usuario.ciudad || "");

    if (usuario.fechaIngreso) {
      const fecha = new Date(usuario.fechaIngreso);
      const fechaFormateada = fecha.toISOString().split("T")[0];

      setFechaIngreso(fechaFormateada);
    } else {
      setFechaIngreso("");
    }

    setRol(usuario.rol || "consulta");
    setEstado(usuario.estado || "activo");

    setError("");
  }, [usuario]);

  // Guardar cambios

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setGuardando(true);
      setError("");

      const usuarioActualizado =
        await usuariosService.editarUsuario(
          usuario.idUsuario,
          {
            codigoEmpleado,
            nombre,
            correo,
            celular,
            ciudad,
            fechaIngreso: fechaIngreso || undefined,
            rol,
            estado,
          }
        );

      onActualizado(usuarioActualizado);
    } catch (error) {
      console.error(
        "Error al actualizar el empleado:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Error al actualizar el empleado."
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="modal-editar-overlay">
      <div className="modal-editar-empleado">

        {/* Encabezado */}

        <div className="modal-editar-header">
          <div>
            <h2>Editar empleado</h2>

            <p>
              Modifica la información del empleado.
            </p>
          </div>

          <button
            type="button"
            className="modal-editar-cerrar"
            onClick={onCerrar}
            disabled={guardando}
          >
            ×
          </button>
        </div>

        {/* Formulario */}

        <form
          className="modal-editar-formulario"
          onSubmit={handleSubmit}
        >

          {/* Código de empleado */}

          <div className="campo-editar">
            <label htmlFor="codigoEmpleado">
              Código de empleado
            </label>

            <input
              id="codigoEmpleado"
              type="text"
              value={codigoEmpleado}
              onChange={(e) =>
                setCodigoEmpleado(e.target.value)
              }
              placeholder="Ingrese el código"
            />
          </div>

          {/* Nombre */}

          <div className="campo-editar">
            <label htmlFor="nombreEmpleado">
              Nombre completo
            </label>

            <input
              id="nombreEmpleado"
              type="text"
              value={nombre}
              onChange={(e) =>
                setNombre(e.target.value)
              }
              placeholder="Ingrese el nombre"
              required
            />
          </div>

          {/* Correo */}

          <div className="campo-editar campo-completo">
            <label htmlFor="correoEmpleado">
              Correo electrónico
            </label>

            <input
              id="correoEmpleado"
              type="email"
              value={correo}
              onChange={(e) =>
                setCorreo(e.target.value)
              }
              placeholder="Ingrese el correo electrónico"
              required
            />
          </div>

          {/* Celular */}

          <div className="campo-editar">
            <label htmlFor="celularEmpleado">
              Celular
            </label>

            <input
              id="celularEmpleado"
              type="text"
              value={celular}
              onChange={(e) =>
                setCelular(e.target.value)
              }
              placeholder="Ingrese el celular"
            />
          </div>

          {/* Ciudad */}

          <div className="campo-editar">
            <label htmlFor="ciudadEmpleado">
              Ciudad
            </label>

            <input
              id="ciudadEmpleado"
              type="text"
              value={ciudad}
              onChange={(e) =>
                setCiudad(e.target.value)
              }
              placeholder="Ingrese la ciudad"
            />
          </div>

          {/* Fecha de ingreso */}

          <div className="campo-editar">
            <label htmlFor="fechaIngreso">
              Fecha de ingreso
            </label>

            <input
              id="fechaIngreso"
              type="date"
              value={fechaIngreso}
              onChange={(e) =>
                setFechaIngreso(e.target.value)
              }
            />
          </div>

          {/* Rol */}

          <div className="campo-editar">
            <label htmlFor="rolEmpleado">
              Rol
            </label>

            <select
              id="rolEmpleado"
              value={rol}
              onChange={(e) =>
                setRol(
                  e.target.value as Usuario["rol"]
                )
              }
            >
              <option value="admin">
                Administrador
              </option>

              <option value="vendedor">
                Vendedor
              </option>

              <option value="inventario">
                Inventario
              </option>

              <option value="consulta">
                Consulta
              </option>
            </select>
          </div>

          {/* Estado */}

          <div className="campo-editar">
            <label htmlFor="estadoEmpleado">
              Estado
            </label>

            <select
              id="estadoEmpleado"
              value={estado}
              onChange={(e) =>
                setEstado(
                  e.target.value as Usuario["estado"]
                )
              }
            >
              <option value="activo">
                Activo
              </option>

              <option value="inactivo">
                Inactivo
              </option>
            </select>
          </div>

          {/* Mensaje de error */}

          {error && (
            <div className="modal-editar-error">
              {error}
            </div>
          )}

          {/* Botones */}

          <div className="modal-editar-acciones">
            <button
              type="button"
              className="boton-cancelar-editar"
              onClick={onCerrar}
              disabled={guardando}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="boton-guardar-editar"
              disabled={guardando}
            >
              {guardando
                ? "Guardando..."
                : "Guardar cambios"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalEditarEmpleados;