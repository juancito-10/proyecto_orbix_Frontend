import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import NotFoundRedirect from "./routes/NotFoundRedirect";

import LoginAdmin from "./pages/LoginAdmin/LoginAdmin";

import LoginOpera from "./pages/LoginOpera/LoginOpera";

import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin";

import DashboardCajero from "./pages/DashboardCajero/DashboardCajero";

import DashboardInventario from "./pages/DashboardInventario/DashboardInventario";
import LayoutInventario from "./components/dashboardInventario/LayoutInventario";
import ProductosInventario from "./pages/DashboardInventario/ProductosInventario";
import MovimientosInventario from "./pages/DashboardInventario/MovimientosInventario";
import InventarioAdmin from "./pages/DashboardAdmin/InventarioAdmin/InventarioAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Logins */}

        <Route path="/login/admin" element={<LoginAdmin />} />

        <Route path="/login/opera" element={<LoginOpera />} />

        {/* Dashboards */}

        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin/inventario"
          element={
            <ProtectedRoute roles={["admin"]}>
              <InventarioAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/vendedor"
          element={
            <ProtectedRoute roles={["vendedor", "cajero"]}>
              <DashboardCajero />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/cajero"
          element={
            <ProtectedRoute roles={["vendedor", "cajero"]}>
              <DashboardCajero />
            </ProtectedRoute>
          }
        />

        {/* Módulo de Inventario con Layout y Subrutas */}
        <Route
          path="/dashboard/inventario"
          element={
            <ProtectedRoute roles={["inventario"]}>
              <LayoutInventario />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardInventario />} />
          <Route path="productos" element={<ProductosInventario />} />
          <Route path="movimientos" element={<MovimientosInventario />} />
        </Route>

        {/* Ruta no encontrada */}

        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
