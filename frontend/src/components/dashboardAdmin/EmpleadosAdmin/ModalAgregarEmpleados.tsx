import { useState } from "react";
import "./ModalAgregarEmpleados.css";

import usuariosService, {
  type CrearUsuario,
  type Usuario,
} from "../../../services/usuarios.services";

interface ModalAgregarEmpleadosProps {
  onCerrar: () => void;
  onAgregado: (usuario: Usuario) => void;
}

const ModalAgregarEmpleados = ({
  onCerrar,
  onAgregado,
}: ModalAgregarEmpleadosProps) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [password, setPassword] = useState("");

  const [rol, setRol] =
    useState<CrearUsuario["rol"]>("vendedor");

  const [estado, setEstado] =
    useState<CrearUsuario["estado"]>("activo");

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setGuardando(true);
      setError("");

      const nuevoUsuario =
        await usuariosService.crearUsuario({
          nombre,
          correo,
          celular: celular || undefined,
          ciudad: ciudad || undefined,
          fechaIngreso: fechaIngreso || undefined,
          password,
          rol,
          estado,
        });

      onAgregado(nuevoUsuario);
    } catch (error) {
      console.error(
        "Error al crear el empleado:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Error al crear el empleado."
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="modal-agregar-overlay">
      <div className="modal-agregar-empleado">

        <div className="modal-agregar-header">
          <div>
            <h2>Agregar empleado</h2>

            <p>
              Registra la información del nuevo empleado.
            </p>
          </div>

          <button
            type="button"
            className="modal-agregar-cerrar"
            onClick={onCerrar}
            disabled={guardando}
          >
            ×
          </button>
        </div>

        <form
          className="modal-agregar-formulario"
          onSubmit={handleSubmit}
        >

          <div className="campo-agregar">
            <label htmlFor="nombreEmpleadoAgregar">
              Nombre completo
            </label>

            <input
              id="nombreEmpleadoAgregar"
              type="text"
              value={nombre}
              onChange={(e) =>
                setNombre(e.target.value)
              }
              placeholder="Ingrese el nombre"
              required
            />
          </div>

          <div className="campo-agregar campo-completo-agregar">
            <label htmlFor="correoEmpleadoAgregar">
              Correo electrónico
            </label>

            <input
              id="correoEmpleadoAgregar"
              type="email"
              value={correo}
              onChange={(e) =>
                setCorreo(e.target.value)
              }
              placeholder="Ingrese el correo electrónico"
              required
            />
          </div>

          <div className="campo-agregar">
            <label htmlFor="celularEmpleadoAgregar">
              Celular
            </label>

            <input
              id="celularEmpleadoAgregar"
              type="text"
              value={celular}
              onChange={(e) =>
                setCelular(e.target.value)
              }
              placeholder="Ingrese el celular"
            />
          </div>

          <div className="campo-agregar">
            <label htmlFor="ciudadEmpleadoAgregar">
              Ciudad
            </label>

            <input
              id="ciudadEmpleadoAgregar"
              type="text"
              value={ciudad}
              onChange={(e) =>
                setCiudad(e.target.value)
              }
              placeholder="Ingrese la ciudad"
            />
          </div>

          <div className="campo-agregar">
            <label htmlFor="fechaIngresoAgregar">
              Fecha de ingreso
            </label>

            <input
              id="fechaIngresoAgregar"
              type="date"
              value={fechaIngreso}
              onChange={(e) =>
                setFechaIngreso(e.target.value)
              }
            />
          </div>

          <div className="campo-agregar">
            <label htmlFor="rolEmpleadoAgregar">
              Rol
            </label>

            <select
              id="rolEmpleadoAgregar"
              value={rol}
              onChange={(e) =>
                setRol(
                  e.target.value as CrearUsuario["rol"]
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

          <div className="campo-agregar">
            <label htmlFor="estadoEmpleadoAgregar">
              Estado
            </label>

            <select
              id="estadoEmpleadoAgregar"
              value={estado}
              onChange={(e) =>
                setEstado(
                  e.target.value as CrearUsuario["estado"]
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

          <div className="campo-agregar campo-completo-agregar">
            <label htmlFor="passwordEmpleadoAgregar">
              Contraseña
            </label>

            <input
              id="passwordEmpleadoAgregar"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Ingrese la contraseña"
              minLength={6}
              required
            />
          </div>

          {error && (
            <div className="modal-agregar-error">
              {error}
            </div>
          )}

          <div className="modal-agregar-acciones">
            <button
              type="button"
              className="boton-cancelar-agregar"
              onClick={onCerrar}
              disabled={guardando}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="boton-guardar-agregar"
              disabled={guardando}
            >
              {guardando
                ? "Guardando..."
                : "Agregar empleado"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalAgregarEmpleados;