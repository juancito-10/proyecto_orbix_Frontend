import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../services/auth.services";

type Usuario = {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
};

const NotFoundRedirect = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await authService.me();

        setUsuario(response.data);
      } catch {
        try {
          await authService.refresh();

          const response = await authService.me();

          setUsuario(response.data);
        } catch {
          setUsuario(null);
        }
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuario();
  }, []);

  if (cargando) {
    return null;
  }

  if (!usuario) {
    return <Navigate to="/login/opera" replace />;
  }

  if (usuario.rol === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  if (usuario.rol === "vendedor") {
    return <Navigate to="/dashboard/vendedor" replace />;
  }

  if (usuario.rol === "inventario") {
    return <Navigate to="/dashboard/inventario" replace />;
  }

  return <Navigate to="/login/opera" replace />;
};

export default NotFoundRedirect;