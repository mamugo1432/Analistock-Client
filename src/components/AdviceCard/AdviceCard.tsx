import "bootstrap/dist/css/bootstrap.min.css";
import "./AdviceCard.css";
import { useNavigate } from "react-router-dom";
import type { Advice } from "../../types/advicesType";
import { transformDate } from "../../services/advices-service";
import { useAuth } from "../../contexts/AuthContext";

export default function AdviceCard({ advice }: { advice: Advice }) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="consejo-card card shadow-sm">
        <div className="card-body">
          <div className="consejo-content">
            <p className="consejo-texto">{advice.phrase}</p>
            <span className="consejo-fecha">{transformDate(advice.date)}</span>
          </div>

          <hr className="my-3" />

          <div className="consejo-footer">
            <div className="autor-info">
              <div className="autor-nombre">{advice.nameAuthor}</div>
              <div className="autor-cargo">
                <i>{advice.jobAuthor}</i>
              </div>
            </div>

            {isAuthenticated && user?.role == "ADMIN" && (
              <div className="botones-accion">
                <button
                  id="btn-edit-cardAdvice"
                  className="btn btn-sm btn-warning"
                  onClick={() => navigate("/advices/edit/" + advice.idAdvice)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => navigate("/advices/delete/" + advice.idAdvice)}
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
