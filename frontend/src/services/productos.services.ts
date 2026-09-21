const BASE_URL = "http://localhost:3000/api/v1";

export type ProductoInventario = {
  idProducto: string;
  codigo: string;
  nombre: string;
  descripcion?: string;
  precioCompra: number;
  precio: number;
  stock: number;
  stockMinimo: number;
  estado: string;
  categoria: string;
  proveedor: string;
};

type ProductoApi = {
  idProducto: string;
  sku?: string | null;
  nombre: string;
  descripcion?: string | null;
  precioCompra: number | string;
  precio: number | string;
  stock: number;
  stockMinimo: number;
  estado: string;
  categoria?: {
    idCategoria: string;
    nombre: string;
  };
  proveedor?: {
    idProveedor: string;
    nombre: string;
    nit: string;
  } | null;
};

type RespuestaApi = {
  success: boolean;
  data: ProductoApi[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type CrearProducto = {
  sku?: string;
  nombre: string;
  descripcion?: string;
  precioCompra?: number;
  precio: number;
  stock?: number;
  stockMinimo?: number;
  estado?: "activo" | "inactivo" | "agotado" | "descontinuado";
  idCategoria: string;
  idProveedor?: string | null;
};

export type ActualizarProducto = {
  sku?: string;
  nombre?: string;
  descripcion?: string;
  precioCompra?: number;
  precio?: number;
  stock?: number;
  stockMinimo?: number;
  estado?: "activo" | "inactivo" | "agotado" | "descontinuado";
  idCategoria?: string;
  idProveedor?: string | null;
};

/*
 * CACHE DE PRODUCTOS
 */

let productosCache: ProductoInventario[] | null = null;

let productosPromise:
  | Promise<ProductoInventario[]>
  | null = null;

let productosToken: string | null = null;

let productosVersion = 0;

/*
 * INVALIDAR CACHE
 */

function invalidarCacheProductos() {
  productosCache = null;
  productosPromise = null;
  productosVersion++;
}

/*
 * OBTENER PRODUCTOS
 */

async function obtenerProductos(): Promise<ProductoInventario[]> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  /*
   * Si cambió el usuario/token,
   * limpiamos el cache anterior.
   */
  if (productosToken !== token) {
    productosCache = null;
    productosPromise = null;
    productosToken = token;
    productosVersion++;
  }

  /*
   * Si ya tenemos los productos,
   * no hacemos otra petición.
   */
  if (productosCache) {
    return productosCache;
  }

  /*
   * Si ya hay una petición en curso,
   * reutilizamos esa misma petición.
   */
  if (productosPromise) {
    return productosPromise;
  }

  const versionActual = productosVersion;

  productosPromise = (async () => {
    const response = await fetch(
      `${BASE_URL}/productos?limit=500`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data: RespuestaApi =
      await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        "Error al obtener los productos."
      );
    }

    const productos = data.data.map(
      (producto) => ({
        idProducto:
          producto.idProducto,

        codigo:
          producto.sku ??
          "Sin código",

        nombre:
          producto.nombre,

        descripcion:
          producto.descripcion ??
          "",

        precioCompra:
          Number(
            producto.precioCompra
          ),

        precio:
          Number(
            producto.precio
          ),

        stock:
          Number(
            producto.stock
          ),

        stockMinimo:
          Number(
            producto.stockMinimo
          ),

        estado:
          producto.estado,

        categoria:
          producto.categoria?.nombre ??
          "Sin categoría",

        proveedor:
          producto.proveedor?.nombre ??
          "Sin proveedor",
      })
    );

    /*
     * Solo guardamos la respuesta
     * si sigue siendo la versión actual.
     */
    if (
      versionActual ===
      productosVersion
    ) {
      productosCache = productos;
    }

    return productos;
  })();

  try {
    return await productosPromise;
  } finally {
    productosPromise = null;
  }
}

/*
 * CREAR PRODUCTO
 */

async function crearProducto(
  producto: CrearProducto,
): Promise<ProductoApi> {
  const token =
    localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "No hay sesión activa."
    );
  }

  const response = await fetch(
    `${BASE_URL}/productos`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
        Authorization:
          `Bearer ${token}`,
      },
      body: JSON.stringify(
        producto
      ),
    },
  );

  const data =
    await response.json();

  if (
    !response.ok ||
    !data.success
  ) {
    throw new Error(
      data.message ||
        "Error al crear el producto.",
    );
  }

  /*
   * El producto cambió.
   * Limpiamos el cache.
   */
  invalidarCacheProductos();

  return data.data;
}

/*
 * ELIMINAR PRODUCTO
 */

async function eliminarProducto(
  idProducto: string,
): Promise<void> {
  const token =
    localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "No hay sesión activa."
    );
  }

  const response =
    await fetch(
      `${BASE_URL}/productos/${idProducto}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      },
    );

  if (!response.ok) {
    const data =
      await response
        .json()
        .catch(() => null);

    throw new Error(
      data?.message ||
        "Error al eliminar el producto.",
    );
  }

  /*
   * El producto cambió.
   * Limpiamos el cache.
   */
  invalidarCacheProductos();
}

/*
 * ACTUALIZAR PRODUCTO
 */

async function actualizarProducto(
  idProducto: string,
  producto: ActualizarProducto,
): Promise<ProductoApi> {
  const token =
    localStorage.getItem("token");

  if (!token) {
    throw new Error(
      "No hay sesión activa."
    );
  }

  const response =
    await fetch(
      `${BASE_URL}/productos/${idProducto}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify(
          producto
        ),
      },
    );

  const data =
    await response.json();

  if (
    !response.ok ||
    !data.success
  ) {
    throw new Error(
      data.message ||
        "Error al actualizar el producto.",
    );
  }

  /*
   * El producto cambió.
   * Limpiamos el cache.
   */
  invalidarCacheProductos();

  return data.data;
}

const productosService = {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};

export default productosService;