import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import NotFoundRedirect from "./routes/NotFoundRedirect";

import LoginAdmin from "./pages/LoginAdmin/LoginAdmin";

import LoginOpera from "./pages/LoginOpera/LoginOpera";

import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin";

import DashboardCajero from "./pages/DashboardCajero/DashboardCajero";

import DashboardInventario from "./pages/DashboardInventario/DashboardInventario";
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
            <ProtectedRoute roles={["vendedor"]}>
              <DashboardCajero />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/inventario"
          element={
            <ProtectedRoute roles={["inventario"]}>
              <DashboardInventario />
            </ProtectedRoute>
          }
        />

        {/* Ruta no encontrada */}

        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
