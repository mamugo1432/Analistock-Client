import type { Stock } from "../../types/stocksTypes";
import { riskScore } from '../../services/stocks-service';
import "./StockCard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function StockCard({stock}:{stock:Stock}){

  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const {user} = useAuth();

  const riskClass = (riskScore:number) => {
  if (riskScore < -1 || riskScore > 3) return "risk-extreme";
  if (riskScore <0) return "risk-too-low";
  if (riskScore <= 0.35) return "risk-low";
  if(riskScore <= 0.75) return "risk-medium"
  if(riskScore <= 1.2) return "risk-high";
  return "risk-too-high";
  };

    return(
        <div className="col-12 col-md-6 col-lg-4">
  <div className="card shadow-sm border-0 mb-2 position-relative company-card">
<div className="card-body d-flex flex-column">


  <div className="d-flex flex-column mb-3">
    <h6 className="mb-1 p-2">{stock.companyName}</h6>
    <small className="text-muted text-uppercase fw-semibold ps-2">{stock.ticket}</small>
  </div>

<div className="mt-auto d-flex justify-content-end gap-1">
  <button
    className="btn btn-success btn-sm m-1 "
    onClick={() => token == "" ? navigate("/login?error=Not Autenticated") : navigate("/stock/" + stock.idStock)}>Ver Más</button>
{ user && user.role == "ADMIN" && <>
    <button
    className="btn btn-warning btn-sm m-1"
    onClick={() => token == "" ? navigate("/login?error=Not Autenticated") : navigate("/stocks/edit/" + stock.idStock)}>✏️</button>

    <button
    className="btn btn-danger btn-sm m-1"
    onClick={() => token == "" ? navigate("/login?error=Not Autenticated") : navigate("/stocks/delete/" + stock.idStock)}>🗑️</button>
    </>
}
</div>


</div>

      
      <div
        className={`risk-bar ${riskClass(stock.riskScore)}`}
        title={`Risk Score: ${riskScore}`}
      />
    </div>
        </div>
    )
}