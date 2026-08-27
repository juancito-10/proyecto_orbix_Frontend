import { useNavigate } from "react-router-dom";

import "./LogoutButton.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const usuarioGuardado = localStorage.getItem("usuario");

    let rol = "";

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      rol = usuario.rol;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    if (rol === "admin") {
      navigate("/login/admin");
    } else if (
      rol === "vendedor" ||
      rol === "inventario"
    ) {
      navigate("/login/opera");
    } else {
      navigate("/login/admin");
    }
  };

  return (
    <button
      className="cerrar-perfil"
      onClick={handleLogout}
    >
      Cerrar perfil
    </button>
  );
};

export default LogoutButton;