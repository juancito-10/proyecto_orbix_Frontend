const BASE_URL = "http://localhost:3000/api/v1";

export interface CrearUsuario {
  nombre: string;
  correo: string;
  correoPersonal?: string;
  password: string;

  codigoEmpleado?: string;
  celular?: string;
  ciudad?: string;
  fechaIngreso?: string;

  rol?:
    | "admin"
    | "vendedor"
    | "inventario"
    | "consulta";

  estado?:
    | "activo"
    | "inactivo";
}

export interface EditarUsuario {
  nombre?: string;
  correo?: string;
  correoPersonal?: string;
  password?: string;

  codigoEmpleado?: string;
  celular?: string;
  ciudad?: string;
  fechaIngreso?: string;

  rol?:
    | "admin"
    | "vendedor"
    | "inventario"
    | "consulta";

  estado?:
    | "activo"
    | "inactivo";
}

export interface Usuario {
  idUsuario: string;
  nombre: string;
  correo: string;
  correoPersonal?: string;

  codigoEmpleado?: string;
  celular?: string;
  ciudad?: string;
  fechaIngreso?: string;

  rol:
    | "admin"
    | "vendedor"
    | "inventario"
    | "consulta";

  estado:
    | "activo"
    | "inactivo";
}

async function obtenerUsuarios(): Promise<Usuario[]> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  const response = await fetch(
    `${BASE_URL}/usuarios?limit=500`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
        "Error al obtener los usuarios.",
    );
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  if (
    data.data &&
    Array.isArray(data.data.items)
  ) {
    return data.data.items;
  }

  return [];
}

async function obtenerUsuarioPorId(
  idUsuario: string,
): Promise<Usuario> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  const response = await fetch(
    `${BASE_URL}/usuarios/${idUsuario}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
        "Error al obtener el usuario.",
    );
  }

  return data.data;
}

async function crearUsuario(
  usuario: CrearUsuario,
): Promise<Usuario> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  const response = await fetch(
    `${BASE_URL}/usuarios`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    },
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
        "Error al crear el usuario.",
    );
  }

  return data.data;
}

async function editarUsuario(
  idUsuario: string,
  usuario: EditarUsuario,
): Promise<Usuario> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  const response = await fetch(
    `${BASE_URL}/usuarios/${idUsuario}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    },
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
        "Error al editar el usuario.",
    );
  }

  return data.data;
}

async function eliminarUsuario(
  idUsuario: string,
): Promise<void> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  const response = await fetch(
    `${BASE_URL}/usuarios/${idUsuario}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    let data = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    throw new Error(
      data?.message ||
        "Error al eliminar el usuario.",
    );
  }
}

const usuariosService = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
};

export default usuariosService;