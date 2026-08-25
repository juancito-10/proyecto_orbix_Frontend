import { Receipt, UserPlus } from "lucide-react";
import "./ActividadReciente.css";

const actividades = [
  {
    tipo: "venta",
    nombre: "María García",
    descripcion: "Venta registrada",
    valor: "$ 1.890",
    tiempo: "Hace 20 min",
  },
  {
    tipo: "cliente",
    nombre: "Roberto Fuentes",
    descripcion: "Nuevo cliente",
    valor: "",
    tiempo: "Hace 1 h",
  },
  {
    tipo: "venta",
    nombre: "Juan Méndez",
    descripcion: "Venta registrada",
    valor: "$ 5.900",
    tiempo: "Hace 3 h",
  },
  {
    tipo: "venta",
    nombre: "Ferretería Central",
    descripcion: "Venta registrada",
    valor: "$ 3.800",
    tiempo: "Ayer",
  },
];

const ActividadReciente = () => {
  return (
    <section className="actividad-card">
      <h3>Actividad reciente</h3>

      <div className="actividad-lista">
        {actividades.map((actividad, index) => {
          const Icono =
            actividad.tipo === "cliente"
              ? UserPlus
              : Receipt;

          return (
            <div className="actividad-item" key={index}>
              <div
                className={`actividad-icono ${
                  actividad.tipo === "cliente"
                    ? "icono-cliente"
                    : "icono-venta"
                }`}
              >
                <Icono size={13} />
              </div>

              <div className="actividad-info">
                <strong>{actividad.descripcion}</strong>
                <span>{actividad.nombre}</span>
              </div>

              <div className="actividad-datos">
                {actividad.valor && (
                  <strong>{actividad.valor}</strong>
                )}

                <span>{actividad.tiempo}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ActividadReciente;
