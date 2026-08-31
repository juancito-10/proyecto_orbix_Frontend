import "./CarsProvedor.css";

const CardsProvedor = () => {
  return (
    <section className="cards-ventas">

      <div className="card-venta">
        <div className="card-venta-titulo">
          <span className="punto-verde"></span>
          <span>Total proveedores</span>
        </div>

        <h3>10</h3>
      </div>

      <div className="card-venta">
        <div className="card-venta-titulo">
          <span className="punto-azul"></span>
          <span>Activos</span>
        </div>

        <h3>8</h3>
      </div>

      <div className="card-venta">
        <div className="card-venta-titulo">
          <span className="punto-naranja"></span>
          <span>Inactivos</span>
        </div>

        <h3>2</h3>
      </div>

      <div className="card-venta">
        <div className="card-venta-titulo">
          <span className="punto-rojo"></span>
          <span>total comprado</span>
        </div>

        <h3>$ 524.700</h3>
      </div>

    </section>
  );
};

export default CardsProvedor;