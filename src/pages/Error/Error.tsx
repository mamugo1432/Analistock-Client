import { useLocation, useNavigate } from "react-router-dom";

export default function Error(){

    const location = useLocation(); // 👈 Obtiene la información de la navegación
  const navigate = useNavigate();
  
  // 👇 Extraemos los datos que enviamos desde StockSeeMore
  const errorMessage = location.state?.message || "El recurso al que se dirige no ha sido encontrado";


    return(
            <div className="container-fluid py-5 px-5">
                <h2 id="subtitle" className="mb-4 text-center">Ups... Se ha producido un error</h2>
                    <div className="alert alert-danger d-flex justify-content-center align-items-center">
      <span>
        {errorMessage}
      </span>
            </div>
            </div>
    )
}