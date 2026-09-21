import { LayoutGrid, ShoppingBag, Users, Receipt, Pin, PinOff } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import "./Sidebar.css";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isPinned?: boolean;
  onTogglePin?: () => void;
}

const ITEMS = [
  { path: "/dashboard/vendedor", label: "Mi Dashboard", icon: LayoutGrid },
  { path: "/dashboard/vendedor/productos", label: "Productos", icon: ShoppingBag },
  { path: "/dashboard/vendedor/clientes", label: "Mis Clientes", icon: Users },
  { path: "/dashboard/vendedor/ventas", label: "Mis Ventas", icon: Receipt },
];

const Sidebar = ({ isPinned: propIsPinned, onTogglePin }: SidebarProps) => {
  const { pathname } = useLocation();
  const [internalPinned, setInternalPinned] = useState(false);

  const isPinned = propIsPinned !== undefined ? propIsPinned : internalPinned;

  const handleTogglePin = () => {
    if (onTogglePin) onTogglePin();
    else setInternalPinned(!internalPinned);
  };

  return (
    <aside className={`vendedor-sidebar ${isPinned ? 'pinned' : 'unpinned'}`}>
      {/* Header */}
      <div className="vendedor-sidebar-top">
        <div className="logo-container">
          <div className="logo-icon-orbix logo-ventas">O</div>
          <h2 className="siti">Orbix</h2>
        </div>
        <div className="badge-ventas">Ventas</div>
      </div>

      {/* Nav */}
      <nav className="vendedor-nav">
        <p className="vendedor-nav-label">MENU</p>
        
        {ITEMS.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/dashboard/vendedor" && pathname.startsWith(item.path));
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={isActive ? "activo" : ""}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer (Logout) */}
      <div className="vendedor-sidebar-footer">
        <button 
          className="btn-cambiar-perfil toggle-pin-btn" 
          onClick={handleTogglePin}
          title={isPinned ? "Desanclar barra" : "Anclar barra"}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", marginBottom: "10px" }}
        >
          {isPinned ? <PinOff size={18} /> : <Pin size={18} />}
          <span>{isPinned ? "Desanclar" : "Anclar barra"}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;








