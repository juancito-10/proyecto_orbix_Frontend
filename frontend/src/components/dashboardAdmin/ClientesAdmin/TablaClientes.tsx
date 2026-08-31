import "./TablaClientes.css";
interface TablaClientesProps {
  filtro: string;
  busqueda: string;
}

interface Cliente {
  cliente: string;
  id: string;
  contacto: string;
  correo: string;
  ciudad: string;
  total_compras: number;
  pedidos: number;
  perfil: string;
}

const Clientes: Cliente[] = [
  {
    cliente: "Tech Solutions SRL",
    id: "CLI-001",
    contacto: "Carlos Benítez",
    correo: "cbenitez@techsolutions.com",
    ciudad: "Buenos Aires",
    total_compras: 42800,
    pedidos: 12,
    perfil: "Corporativo",
  },
  {
    cliente: "Distribuidora Norte",
    id: "CLI-002",
    contacto: "Lucia Rodriguez",
    correo: "lucia@distnorte.com",
    ciudad: "Rosario",
    total_compras: 38500,
    pedidos: 28,
    perfil: "Mayorista",
  },
  {
    cliente: "María García",
    id: "CLI-003",
    contacto: "María García",
    correo: "mgarcia@gmail.com",
    ciudad: "Buenos Aires",
    total_compras: 8940,
    pedidos: 5,
    perfil: "Minorista",
  },
  {
    cliente: "Comercial Del Sur",
    id: "CLI-004",
    contacto: "Roberto Peralta",
    correo: "rperalta@comsur.net",
    ciudad: "Bahía Blanca",
    total_compras: 27600,
    pedidos: 18,
    perfil: "Mayorista",
  },
  {
    cliente: "Juan Méndez",
    id: "CLI-005",
    contacto: "Juan Méndez",
    correo: "jmendez@outlook.com",
    ciudad: "Córdoba",
    total_compras: 14200,
    pedidos: 7,
    perfil: "Minorista",
  },
  {
    cliente: "Grupo Empresarial BC",
    id: "CLI-006",
    contacto: "Andrea Castillo",
    correo: "acastillo@grupobc.com",
    ciudad: "Buenos Aires",
    total_compras: 65400,
    pedidos: 34,
    perfil: "Corporativo",
  },
  {
    cliente: "Supermercado La Unión",
    id: "CLI-007",
    contacto: "Pedro Vidal",
    correo: "pvidal@launion.com",
    ciudad: "Mar de Plata",
    total_compras: 31200,
    pedidos: 22,
    perfil: "Mayorista",
  },
  {
    cliente: "Ferretería Central",
    id: "CLI-008",
    contacto: "Diana Lozano",
    correo: "dlozano@ferretcentral.com",
    ciudad: "salta",
    total_compras: 18900,
    pedidos: 14,
    perfil: "Minorista",
  },
];

const TablaClientes = ({ filtro, busqueda }: TablaClientesProps) => {
  const textoBusqueda = busqueda.toLocaleLowerCase().trim();
  const clientesFiltrados = Clientes.filter((Cliente) => {
    const coincidePerfil = filtro === "Todos" || Cliente.perfil === filtro;

    const coincideBusqueda =
      Cliente.cliente.toLocaleLowerCase().includes(textoBusqueda) ||
      Cliente.id.toLocaleLowerCase().includes(textoBusqueda) ||
      Cliente.contacto.toLocaleLowerCase().includes(textoBusqueda) ||
      Cliente.ciudad.toLocaleLowerCase().includes(textoBusqueda);
    return coincidePerfil && coincideBusqueda;
  });
  return (
    <section className="tabla-clientes-wrapper">
      <div className="tabla-clientes-contenedor">
        <table className="tabla-clientes">
          <thead>
            <tr>
              <th>CLIENTE</th>
              <th>CONTACTO</th>
              <th>CIUDAD</th>
              <th>TOTAL COMPRAS</th>
              <th>PEDIDOS</th>
            </tr>
          </thead>

          <tbody>
            {clientesFiltrados.map((Cliente) => {
              const iniciales = Cliente.cliente
                .split(" ")
                .slice(0, 2)
                .map((nombre) => nombre[0])
                .join("");

              return (
                <tr key={Cliente.id}>
                  <td className="cliente-info">
                    <div className="cliente-contenido">
                      <div className="cliente-avatar">{iniciales}</div>

                      <div className="cliente-datos">
                        <span className="cliente-nombre">
                          {Cliente.cliente}
                        </span>

                        <span className="cliente-id">{Cliente.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="contacto-info">
                    <div className="contacto-datos">
                      <span className="contacto-nombre">
                        {Cliente.contacto}
                      </span>

                      <span className="contacto-correo">{Cliente.correo}</span>
                    </div>
                  </td>

                  <td className="ciudad-info">{Cliente.ciudad}</td>

                  <td className="compras-info">
                    $ {Cliente.total_compras.toLocaleString("es-CO")}
                  </td>

                  <td className="pedidos-info">{Cliente.pedidos}</td>
                </tr>
              );
            })}

            {clientesFiltrados.length === 0 && (
              <tr>
                <td colSpan={5} className="clientes-sin-resultados">
                  No se encontraron clientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TablaClientes;
