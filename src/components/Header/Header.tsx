import { useState } from "react";
import "./Header.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="analistock-header">
      <div className="header-inner">

        {/* BRAND */}
        <div className="header-brand">
          <span className="header-title"><h1>ANALISTOCK</h1></span>

          {/* NAV DESKTOP */}
          <nav className="header-nav desktop-nav">

            {isAuthenticated && user?.role === "ADMIN" &&
              <>
                <div className="nav-row">
                  <button  className="header-pill" onClick={() =>navigate("/advices")}>Consejos</button>
                  <button  className="header-pill" onClick={() =>navigate("/stocks")}>Acciones</button>
                  <button  className="header-pill" onClick={() =>navigate("/authors")}>Autores</button>
                </div>
                <div className="nav-row">
                  <button  className="header-pill" onClick={() =>navigate("/users")}>Usuarios</button>
                  <button  className="header-pill"  onClick={() =>navigate("/favorites-stocks")}>Acciones Favoritas</button>
                  <button  className="header-pill" onClick={() =>logout()}>Logout</button>
                </div>
              </>
            }

            {isAuthenticated && user?.role === "USER" &&
              <>
                <div className="nav-row">
                  <button  className="header-pill" onClick={() => navigate("/stocks")}>Acciones</button>
                  <button  className="header-pill" onClick={() =>navigate("/advices")}>Consejos</button>
                  <button  className="header-pill"  onClick={() =>navigate("/favorites-stocks")}>Acciones Favoritas</button>
                  <button className="header-pill" onClick={() =>logout()}>Logout</button>
                </div>
              </>
            }

            {!isAuthenticated &&
              <>
                <div className="nav-row">
                  <button  className="header-pill" onClick={() => navigate("/stocks")}>Acciones</button>
                  <button  className="header-pill" onClick={() => navigate("/login")}>Login</button>
                  <button  className="header-pill" onClick={() => navigate("/register")}>Registro</button>
                </div>
              </>
            }

          </nav>
        </div>

        <div className="header-user">
          <button
            className={`header-menu-toggle ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          {isAuthenticated && (
            <button className="header-user-btn" onClick={() => navigate('/users/details/' + user?.idUser)}>
              <span className="header-user-desktop">{user?.sex == "M" ? "🧑‍💻 " : "👩‍💻 "}  {user?.username}</span>
              <span className="header-user-mobile">{user?.sex == "M" ? "🧑‍💻" : "👩‍💻"}</span>
            </button>
          )}
        </div>

      </div>

      {/* MENÚ MOBILE */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <nav className="mobile-nav">

          {!isAuthenticated &&
            <>
              <button  className="header-pill" onClick={() => navigate("/stocks")}>Acciones</button>
              <button  className="header-pill" onClick={() => navigate("/login")}>Login</button>
              <button  className="header-pill" onClick={() => navigate("/register")}>Registro</button>
            </>
          }

          {isAuthenticated && user?.role == "ADMIN" &&
            <>
              <button  className="header-pill" onClick={() =>navigate("/advices")}>Consejos</button>
              <button  className="header-pill" onClick={() => navigate("/stocks")}>Acciones</button>
              <button  className="header-pill" onClick={() =>navigate("/authors")}>Autores</button>
              <button  className="header-pill" onClick={() =>navigate("/users")}>Usuarios</button>
              <button  className="header-pill"  onClick={() =>navigate("/favorites-stocks")}>Acciones Favoritas</button>
              <button  className="header-pill" onClick={() =>logout()}>Logout</button>
            </>
          }

          {isAuthenticated && user?.role == "USER" &&
            <>
              <button  className="header-pill" onClick={() =>navigate("/advices")}>Consejos</button>
              <button  className="header-pill" onClick={() => navigate("/stocks")}>Acciones</button>
              <button  className="header-pill"  onClick={() =>navigate("/favorites-stocks")}>Acciones Favoritas</button>
              <button  className="header-pill" onClick={() =>logout()}>Logout</button>
            </>
          }

        </nav>
      </div>

    </header>
  );
}