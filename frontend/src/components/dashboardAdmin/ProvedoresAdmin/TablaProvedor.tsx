import "./TablaProvedor.css";

interface TablaProvedoresProps {
  filtro: string;
  busqueda: string;
}

interface Provedor {
  provedor: string;
  id: string;
  contacto: string;
  correo: string;
  ciudad: string;
  total_compras: number;
  ordenes: number;
  ultima_orden: string;
  categoria: string;
  estado: string;
}

const provedores: Provedor[] = [
  {
    provedor: "Lenovo Argentina",
    id: "PRV-001",
    contacto: "Martín Sosa",
    correo: "msosa@lenovo.com.ar",
    ciudad: "Buenos Aires",
    total_compras: 124500,
    ordenes: 18,
    ultima_orden: "28 Jul 2026",
    categoria: "Electrónica",
    estado: "Activo",
  },
  {
    provedor: "Samsung Corp",
    id: "PRV-002",
    contacto: "Valeria Kim",
    correo: "vkim@samsung.com.ar",
    ciudad: "Buenos Aires",
    total_compras: 98300,
    ordenes: 24,
    ultima_orden: "25 Jul 2026",
    categoria: "Electrónica",
    estado: "Activo",
  },
  {
    provedor: "Nike Distribuidora",
    id: "PRV-003",
    contacto: "Pablo Sánchez",
    correo: "psanchez@nikedist.com",
    ciudad: "Buenos Aires",
    total_compras: 47200,
    ordenes: 11,
    ultima_orden: "20 Jul 2026",
    categoria: "Ropa y calzado",
    estado: "Activo",
  },
  {
    provedor: "Menaje del Sur",
    id: "PRV-004",
    contacto: "Claudia Ríos",
    correo: "crios@menajesur.com",
    ciudad: "Bahía Blanca",
    total_compras: 31600,
    ordenes: 9,
    ultima_orden: "18 Jul 2026",
    categoria: "Hogar",
    estado: "Activo",
  },
  {
    provedor: "HP Argentina",
    id: "PRV-005",
    contacto: "Fernando Lagos",
    correo: "flagos@hp.com.ar",
    ciudad: "Buenos Aires",
    total_compras: 52800,
    ordenes: 14,
    ultima_orden: "15 Jul 2026",
    categoria: "Electrónica",
    estado: "Inactivo",
  },
  {
    provedor: "Sony Corp",
    id: "PRV-006",
    contacto: "Natalia Fujimoto",
    correo: "nfujimoto@sony.com.ar",
    ciudad: "Buenos Aires",
    total_compras: 38900,
    ordenes: 10,
    ultima_orden: "12 Jul 2026",
    categoria: "Electrónica",
    estado: "Activo",
  },
  {
    provedor: "Adidas Distribuidora",
    id: "PRV-007",
    contacto: "Ricardo Blanco",
    correo: "rblanco@adidastad.com",
    ciudad: "Rosario",
    total_compras: 29400,
    ordenes: 8,
    ultima_orden: "10 Jul 2026",
    categoria: "Ropa y calzado",
    estado: "Activo",
  },
  {
    provedor: "Distribuidora Norte",
    id: "PRV-008",
    contacto: "Lucía Rodríguez",
    correo: "lucia@distnorte.com",
    ciudad: "Rosario",
    total_compras: 61200,
    ordenes: 22,
    ultima_orden: "29 Jul 2026",
    categoria: "Alimentos",
    estado: "Activo",
  },
  {
    provedor: "Olivares SA",
    id: "PRV-009",
    contacto: "Eduardo Molina",
    correo: "emolina@olivaresa.com",
    ciudad: "San Juan",
    total_compras: 18700,
    ordenes: 7,
    ultima_orden: "05 Jul 2026",
    categoria: "Alimentos",
    estado: "Activo",
  },
  {
    provedor: "Logitech Corp",
    id: "PRV-010",
    contacto: "Andrea Vega",
    correo: "avega@logitech.com.ar",
    ciudad: "Buenos Aires",
    total_compras: 22100,
    ordenes: 6,
    ultima_orden: "22 Jul 2026",
    categoria: "Electrónica",
    estado: "Inactivo",
  },
];

const TablaProvedor = ({
  filtro,
  busqueda,
}: TablaProvedoresProps) => {
  const textoBusqueda = busqueda.toLocaleLowerCase().trim();

  const clientesFiltrados = provedores.filter((Provedor) => {
    const coincidePerfil =
      filtro === "Todos" || Provedor.categoria === filtro;

    const coincideBusqueda =
      Provedor.provedor.toLocaleLowerCase().includes(textoBusqueda) ||
      Provedor.id.toLocaleLowerCase().includes(textoBusqueda) ||
      Provedor.contacto.toLocaleLowerCase().includes(textoBusqueda) ||
      Provedor.ciudad.toLocaleLowerCase().includes(textoBusqueda);

    return coincidePerfil && coincideBusqueda;
  });

  return (
    <section className="tabla-provedores-wrapper">
      <div className="tabla-provedores-contenedor">
        <table className="tabla-provedores">
          <thead>
            <tr>
              <th>PROVEEDOR</th>
              <th>CONTACTO</th>
              <th>CIUDAD</th>
              <th>TOTAL COMPRADO</th>
              <th>ÓRDENES</th>
              <th>ÚLTIMA ORDEN</th>
              <th>CATEGORIA</th>
              <th>ESTADO</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {clientesFiltrados.map((Provedor) => {
              const iniciales = Provedor.provedor
                .split(" ")
                .slice(0, 2)
                .map((nombre) => nombre[0])
                .join("");

              return (
                <tr key={Provedor.id}>
                  <td className="provedor-info">
                    <div className="provedor-contenido">
                      <div className="provedor-avatar">
                        {iniciales}
                      </div>

                      <div className="provedor-datos">
                        <span className="provedor-nombre">
                          {Provedor.provedor}
                        </span>

                        <span className="provedor-id">
                          {Provedor.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="contacto-info">
                    <div className="contacto-datos">
                      <span className="contacto-nombre">
                        {Provedor.contacto}
                      </span>

                      <span className="contacto-correo">
                        {Provedor.correo}
                      </span>
                    </div>
                  </td>

                  <td className="ciudad-info">
                    {Provedor.ciudad}
                  </td>

                  <td className="compras-info">
                    $ {Provedor.total_compras.toLocaleString("es-CO")}
                  </td>

                  <td className="ordenes-info">
                    {Provedor.ordenes}
                  </td>

                  <td className="ultima-orden-info">
                    {Provedor.ultima_orden}
                  </td>

                  <td className="categoria-info">
                    {Provedor.categoria}
                  </td>

                  <td className="estado-info">
                    {Provedor.estado}
                  </td>

                  <td className="ver-info">
                    <button className="boton-ver">
                      Ver
                    </button>
                  </td>
                </tr>
              );
            })}

            {clientesFiltrados.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="provedores-sin-resultados"
                >
                  No se encontraron proveedores.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TablaProvedor;