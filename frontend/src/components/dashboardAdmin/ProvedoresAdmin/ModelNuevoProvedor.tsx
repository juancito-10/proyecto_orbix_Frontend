import React, { useState } from "react";
import "./ModelNuevoProvedor.css";
import proveedoresService from "../../../services/proveedores.services";

interface NuevoProveedorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModelNuevoProvedor: React.FC<NuevoProveedorProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    nit: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    estado: "activo",
  });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setCargando(true);
      setError("");

      await proveedoresService.crearProveedor(
        formData.nombre,
        formData.nit,
        formData.telefono,
        formData.email,
        formData.ciudad,
        formData.estado
      );

      setFormData({
        nombre: "",
        nit: "",
        email: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        estado: "activo",
      });

      onClose();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al crear el proveedor."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal-proveedor-scope">
      <div className="modal-overlay">
        <div className="modal-proveedor">

          <div className="modal-header">
            <div>
              <h2>Nuevo proveedor</h2>
              <p>Registra la información del nuevo proveedor</p>
            </div>

            <button
              type="button"
              className="modal-close"
              onClick={onClose}
              disabled={cargando}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">
                <label>Nombre del proveedor</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej. Samsung"
                  required
                />
              </div>

              <div className="form-group">
                <label>NIT</label>
                <input
                  type="text"
                  name="nit"
                  value={formData.nit}
                  onChange={handleChange}
                  placeholder="Ej. 900123456-7"
                  required
                />
              </div>

              <div className="form-group">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="correo@empresa.com"
                />
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="300 000 0000"
                />
              </div>

              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Ej. Calle 10 # 20-30"
                />
              </div>

              <div className="form-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  placeholder="Ej. Bogotá"
                />
              </div>

              <div className="form-group">
                <label>Estado</label>

                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>

            </div>

            {error && (
              <p className="modal-error">
                {error}
              </p>
            )}

            <div className="modal-actions">

              <button
                type="button"
                className="btn-cancelar"
                onClick={onClose}
                disabled={cargando}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn-crear"
                disabled={cargando}
              >
                {cargando ? "Creando..." : "Crear proveedor"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ModelNuevoProvedor;