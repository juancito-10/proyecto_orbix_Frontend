const BASE_URL = "http://localhost:3000/api/v1";

export type Categoria = {
  idCategoria: string;
  nombre: string;
  descripcion?: string | null;
};

export type RespuestaApi = {
  success: boolean;
  data: Categoria[];
  message?: string;
};

let categoriasCache: Categoria[] | null = null;
let categoriasPromise: Promise<Categoria[]> | null = null;
let categoriasToken: string | null = null;
let categoriasVersion = 0;

function invalidarCacheCategorias() {
  categoriasCache = null;
  categoriasPromise = null;
  categoriasVersion++;
}

async function obtenerCategorias(): Promise<Categoria[]> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  if (categoriasToken !== token) {
    categoriasCache = null;
    categoriasPromise = null;
    categoriasToken = token;
    categoriasVersion++;
  }

  if (categoriasCache) {
    return categoriasCache;
  }

  if (categoriasPromise) {
    return categoriasPromise;
  }

  const versionActual = categoriasVersion;

  categoriasPromise = (async () => {
    const response = await fetch(
      `${BASE_URL}/categorias?limit=500`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data: RespuestaApi = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Error al obtener las categorías."
      );
    }

    if (versionActual === categoriasVersion) {
      categoriasCache = data.data;
    }

    return data.data;
  })();

  try {
    return await categoriasPromise;
  } finally {
    categoriasPromise = null;
  }
}

async function crearCategoria(
  nombre: string,
  descripcion?: string
): Promise<Categoria> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  const response = await fetch(`${BASE_URL}/categorias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre,
      descripcion: descripcion || null,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Error al crear la categoría."
    );
  }

  invalidarCacheCategorias();

  return data.data;
}

const categoriasService = {
  obtenerCategorias,
  crearCategoria,
};

export default categoriasService;