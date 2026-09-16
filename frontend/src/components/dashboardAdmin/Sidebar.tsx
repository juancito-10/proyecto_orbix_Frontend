import {
  LayoutDashboard,
  Users,
  Building2,
  Package,
  TrendingUp,
  FileText,
  Pin,
  PinOff,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

interface SidebarProps {
  isPinned?: boolean;
  onTogglePin?: () => void;
}

const Sidebar = ({ isPinned: propIsPinned, onTogglePin }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [internalPinned, setInternalPinned] = useState(false);

  const isPinned = propIsPinned !== undefined ? propIsPinned : internalPinned;
  const handleTogglePin = () => {
    if (onTogglePin) onTogglePin();
    else setInternalPinned(!internalPinned);
  };

  const menuItems = [
    {
      path: "/dashboard/admin",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      exact: true,
    },
    {
      path: "/dashboard/admin/empleados",
      icon: <Users size={20} />,
      label: "Empleados",
    },
    {
      path: "/dashboard/admin/clientes",
      icon: <Users size={20} />,
      label: "Clientes",
    },
    {
      path: "/dashboard/admin/proveedores",
      icon: <Building2 size={20} />,
      label: "Proveedores",
    },
    {
      path: "/dashboard/admin/inventario",
      icon: <Package size={20} />,
      label: "Inventario",
    },
    {
      path: "/dashboard/admin/ventas",
      icon: <TrendingUp size={20} />,
      label: "Ventas",
    },
    {
      path: "/dashboard/admin/reportes",
      icon: <FileText size={20} />,
      label: "Reportes",
    },
  ];

  return (
    <aside
      className={`sidebar ${isPinned ? "pinned" : "unpinned"}`}
    >
      <div className="sidebar-titulo">
        <div className="logo-container">
          <div className="logo-icon">
            <span className="logo-inner-circle"></span>
          </div>
          <h2 className="siti">Orbix</h2>
        </div>
        <span className="badge-inventario" style={{ marginLeft: "10px" }}>
          Admin
        </span>
      </div>

      <nav className="navegacion">
        <p className="navp">MEN</p>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              item.exact
                ? currentPath === item.path
                  ? "activo"
                  : ""
                : currentPath.startsWith(item.path)
                  ? "activo"
                  : ""
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer-inv">
        <button
          className="btn-cambiar-perfil toggle-pin-btn"
          onClick={handleTogglePin}
          title={isPinned ? "Desanclar barra" : "Anclar barra"}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%" }}
        >
          {isPinned ? <PinOff size={18} /> : <Pin size={18} />}
          <span>{isPinned ? "Desanclar" : "Anclar barra"}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
