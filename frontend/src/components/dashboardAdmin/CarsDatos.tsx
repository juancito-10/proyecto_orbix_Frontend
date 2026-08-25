import {
  CircleDollarSign,
  ShoppingBag,
  UsersRound,
  BriefcaseBusiness,
} from "lucide-react";

import "./CarsDatos.css";

const CarsDatos = () => {
  const datos = [
    {
      titulo: "Ingresos del mes",
      valor: "$104.700",
      icon: CircleDollarSign,
    },
    {
      titulo: "Pedidos totales",
      valor: "248",
      icon: ShoppingBag,
    },
    {
      titulo: "Clientes activos",
      valor: "142",
      icon: UsersRound,
    },
    {
      titulo: "Valor de inventario",
      valor: "$382.340",
      icon: BriefcaseBusiness,
    },
  ];

  return (
    <div className="dashboard-cards">
      {datos.map((dato) => {
        const Icono = dato.icon;

        return (
          <div className="card" key={dato.titulo}>
            <div className="titulo-cars">
              <p>{dato.titulo}</p>
              <Icono size={24} />
            </div>
            <h2>{dato.valor}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default CarsDatos;
