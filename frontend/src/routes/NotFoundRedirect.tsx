import { Navigate } from "react-router-dom";

const NotFoundRedirect = () => {
  const usuarioGuardado = localStorage.getItem("usuario");

  if (!usuarioGuardado) {
    return <Navigate to="/login/opera" replace />;
  }

  try {
    const usuario = JSON.parse(usuarioGuardado);

    if (usuario.rol === "admin") {
      return <Navigate to="/dashboard/admin" replace />;
    }

    if (usuario.rol === "vendedor") {
      return <Navigate to="/dashboard/vendedor" replace />;
    }

    if (usuario.rol === "inventario") {
      return <Navigate to="/dashboard/inventario" replace />;
    }
  } catch {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  }

  return <Navigate to="/login/opera" replace />;
};

export default NotFoundRedirect;