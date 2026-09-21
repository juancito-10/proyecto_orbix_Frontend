const BASE_URL = "http://localhost:3000/api/v1";

export type ClienteNuevo = {
  nombre: string;
  documento: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  ciudad?: string;
  segmento?: "minorista" | "mayorista" | "frecuente" | "nuevo";
};

export type Cliente = {
  idCliente: string;
  codigoCliente?: string | null;
  nombre: string;
  documento: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  ciudad?: string;
  segmento?: string;
};

type RespuestaClientes = {
  success: boolean;
  data: Cliente[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
};

let clientesCache: Cliente[] | null = null;
let clientesPromise: Promise<Cliente[]> | null = null;
let clientesToken: string | null = null;
let clientesVersion = 0;

function invalidarCacheClientes() {
  clientesCache = null;
  clientesPromise = null;
  clientesVersion++;
}

const clienteService = {
  async crear(cliente: ClienteNuevo) {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No hay sesión activa.");
    }

    const response = await fetch(`${BASE_URL}/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cliente),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Error al registrar el cliente."
      );
    }

    invalidarCacheClientes();

    return data;
  },

  async obtenerClientes(): Promise<Cliente[]> {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No hay sesión activa.");
    }

    if (clientesToken !== token) {
      clientesCache = null;
      clientesPromise = null;
      clientesToken = token;
      clientesVersion++;
    }

    if (clientesCache) {
      return clientesCache;
    }

    if (clientesPromise) {
      return clientesPromise;
    }

    const versionActual = clientesVersion;

    clientesPromise = (async () => {
      const response = await fetch(
        `${BASE_URL}/clientes?limit=500`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: RespuestaClientes =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Error al obtener los clientes."
        );
      }

      if (versionActual === clientesVersion) {
        clientesCache = data.data;
      }

      return data.data;
    })();

    try {
      return await clientesPromise;
    } finally {
      clientesPromise = null;
    }
  },
};

export default clienteService;