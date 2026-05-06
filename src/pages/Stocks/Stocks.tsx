import { useEffect, useState } from "react";
import type { Stock } from "../../types/stocksTypes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getAllStocks } from "../../services/stocks-service";
import StockCard from "../../components/StockCard/StockCard";
import ColorLegend from '../../components/MaterialUI/ColorLegend';
import InfoWarning from "../../components/InfoStock/InfoStock";
import { Pagination } from "@mui/material";

export default function Stocks(){

 const [stocks, setStocks] = useState<Stock[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(6);
  let totalElements=0;
  const [lastPage, setLastPage] = useState(0);
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
          setLastPage(lastPage);
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
    <div className="mt-5">
    <InfoWarning/>
          <div className="row g-4 mt-2">
            {stocks.map(stock => (
             <StockCard  key={stock.idStock} stock={stock}/>
            ))}
          </div>
    </div>
          <div className="mt-5 d-flex align-items-center justify-content-center">
            <div className="pagination p-2 ">
              <Pagination  count={lastPage} page={pageNum} onChange={(_, value) => setPageNum(value)} variant="outlined" shape="rounded" color="primary"/>
            </div>
          </div>
        </div>)
}