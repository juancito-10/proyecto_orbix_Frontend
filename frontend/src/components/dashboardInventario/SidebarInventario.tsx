import {
  LayoutDashboard,
  Package,
  ArrowRightLeft,
  LogOut
} from "lucide-react";
import "./SidebarInventario.css";

const SidebarInventario = () => {
  return (
    <aside className="sidebar-inventario">
      <div className="sidebar-titulo-inv">
        <div className="logo-container">
          <div className="logo-icon">
            <span className="logo-inner-circle"></span>
          </div>
          <h2 className="siti-inv">Orbix</h2>
        </div>
        <span className="badge-inventario">Inventario</span>
      </div>
      
      <nav className="navegacion-inv">
        <p className="navp-inv">MENÚ</p>
        <a href="/dashboard/inventario" className="active">
          <LayoutDashboard size={22} />
          <span>Dashboard</span>
        </a>

        <a href="/dashboard/inventario/productos">
          <Package size={22} />
          <span>Productos</span>
        </a>
        <a href="/dashboard/inventario/movimientos">
          <ArrowRightLeft size={22} />
          <span>Movimientos</span>
        </a>
      </nav>

      <div className="sidebar-footer-inv">
        <div className="user-profile-inv">
          <div className="user-avatar-inv">LH</div>
          <div className="user-info-inv">
            <p className="user-name-inv">Luis Herrera</p>
            <p className="user-role-inv">Inventario</p>
          </div>
        </div>
        <button className="btn-cambiar-perfil">
          <LogOut size={18} />
          <span>Cambiar perfil</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarInventario;
