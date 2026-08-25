import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/login/admin");
  };

  return (
    <button className="cerrar-perfil" onClick={handleLogout}>
      Cerrar perfil
    </button>
  );
};

export default LogoutButton;