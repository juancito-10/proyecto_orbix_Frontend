import { useNavigate } from "react-router-dom";
import React from "react";

import "./LogoutButton.css";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const LogoutButton = ({ className = "cerrar-perfil", children = "Cerrar perfil" }: LogoutButtonProps) => {
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
      rol === "cajero" ||
      rol === "inventario"
    ) {
      navigate("/login/opera");
    } else {
      navigate("/login/admin");
    }
  };

  return (
    <button
      className={className}
      onClick={handleLogout}
    >
      {children}
    </button>
  );
};

export default LogoutButton;