import { useEffect, useState } from "react";
import type { Stock } from "../../types/stocksTypes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getAllStocks } from "../../services/stocks-service";
import StockCard from "../../components/StockCard/StockCard";
import Pagination from "../../components/Pagination/Pagination";
import ColorLegend from '../../components/MaterialUI/ColorLegend';
import InfoWarning from "../../components/InfoStock/InfoStock";

export default function Stocks(){

 const [stocks, setStocks] = useState<Stock[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(6);
  let totalElements=0;
  const [isLastPage, setIsLastPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user} = useAuth();


    useEffect(() => {
      async function fetchStocks() {
        setLoading(true);
        try {
          const response = await getAllStocks(pageNum, pageSize);
          setStocks(response.content);
          totalElements = response.totalElements;
  
          //Math.ceil redondea hacia arriba haya el decimal que haya
          const lastPage = Math.ceil(totalElements / pageSize);
          setIsLastPage(pageNum >= lastPage);
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
  
      fetchStocks();
    }, [pageNum, pageSize]);
  
    if (loading) return <div className="loading-screen">Cargando...</div>;
   
   return(   
   <div className="container-fluid py-5 px-5">
    <div className="position-relative mb-4 d-flex align-items-center">
    <h2 id="subtitle"
    className="homenaje-regular m-0 position-absolute start-50 translate-middle-x">
      Acciones
    </h2>

    <div className="ms-auto">
      <ColorLegend />
    </div>
  </div>
    {user && user.role=="ADMIN" &&<div className="d-flex justify-content-center mb-4">
      <button className="btn btn-primary" onClick={() => navigate("/stocks/create")}>Añadir Acción</button>
    </div>}
    <InfoWarning/>
          <div className="row g-4">
            {stocks.map(stock => (
             <StockCard  key={stock.idStock} stock={stock}/>
            ))}
          </div>
    
          <div className="mt-5">
            <Pagination 
              currentPage={pageNum}
              isLastPage={isLastPage}
              onPageChange={setPageNum}
            />
          </div>
        </div>)
}