import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.services";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMensaje("");
    setError("");
    setCargando(true);

    try {
      await authService.forgotPassword(correo);

      setMensaje(
        "Si el correo está registrado, recibirás un enlace para recuperar tu contraseña."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo procesar la solicitud."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="forgot-password-page">
      <div className="forgot-password-container">
        <h1>Recuperar contraseña</h1>

        <p>
          Ingresa el correo con el que inicias sesión en Orbix.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="correo">
            Correo electrónico
          </label>

          <input
            type="email"
            id="correo"
            placeholder="correo@empresa.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          {error && (
            <p className="forgot-error">
              {error}
            </p>
          )}

          {mensaje && (
            <p className="forgot-success">
              {mensaje}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
          >
            {cargando
              ? "Enviando..."
              : "Enviar enlace de recuperación"}
          </button>
        </form>

        <button
          type="button"
          className="back-login"
          onClick={() => navigate("/login/opera")}
        >
          Volver al inicio de sesión
        </button>
      </div>
    </main>
  );
};

export default ForgotPassword;