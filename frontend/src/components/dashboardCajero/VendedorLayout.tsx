import React, { useState } from "react";
import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";
import BuscadorGlobal from "./BuscadorGlobal";
import ProfileDropdown from "../ProfileDropdown";

import "./VendedorLayout.css";

type VendedorLayoutProps = {
  vista: string;
  children: React.ReactNode;
};

const VendedorLayout = ({ vista, children }: VendedorLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(true);

  return (
    <main className={`vendedor-app ${isSidebarPinned ? 'sidebar-pinned' : 'sidebar-unpinned'}`}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isPinned={isSidebarPinned} onTogglePin={() => setIsSidebarPinned(!isSidebarPinned)} />

      {/* Contenido */}
      <div className="vendedor-body">
        {/* Barra superior */}
        <header className="vendedor-topbar">
          <p className="vendedor-breadcrumb">
            <span className="vendedor-breadcrumb-muted">Orbix</span>
            <span className="vendedor-breadcrumb-sep">/</span>
            <span className="vendedor-breadcrumb-rol">Vendedor</span>
            <span className="vendedor-breadcrumb-sep">/</span>
            <strong>{vista}</strong>
          </p>

          <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "none" }}><Menu size={24} /></button>
          <div className="vendedor-topbar-acciones">
            {/* Buscador global */}
            <BuscadorGlobal />

            

            {/* Usuario */}
            <ProfileDropdown />
          </div>
        </header>

        {/* Contenido de la vista */}
        <main className="vendedor-main">{children}</main>
      </div>
    </main>
  );
};

export default VendedorLayout;


