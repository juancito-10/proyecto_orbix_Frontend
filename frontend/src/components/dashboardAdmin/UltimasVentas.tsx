import "./UltimasVentas.css";

const UltimasVentas = () => {
  const ventas = [
    {
      pedido: "ORD-2847",
      cliente: "Tech Solutions SRL",
      producto: "Laptop Lenovo IdeaPad 5",
      monto: "$ 8.450",
      estado: "Completada",
    },
    {
      pedido: "ORD-2846",
      cliente: "Distribuidora Norte",
      producto: 'Monitor Samsung 27"',
      monto: "$ 3.200",
      estado: "En proceso",
    },
    {
      pedido: "ORD-2845",
      cliente: "María García",
      producto: "Zapatillas Nike Air Max",
      monto: "$ 1.890",
      estado: "Completada",
    },
    {
      pedido: "ORD-2844",
      cliente: "Comercial Del Sur",
      producto: "Set Utensilios Cocina",
      monto: "$ 4.620",
      estado: "Completada",
    },
    {
      pedido: "ORD-2843",
      cliente: "Juan Méndez",
      producto: "Smartphone Samsung...",
      monto: "$ 5.900",
      estado: "Pendiente",
    },
    {
      pedido: "ORD-2842",
      cliente: "Grupo Empresarial BC",
      producto: "Impresora HP LaserJet",
      monto: "$ 2.750",
      estado: "Cancelada",
    },
  ];

  return (
    <section className="ultimas-ventas">
      <h3>Últimas ventas</h3>

      <table>
        <thead>
          <tr>
            <th>PEDIDO</th>
            <th>CLIENTE</th>
            <th>PRODUCTO</th>
            <th>MONTO</th>
            <th>ESTADO</th>
          </tr>
        </thead>

        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.pedido}>
              <td>{venta.pedido}</td>
              <td>{venta.cliente}</td>
              <td>{venta.producto}</td>
              <td>{venta.monto}</td>
              <td>{venta.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UltimasVentas;