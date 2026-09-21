const BASE_URL = "http://localhost:3000/api/v1";

export type ProductoInventario = {
  idProducto: string;
  nombre: string;
  precio: number | string;
  stock: number;
};

type RespuestaProductos = {
  success: boolean;
  data: ProductoInventario[];
};

let productosCache: ProductoInventario[] | null = null;
let productosPromise: Promise<ProductoInventario[]> | null = null;
let productosToken: string | null = null;
let productosVersion = 0;

function invalidarCacheProductos() {
  productosCache = null;
  productosPromise = null;
  productosVersion++;
}

async function obtenerProductos(): Promise<ProductoInventario[]> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  if (productosToken !== token) {
    productosCache = null;
    productosPromise = null;
    productosToken = token;
    productosVersion++;
  }

  if (productosCache) {
    return productosCache;
  }

  if (productosPromise) {
    return productosPromise;
  }

  const versionActual = productosVersion;

  productosPromise = (async () => {
    const response = await fetch(`${BASE_URL}/productos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: RespuestaProductos = await response.json();

    if (!response.ok || !data.success) {
      throw new Error("Error al obtener los productos.");
    }

    if (versionActual === productosVersion) {
      productosCache = data.data;
    }

    return data.data;
  })();

  try {
    return await productosPromise;
  } finally {
    productosPromise = null;
  }
}

async function obtenerValorInventario(): Promise<number> {
  const productos = await obtenerProductos();

  const valorTotal = productos.reduce((total, producto) => {
    return total + Number(producto.precio) * Number(producto.stock);
  }, 0);

  return valorTotal;
}

const inventarioService = {
  obtenerProductos,
  obtenerValorInventario,
};

export default inventarioService;