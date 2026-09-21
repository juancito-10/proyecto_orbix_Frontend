const BASE_URL = "http://localhost:3000/api/v1";

export type Proveedor = {
  idProveedor: string;
  nombre: string;
  nit: string;
  telefono?: string | null;
  correo?: string | null;
  direccion?: string | null;
  ciudad?: string | null;
  estado?: string;
};

export type RespuestaApi = {
  success: boolean;
  data: Proveedor[];
  message?: string;
};

let proveedoresCache: Proveedor[] | null = null;
let proveedoresPromise: Promise<Proveedor[]> | null = null;
let proveedoresToken: string | null = null;
let proveedoresVersion = 0;

function invalidarCacheProveedores() {
  proveedoresCache = null;
  proveedoresPromise = null;
  proveedoresVersion++;
}

async function obtenerProveedores(): Promise<Proveedor[]> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  if (proveedoresToken !== token) {
    proveedoresCache = null;
    proveedoresPromise = null;
    proveedoresToken = token;
    proveedoresVersion++;
  }

  if (proveedoresCache) {
    return proveedoresCache;
  }

  if (proveedoresPromise) {
    return proveedoresPromise;
  }

  const versionActual = proveedoresVersion;

  proveedoresPromise = (async () => {
    const response = await fetch(
      `${BASE_URL}/proveedores?limit=500`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data: RespuestaApi = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Error al obtener los proveedores."
      );
    }

    if (versionActual === proveedoresVersion) {
      proveedoresCache = data.data;
    }

    return data.data;
  })();

  try {
    return await proveedoresPromise;
  } finally {
    proveedoresPromise = null;
  }
}

async function crearProveedor(
  nombre: string,
  nit: string,
  telefono?: string,
  correo?: string,
  direccion?: string,
  ciudad?: string,
  estado?: string
): Promise<Proveedor> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  const response = await fetch(`${BASE_URL}/proveedores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre,
      nit,
      telefono: telefono || null,
      correo: correo || null,
      direccion: direccion || null,
      ciudad: ciudad || null,
      estado: estado || undefined,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Error al crear el proveedor."
    );
  }

  invalidarCacheProveedores();

  return data.data;
}

async function actualizarProveedor(
  idProveedor: string,
  nombre: string,
  nit: string,
  telefono?: string,
  correo?: string,
  direccion?: string,
  ciudad?: string,
  estado?: string
): Promise<Proveedor> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  const response = await fetch(
    `${BASE_URL}/proveedores/${idProveedor}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre,
        nit,
        telefono: telefono || null,
        correo: correo || null,
        direccion: direccion || null,
        ciudad: ciudad || null,
        estado: estado || undefined,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Error al actualizar el proveedor."
    );
  }

  invalidarCacheProveedores();

  return data.data;
}

const proveedoresService = {
  obtenerProveedores,
  crearProveedor,
  actualizarProveedor,
};

export default proveedoresService;