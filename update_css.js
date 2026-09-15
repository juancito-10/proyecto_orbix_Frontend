const fs = require('fs');

function generateCSS(prefix, bg, activeBg, activeText, textColor) {
  const cls = {
    sidebar: prefix === 'vendedor' ? '.vendedor-sidebar' : prefix === 'admin' ? '.sidebar' : '.sidebar-inventario',
    top: prefix === 'vendedor' ? '.vendedor-sidebar-top' : prefix === 'admin' ? '.sidebar-titulo' : '.sidebar-titulo-inv',
    nav: prefix === 'vendedor' ? '.vendedor-nav' : prefix === 'admin' ? '.navegacion' : '.navegacion-inv',
    navLabel: prefix === 'vendedor' ? '.vendedor-nav-label' : prefix === 'admin' ? '.navp' : '.navp-inv',
    siti: prefix === 'vendedor' ? '.vendedor-logo-nombre' : prefix === 'admin' ? '.siti' : '.siti-inv',
    logo: prefix === 'vendedor' ? '.vendedor-logo' : prefix === 'admin' ? '.logo-container' : '.logo-container',
    footer: prefix === 'vendedor' ? '.vendedor-sidebar-footer' : prefix === 'admin' ? '.sidebar-footer-inv' : '.sidebar-footer-inv'
  };
  
  return `
${cls.sidebar} {
  width: 240px;
  height: 100vh;
  background-color: ${bg};
  color: ${textColor};
  position: sticky;
  top: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  user-select: none;
  z-index: 50;
}

${cls.top} {
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

${cls.logo} {
  display: flex;
  align-items: center;
  gap: 10px;
}

${cls.siti} {
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 19px;
  color: #ffffff;
  letter-spacing: -0.01em;
  margin: 0;
}

${cls.nav} {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  flex: 1;
}

${cls.navLabel} {
  padding: 16px 12px 6px;
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 600;
  text-transform: uppercase;
}

${cls.nav} a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-family: "Source Sans 3", sans-serif;
  font-size: 15px;
  color: ${textColor};
  transition: background-color 0.15s ease, color 0.15s ease;
}

${cls.nav} a span {
  white-space: nowrap;
}

${cls.nav} a:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

${cls.nav} a.activo, ${cls.nav} a.active {
  background-color: ${activeBg};
  color: ${activeText};
  font-weight: 600;
}

/* Pin/Unpin behavior for Sidebar */
${cls.sidebar}.unpinned {
  width: 76px;
}
${cls.sidebar}.unpinned ${cls.siti},
${cls.sidebar}.unpinned ${cls.navLabel},
${cls.sidebar}.unpinned ${cls.nav} a span,
${cls.sidebar}.unpinned ${cls.footer} span,
${cls.sidebar}.unpinned .badge-inventario {
  display: none;
}

${cls.sidebar}.unpinned:hover {
  width: 240px; 
  z-index: 999;
}

${cls.sidebar}.unpinned:hover ${cls.siti},
${cls.sidebar}.unpinned:hover ${cls.navLabel},
${cls.sidebar}.unpinned:hover ${cls.nav} a span,
${cls.sidebar}.unpinned:hover ${cls.footer} span,
${cls.sidebar}.unpinned:hover .badge-inventario {
  display: block;
}

.toggle-pin-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
}
.toggle-pin-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

/* Elementos especificos preservados para no romper los disenios particulares */
.vendedor-logo-icono {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #8b5cf6;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.vendedor-badge-rol {
  display: inline-block;
  margin-top: 10px;
  font-size: 11px;
  font-family: "Outfit", sans-serif;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 99px;
  background-color: rgba(139, 92, 246, 0.18);
  color: #c4b5fd;
}
${cls.footer} {
  margin-top: auto;
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.vendedor-usuario-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
  margin-bottom: 12px;
}
.vendedor-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #8b5cf6;
  color: #ffffff;
  font-family: "Outfit", sans-serif;
  font-weight: 600;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.vendedor-usuario-texto {
  min-width: 0;
  line-height: 1.25;
}
.vendedor-usuario-texto strong {
  display: block;
  font-family: "Outfit", sans-serif;
  font-size: 13px;
  color: rgba(226, 232, 240, 0.9);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.vendedor-usuario-texto span {
  display: block;
  font-size: 11px;
  color: rgba(203, 213, 225, 0.45);
}
.cerrar-perfil {
  margin: 0;
  width: 100%;
  height: 36px;
  border-color: rgba(255, 255, 255, 0.1);
  background: transparent;
  border-radius: 8px;
  color: rgba(203, 213, 225, 0.55);
  font-size: 12px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.cerrar-perfil:hover {
  background-color: rgba(255, 255, 255, 0.06);
  color: rgba(203, 213, 225, 0.85);
}

.logo-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-inner-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}
.badge-inventario {
  background-color: rgba(16, 185, 129, 0.2);
  color: #34d399;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 12px;
  margin-left: 10px;
  font-weight: 600;
}

@media (max-width: 992px) {
  ${cls.sidebar} {
    position: fixed;
    transform: translateX(-100%);
    z-index: 1000;
  }
  ${cls.sidebar}.open {
    transform: translateX(0);
  }
}
  `;
}

// Write Admin
fs.writeFileSync('frontend/src/components/dashboardAdmin/Sidebar.css', generateCSS('admin', '#0f172a', 'rgba(56, 189, 248, 0.15)', '#38bdf8', '#94a3b8'));
// Write Vendedor
fs.writeFileSync('frontend/src/components/dashboardCajero/Sidebar.css', generateCSS('vendedor', '#1e1b4b', 'rgba(139, 92, 246, 0.18)', '#c4b5fd', 'rgba(203, 213, 225, 0.7)'));
// Write Inventario
fs.writeFileSync('frontend/src/components/dashboardInventario/SidebarInventario.css', generateCSS('inventario', '#134e4a', 'rgba(16, 185, 129, 0.15)', '#34d399', '#99f6e4'));

console.log("CSS generado exitosamente!");
