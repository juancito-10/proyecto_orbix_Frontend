import {
  LayoutGrid,
  ShoppingBag,
  Users,
  Receipt,
  Target,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import LogoutButton from "../LogoutButton";

import "./Sidebar.css";

const ITEMS = [
  { path: "/dashboard/cajero", label: "Mi Dashboard", icon: LayoutGrid },
  { path: "/dashboard/cajero/productos", label: "Productos", icon: ShoppingBag },
  { path: "/dashboard/cajero/clientes", label: "Mis Clientes", icon: Users },
  { path: "/dashboard/cajero/ventas", label: "Mis Ventas", icon: Receipt },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="sidebar-vendedor">
      <div className="sidebar-vendedor-titulo">
        <div className="logo-orbix">
          <Target size={18} />
        </div>
        <h2 className="siti">Orbix</h2>
      </div>

      <span className="badge-rol">Vendedor</span>

      <p className="navp">MENÚ</p>
      <nav className="navegacion-vendedor">
        {ITEMS.map(({ path, label, icon: Icon }) => {
          const activo = pathname === path;
          return (
            <a key={path} href={path} className={activo ? "activo" : ""}>
              <Icon size={20} />
              <span>{label}</span>
            </a>
          );
        })}
      </nav>

      <div className="sidebar-vendedor-footer">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;