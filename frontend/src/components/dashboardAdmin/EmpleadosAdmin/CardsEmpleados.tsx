import { useEffect, useState } from "react";
import "./CardsEmpleados.css";
import usuariosService from "../../../services/usuarios.services";

interface CardsEmpleadosProps {
  actualizar: number;
}

const CardsEmpleados = ({
  actualizar,
}: CardsEmpleadosProps) => {
  const [totalEmpleados, setTotalEmpleados] = useState(0);
  const [vendedores, setVendedores] = useState(0);
  const [inventario, setInventario] = useState(0);
  const [inactivos, setInactivos] = useState(0);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const usuarios =
          await usuariosService.obtenerUsuarios();

        setTotalEmpleados(usuarios.length);

        setVendedores(
          usuarios.filter(
            (usuario) =>
              usuario.rol === "vendedor",
          ).length,
        );

        setInventario(
          usuarios.filter(
            (usuario) =>
              usuario.rol === "inventario",
          ).length,
        );

        setInactivos(
          usuarios.filter(
            (usuario) =>
              usuario.estado === "inactivo",
          ).length,
        );
      } catch (error) {
        console.error(
          "Error al cargar los usuarios:",
          error,
        );
      }
    };

    cargarUsuarios();
  }, [actualizar]);

  return (
    <section className="cards-empleados">
      <div className="card-empleado">
        <div className="card-empleado-titulo">
          <span className="punto-verde"></span>
          <span>Total empleados</span>
        </div>

        <h3>{totalEmpleados}</h3>
      </div>

      <div className="card-empleado">
        <div className="card-empleado-titulo">
          <span className="punto-morado"></span>
          <span>Vendedores</span>
        </div>

        <h3>{vendedores}</h3>
      </div>

      <div className="card-empleado">
        <div className="card-empleado-titulo">
          <span className="punto-azul"></span>
          <span>Inventario</span>
        </div>

        <h3>{inventario}</h3>
      </div>

      <div className="card-empleado">
        <div className="card-empleado-titulo">
          <span className="punto-gris"></span>
          <span>Inactivos</span>
        </div>

        <h3>{inactivos}</h3>
      </div>
    </section>
  );
};

export default CardsEmpleados;