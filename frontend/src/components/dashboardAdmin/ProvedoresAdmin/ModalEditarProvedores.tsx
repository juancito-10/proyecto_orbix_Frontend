import { useEffect, useState } from "react";
import "./ModalEditarProvedores.css";

import proveedoresService, {
  type Proveedor,
} from "../../../services/proveedores.services";

interface ModalEditarProvedoresProps {
  proveedor: Proveedor;
  onCerrar: () => void;
  onActualizado: (proveedorActualizado: Proveedor) => void;
}

const ModalEditarProvedores = ({
  proveedor,
  onCerrar,
  onActualizado,
}: ModalEditarProvedoresProps) => {
  const [nombre, setNombre] = useState("");
  const [nit, setNit] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [estado, setEstado] = useState("activo");

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  /*
   * Cargamos los datos del proveedor
   */
  useEffect(() => {
    setNombre(proveedor.nombre || "");
    setNit(proveedor.nit || "");
    setTelefono(proveedor.telefono || "");
    setCorreo(proveedor.correo || "");
    setDireccion(proveedor.direccion || "");
    setCiudad(proveedor.ciudad || "");
    setEstado(proveedor.estado || "activo");

    setError("");
  }, [proveedor]);

  /*
   * Guardar cambios
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setGuardando(true);
      setError("");

      const proveedorActualizado =
        await proveedoresService.actualizarProveedor(
          proveedor.idProveedor,
          nombre,
          nit,
          telefono,
          correo,
          direccion,
          ciudad,
          estado,
        );

      /*
       * Avisamos a la tabla que el proveedor
       * fue actualizado correctamente.
       */
      onActualizado(proveedorActualizado);

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al actualizar el proveedor.",
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="modal-editar-overlay">
      <div className="modal-editar-proveedor">

        {/* HEADER */}

        <div className="modal-editar-header">
          <div>
            <h2>Editar proveedor</h2>

            <p>
              Modifica la información del proveedor.
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


        {/* FORMULARIO */}

        <form
          className="modal-editar-formulario"
          onSubmit={handleSubmit}
        >

          {/* NOMBRE */}

          <div className="campo-editar campo-completo">
            <label htmlFor="nombre">
              Nombre del proveedor
            </label>

            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese el nombre del proveedor"
              required
            />
          </div>


          {/* NIT */}

          <div className="campo-editar">
            <label htmlFor="nit">
              NIT
            </label>

            <input
              id="nit"
              type="text"
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              placeholder="Ingrese el NIT"
              required
            />
          </div>


          {/* TELÉFONO */}

          <div className="campo-editar">
            <label htmlFor="telefono">
              Teléfono
            </label>

            <input
              id="telefono"
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ingrese el teléfono"
            />
          </div>


          {/* CORREO */}

          <div className="campo-editar campo-completo">
            <label htmlFor="correo">
              Correo electrónico
            </label>

            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ingrese el correo electrónico"
            />
          </div>


          {/* DIRECCIÓN */}

          <div className="campo-editar campo-completo">
            <label htmlFor="direccion">
              Dirección
            </label>

            <input
              id="direccion"
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Ingrese la dirección"
            />
          </div>


          {/* CIUDAD */}

          <div className="campo-editar">
            <label htmlFor="ciudad">
              Ciudad
            </label>

            <input
              id="ciudad"
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              placeholder="Ingrese la ciudad"
            />
          </div>


          {/* ESTADO */}

          <div className="campo-editar">
            <label htmlFor="estado">
              Estado
            </label>

            <select
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="activo">
                Activo
              </option>

              <option value="inactivo">
                Inactivo
              </option>
            </select>
          </div>


          {/* ERROR */}

          {error && (
            <div className="modal-editar-error">
              {error}
            </div>
          )}


          {/* BOTONES */}

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

export default ModalEditarProvedores;