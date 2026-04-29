import { useEffect, useState } from "react";
import type { GetStockById } from "../../types/stocksTypes";
import { useStock } from "../../contexts/StocksContent";
import { useNavigate, useParams } from "react-router-dom";
import "./StockSeeMore.css"
import { transformDate } from '../../services/advices-service';
import { useAuth } from "../../contexts/AuthContext";
import { useFavoriteStock } from "../../contexts/FavoriteStocksContent";
import { isThisStockFavorite } from "../../services/stocks-favorites-service";
export default function StockSeeMore(){

        const [stock, setStock] = useState<GetStockById>({
        peRatio:0, pbRatio:0, netProfitMargin:0, debtEquity:0, freeCashFlow:0, solvencyRatio:0,
        currentRatio:0, dividendYield:0, dividendPayoutRatio:0, date:"", financialYear:0, sector:"",
        companyName:"", ticket:"", idStock:0, riskScore:0
      });
    const [loading, setLoading] = useState<boolean>(false);
    const {getStockId} = useStock();
    const {id} = useParams();
    const navigate = useNavigate();
      const {user} = useAuth();
  const [loadingFavoriteStock, setLoadingFavoriteStock] = useState(false);
  const [favoriteStock, setFavoriteStock] = useState(false);
  const {postStockFavorite, delStockFavorite} = useFavoriteStock();
  
    if(!id) alert("Se ha producido un error");

    useEffect(()=>{
        async function handleGetStockId(){
            setLoading(true);
            try{
            const stock = await getStockId(id!);
            if(stock) {
                setStock(stock);
                await checkIfFavorite(stock.idStock.toString());
            }
            setLoading(false);
            }catch(error){
                 if(error instanceof Error){
                navigate('/error', { 
                state: { 
                    message: error.message
                } 
            });
            }
            }
        }

        async function checkIfFavorite(stockId: string){
            try{
                setLoadingFavoriteStock(true);
                if(!user) throw new Error();
                let isFavorite = await isThisStockFavorite({idUser:user!.idUser, idStock: stockId});
                setFavoriteStock(isFavorite.isFavoriteStock);
                setLoadingFavoriteStock(false);
            }catch(error){
                setLoadingFavoriteStock(false);
                 if(error instanceof Error){
                navigate('/error', { 
                state: { 
                    message: error.message
                } 
            });
            }
                
            }
        }

        handleGetStockId();
    }, []);

    async function handleFavorite(){

        try{
            if(!user) throw new Error();

        if(favoriteStock){
            await delStockFavorite({idUser: user.idUser, idStock:stock.idStock.toString()});
            setFavoriteStock(false);
        }else{
            await postStockFavorite({idUser: user.idUser, idStock:stock.idStock.toString()});
            setFavoriteStock(true);
        }
    }catch(error){
throw error;
    }

    }
        if (loading || loadingFavoriteStock) return <div className="loading-screen">Cargando...</div>
    return(
    <div className="container">
        <div className="stock-container">
            <h2 className="stock-title">{stock.companyName}</h2>
            <span><i><p>{stock.sector}</p></i></span>
            <div className="stock-ticker">{stock.ticket}</div>

            <div className="info-row">
                <div className="info-item">
                    <div className="info-label"><i><strong>Solvency Ratio: </strong></i>{stock.solvencyRatio}</div>
                </div>
                <div className="info-item">
                    <div className="info-label"><i><strong>Price To Earnings(P/E) Ratio: </strong></i>{stock.peRatio}</div>
                </div>
                <div className="info-item">
                    <div className="info-label"><i><strong>Current Ratio: </strong></i>{stock.currentRatio}</div>
                </div>
                <div className="info-item">
                    <div className="info-label"><i><strong>Price To Book(P/B) Ratio: </strong></i>{stock.pbRatio}</div>
                </div>
                <div className="info-item">
                    <div className="info-label"><i><strong>Dividend Yield: </strong></i>{stock.dividendYield}</div>
                </div>
                <div className="info-item">
                    <div className="info-label"><i><strong>Net Profit Margin: </strong></i>{stock.netProfitMargin}</div>
                </div>
                <div className="info-item">
                    <div className="info-label"><i><strong>Dividend Payout Ratio: </strong></i>{stock.dividendPayoutRatio}</div>
                </div>
                <div className="info-item">
                    <div className="info-label"><i><strong>Debt to Equity: </strong></i>{stock.debtEquity}</div>
                </div>
                <div className="info-item">
                    <div className="info-label"><i><strong>Date: </strong></i>{transformDate(stock.date)}</div>
                </div>
                <div className="info-item">
                    <div className="info-label"><i><strong>Free Cash Flow Per Share: </strong></i>{stock.freeCashFlow}</div>
                </div>
                <div className="info-item">
                    <div className="info-label"><i><strong>Financial Year: </strong></i>{stock.financialYear}</div>
                </div>
                <div className="info-item">
                    <div className="info-label"><i><strong>Risk Score </strong></i>{stock.riskScore}</div>
                </div>
            </div>

            <button className="action-button" onClick={handleFavorite}>{favoriteStock ? "💔":"❤️"}</button>
        </div>
    </div>
    )
}