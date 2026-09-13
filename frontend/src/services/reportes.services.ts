const BASE_URL = "http://localhost:3000/api/v1";

/* =========================================================
   TIPOS
========================================================= */

export type ResumenReporte = {
  ventasCompletadas: number;
  ingresosTotales: number | string;
  ventasPendientes: number;
  productosAgotados: number;
  totalClientes: number;
  totalProductos: number;
};

export type VentaPorCategoria = {
  categoria: string;
  totalVendido: number | string;
};

export type UltimaVenta = {
  id_venta: string;
  fecha: string;
  total: number | string;
  estado: string;
  cliente: string;
  vendedor: string;
};

export type ProductoPorProveedor = {
  id_proveedor: string;
  proveedor: string;
  id_producto: string;
  producto: string;
  stock: number;
};

export type Reporte = {
  idReporte: string;
  nombre: string;
  tipo: string;
  parametros?: Record<string, unknown> | null;
  fechaGenerado: string;

  usuario?: {
    idUsuario: string;
    nombre: string;
  };
};

type RespuestaApi<T> = {
  success: boolean;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

/* =========================================================
   FUNCIÓN PARA OBTENER TOKEN
========================================================= */

function obtenerToken(): string {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay sesión activa.");
  }

  return token;
}

/* =========================================================
   RESUMEN GENERAL
========================================================= */

async function obtenerResumen(): Promise<ResumenReporte> {
  const token = obtenerToken();

  const response = await fetch(
    `${BASE_URL}/reportes/resumen`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: RespuestaApi<ResumenReporte> =
    await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      "Error al obtener el resumen de reportes."
    );
  }

  return data.data;
}

/* =========================================================
   VENTAS POR CATEGORÍA
========================================================= */

async function obtenerVentasPorCategoria(): Promise<
  VentaPorCategoria[]
> {
  const token = obtenerToken();

  const response = await fetch(
    `${BASE_URL}/reportes/ventas-por-categoria`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: RespuestaApi<VentaPorCategoria[]> =
    await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      "Error al obtener las ventas por categoría."
    );
  }

  return data.data.map((item) => ({
    categoria: item.categoria,
    totalVendido: Number(item.totalVendido),
  }));
}

/* =========================================================
   ÚLTIMAS VENTAS
========================================================= */

async function obtenerUltimasVentas(
  limit = 10
): Promise<UltimaVenta[]> {
  const token = obtenerToken();

  const response = await fetch(
    `${BASE_URL}/reportes/ultimas-ventas?limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: RespuestaApi<UltimaVenta[]> =
    await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      "Error al obtener las últimas ventas."
    );
  }

  return data.data.map((venta) => ({
    ...venta,
    total: Number(venta.total),
  }));
}

/* =========================================================
   PRODUCTOS POR PROVEEDOR
========================================================= */

async function obtenerProductosPorProveedor(): Promise<
  ProductoPorProveedor[]
> {
  const token = obtenerToken();

  const response = await fetch(
    `${BASE_URL}/reportes/productos-por-proveedor`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: RespuestaApi<ProductoPorProveedor[]> =
    await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      "Error al obtener los productos por proveedor."
    );
  }

  return data.data.map((producto) => ({
    ...producto,
    stock: Number(producto.stock),
  }));
}

/* =========================================================
   REPORTES GUARDADOS
========================================================= */

async function obtenerReportes(): Promise<Reporte[]> {
  const token = obtenerToken();

  const response = await fetch(
    `${BASE_URL}/reportes?limit=500`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: RespuestaApi<Reporte[]> =
    await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      "Error al obtener los reportes."
    );
  }

  return data.data;
}

/* =========================================================
   OBTENER REPORTE POR ID
========================================================= */

async function obtenerReportePorId(
  idReporte: string
): Promise<Reporte> {
  const token = obtenerToken();

  const response = await fetch(
    `${BASE_URL}/reportes/${idReporte}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: RespuestaApi<Reporte> =
    await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      "Error al obtener el reporte."
    );
  }

  return data.data;
}

/* =========================================================
   CREAR REGISTRO DE REPORTE
========================================================= */

export type CrearReporte = {
  nombre: string;
  tipo: string;
  parametros?: Record<string, unknown> | null;
};

async function crearReporte(
  reporte: CrearReporte
): Promise<Reporte> {
  const token = obtenerToken();

  const response = await fetch(
    `${BASE_URL}/reportes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reporte),
    }
  );

  const data: RespuestaApi<Reporte> =
    await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      "Error al guardar el reporte."
    );
  }

  return data.data;
}

/* =========================================================
   ELIMINAR REPORTE
========================================================= */

async function eliminarReporte(
  idReporte: string
): Promise<void> {
  const token = obtenerToken();

  const response = await fetch(
    `${BASE_URL}/reportes/${idReporte}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(
      data?.message ||
        "Error al eliminar el reporte."
    );
  }
}

/* =========================================================
   EXPORTACIÓN DEL SERVICIO
========================================================= */

const reportesService = {
  obtenerResumen,
  obtenerVentasPorCategoria,
  obtenerUltimasVentas,
  obtenerProductosPorProveedor,
  obtenerReportes,
  obtenerReportePorId,
  crearReporte,
  eliminarReporte,
};

export default reportesService;