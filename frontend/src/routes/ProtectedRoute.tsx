import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../services/auth.services";

type ProtectedRouteProps = {
  children: React.ReactNode;
  roles: string[];
};

type Usuario = {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
};

// Evita hacer varias comprobaciones de sesión
// al mismo tiempo si existen varias rutas protegidas.
let comprobandoSesion: Promise<Usuario> | null = null;

const obtenerUsuario = async (): Promise<Usuario> => {
  if (!comprobandoSesion) {
    comprobandoSesion = (async () => {
      try {
        // Primero comprobamos si existe una sesión válida.
        const response = await authService.me();

        return response.data as Usuario;
      } catch {
        // Si el access token expiró, intentamos renovarlo
        // utilizando el refresh token que está en una cookie HttpOnly.
        await authService.refresh();

        // Después del refresh volvemos a consultar el usuario.
        const response = await authService.me();

        return response.data as Usuario;
      } finally {
        comprobandoSesion = null;
      }
    })();
  }

  return comprobandoSesion;
};

const ProtectedRoute = ({
  children,
  roles,
}: ProtectedRouteProps) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);
  const [sesionValida, setSesionValida] = useState(true);

  useEffect(() => {
    let activo = true;

    const comprobarSesion = async () => {
      try {
        const usuarioActual = await obtenerUsuario();

        if (!activo) return;

        setUsuario(usuarioActual);
        setSesionValida(true);
      } catch {
        if (!activo) return;

        setUsuario(null);
        setSesionValida(false);
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    comprobarSesion();

    return () => {
      activo = false;
    };
  }, []);

  // Mientras comprobamos la cookie y la sesión,
  // no redirigimos al usuario.
  if (cargando) {
    return null;
  }

  // No existe una sesión válida.
  if (!sesionValida || !usuario) {
    return <Navigate to="/login/admin" replace />;
  }

  // El usuario está autenticado,
  // pero su rol no tiene permiso para esta ruta.
  if (!roles.includes(usuario.rol)) {
    return <Navigate to="/login/admin" replace />;
  }

  // Tiene sesión y el rol correspondiente.
  return children;
};

export default ProtectedRoute;