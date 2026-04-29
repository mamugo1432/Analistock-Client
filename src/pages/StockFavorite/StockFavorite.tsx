import { useEffect, useState } from "react";
import { getAllStocksFavorites } from "../../services/stocks-favorites-service";
import { useAuth } from "../../contexts/AuthContext";
import type { Stock } from "../../types/stocksTypes";
import StockCard from "../../components/StockCard/StockCard";
import "./StockFavorite.css";
import { useNavigate } from "react-router-dom";

export default function StockFavorite(){

 const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();
  const navigate = useNavigate();


    useEffect(() => {
      async function fetchFavoritesStocks() {
        setLoading(true);
        try {
            if(!user) throw new Error();
          const response = await getAllStocksFavorites(user.idUser.toString());
          setStocks(response);
        } catch (error) {
          
           if(error instanceof Error){
                navigate('/error', { 
                state: { 
                    message: error.message
                } 
            });
            }

        } finally {
          setLoading(false);
        }
      };
  
      fetchFavoritesStocks();
    }, []);
  
    if (loading) return <div className="loading-screen">Cargando...</div>;
   
   return(   
   <div className="container-fluid py-5 px-5">
    <h2 id="subtitle" className="mb-4 text-center homenaje-regular">Acciones Favoritas</h2>
            
{stocks.length!=0 &&
          <div className="grid-favoritas">
            {stocks.map(stock => (
             <StockCard  key={stock.idStock} stock={stock}/>
            ))}
          </div>
}   { stocks.length==0 &&

        <div className="alert alert-danger d-flex justify-content-center align-items-center">
      <span>
        El usuario no ha marcado ninguna <strong>acción favorita</strong> todavía
      </span>
  </div>
} 

        </div>)
}