import { useLocation, useNavigate } from "react-router-dom";
import "./Error.css";

export default function Error(){

    const location = useLocation();
    const navigate = useNavigate();
  
    const errorMessage = location.state?.message || "El recurso al que se dirige no ha sido encontrado";

    return(
        <div className="error-container">
            <div className="error-card">
                <div className="error-icon">⚠️</div>
                <h2 id="error-title" className="homenaje-regular">Error</h2>
                <p className="error-message">{errorMessage}</p>
                <div className="error-buttons">
                    <button className="btn-back" onClick={() => navigate(-1)}>
                        Volver Atrás
                    </button>
                    <button className="btn-home" onClick={() => navigate("/stocks")}>
                        Ir al Inicio
                    </button>
                </div>
            </div>
        </div>
    )
}