import { useState } from "react";
import "./Header.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  console.log(isAuthenticated);

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
                  <a href="#" className="header-pill">Test Inversor</a>
                  <a href="#" className="header-pill">Consejos</a>
                  <a href="#" className="header-pill">Acciones</a>
                  <a href="#" className="header-pill">Autores</a>
                </div>
                <div className="nav-row">
                  <a href="#" className="header-pill">Usuarios</a>
                  <a href="#" className="header-pill">Acciones Favoritas</a>
                  <a href="#" className="header-pill">Autores Favoritos</a>
                  <a href="#" className="header-pill">Logout</a>
                </div>
              </>
            }

            {isAuthenticated && user?.role === "USER" &&
              <>
                <div className="nav-row">
                  <a href="#" className="header-pill">Test Inversor</a>
                  <a href="#" className="header-pill">Consejos</a>
                  <a href="#" className="header-pill">Acciones</a>
                </div>
                <div className="nav-row">
                  <a href="#" className="header-pill">Acciones Favoritas</a>
                  <a href="#" className="header-pill">Autores Favoritos</a>
                  <a href="#" className="header-pill">Logout</a>
                </div>
              </>
            }

            {!isAuthenticated &&
              <>
                <div className="nav-row">
                  <a href="#" className="header-pill">Acciones</a>
                  <a href="#" className="header-pill">Login</a>
                  <a href="#" className="header-pill">Registro</a>
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
            <button className="header-user-btn" onClick={() => navigate('/profile')}>
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
              <a href="#" className="header-pill">Acciones</a>
              <a href="#" className="header-pill">Login</a>
              <a href="#" className="header-pill">Registro</a>
            </>
          }

          {isAuthenticated && user?.role == "ADMIN" &&
            <>
              <a href="#" className="header-pill">Test Inversor</a>
              <a href="#" className="header-pill">Consejos</a>
              <a href="#" className="header-pill">Acciones</a>
              <a href="#" className="header-pill">Autores</a>
              <a href="#" className="header-pill">Usuarios</a>
              <a href="#" className="header-pill">Acciones Favoritas</a>
              <a href="#" className="header-pill">Autores Favoritos</a>
              <a href="#" className="header-pill">Logout</a>
            </>
          }

          {isAuthenticated && user?.role == "USER" &&
            <>
              <a href="#" className="header-pill">Test Inversor</a>
              <a href="#" className="header-pill">Consejos</a>
              <a href="#" className="header-pill">Acciones</a>
              <a href="#" className="header-pill">Autores Favoritos</a>
              <a href="#" className="header-pill">Acciones Favoritas</a>
              <a href="#" className="header-pill">Logout</a>
            </>
          }

        </nav>
      </div>

    </header>
  );
}