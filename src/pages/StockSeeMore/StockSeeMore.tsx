import { useEffect, useState } from "react";
import type { GetStockById } from "../../types/stocksTypes";
import { useStock } from "../../contexts/StocksContext";
import { useNavigate, useParams } from "react-router-dom";
import "./StockSeeMore.css"
import { transformDate } from '../../services/advices-service';
import { useAuth } from "../../contexts/AuthContext";
import { useFavoriteStock } from "../../contexts/FavoriteStocksContext";
import { isThisStockFavorite } from "../../services/stocks-favorites-service";
import InfoIndicator from "../../components/MaterialUI/InfoIndicator";


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
  const {postStockFavorite, delStockFavorite, loadingDeleteFavorite, loadingPostFavorite} = useFavoriteStock();
  
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
            <div className="stock-header">
                <div className="stock-info-top">
                    <h2 className="stock-title">{stock.companyName}</h2>
                    <span className="stock-sector">{stock.sector}</span>
                </div>
                <div className="stock-ticker">{stock.ticket}</div>
            </div>

            <div className="info-row">
                <div className="info-item">
                    <div className="info-label">
                        <InfoIndicator message="Indicador financiero que mide la capacidad de una empresa para cumplir sus deudas a largo plazo con sus activos disponibles."/>
                        <strong>Solvency Ratio:</strong> <span className="info-value">{stock.solvencyRatio.toFixed(3)} %</span>
                    </div>
                </div>
                <div className="info-item">
                    <div className="info-label">
                        <InfoIndicator message="Indicador financiero que muestra cuánto están pagando los inversores por cada unidad de beneficio de una empresa."/>
                        <strong>P/E Ratio:</strong> <span className="info-value">{stock.peRatio.toFixed(3)} %</span>
                    </div>
                </div>
                <div className="info-item">
                    <div className="info-label">
                        <InfoIndicator message="Indicador financiero que mide la capacidad de una empresa para pagar sus deudas a corto plazo con sus activos corrientes."/>
                        <strong>Current Ratio:</strong> <span className="info-value">{stock.currentRatio.toFixed(3)} %</span>
                    </div>
                </div>
                <div className="info-item">
                    <div className="info-label">
                        <InfoIndicator message="Indicador financiero que compara el precio de mercado de una empresa con el valor contable de sus activos netos."/>
                        <strong>P/B Ratio:</strong> <span className="info-value">{stock.pbRatio.toFixed(3)} %</span>
                    </div>
                </div>
                <div className="info-item">
                    <div className="info-label">
                        <InfoIndicator message="Indicador financiero que muestra qué porcentaje del precio de una acción se paga en dividendos cada año."/>
                        <strong>Dividend Yield:</strong> <span className="info-value">{stock.dividendYield.toFixed(3)} %</span>
                    </div>
                </div>
                <div className="info-item">
                    <div className="info-label">
                        <InfoIndicator message="Indicador financiero que muestra qué porcentaje de los ingresos de una empresa se convierte en beneficio neto después de todos los gastos."/>
                        <strong>Net Profit Margin:</strong> <span className="info-value">{stock.netProfitMargin.toFixed(3)} %</span>
                    </div>
                </div>
                <div className="info-item">
                    <div className="info-label">
                        <InfoIndicator message="Indicador financiero que muestra qué porcentaje de los beneficios de una empresa se reparte a los accionistas en forma de dividendos."/>
                        <strong>Dividend Payout:</strong> <span className="info-value">{stock.dividendPayoutRatio.toFixed(3)} %</span>
                    </div>
                </div>
                <div className="info-item">
                    <div className="info-label">
                        <InfoIndicator message="Indicador financiero que mide cuánta deuda utiliza una empresa en relación con el capital aportado por sus accionistas."/>
                        <strong>Debt to Equity:</strong> <span className="info-value">{stock.debtEquity.toFixed(3)} %</span>
                    </div>
                </div>
                
                <div className="info-item">
                    <div className="info-label">
                        <InfoIndicator message="Indicador financiero que mide cuánto flujo de caja libre genera una empresa por cada acción en circulación."/>
                        <strong>Free Cash Flow Per Share:</strong> <span className="info-value">{stock.freeCashFlow.toFixed(3)} %</span>
                    </div>
                </div>
                <div className="info-item">
                    <div className="info-label">
                        <strong>Fecha de los datos:</strong> <span className="info-value">{transformDate(stock.date)}</span>
                    </div>
                </div>

                <div className="info-item">
                    <div className="info-label">
                        <strong>Puntuación de riesgo:</strong> <span className="info-value">{stock.riskScore}</span>
                    </div>
                </div>
                                <div className="info-item">
                    <div className="info-label">
                        <strong>Año fiscal de los datos:</strong> <span className="info-value">{stock.financialYear}</span>
                    </div>
                </div>
            </div>

            <button className="action-button" onClick={handleFavorite} 
            disabled={loadingPostFavorite || loadingDeleteFavorite}>{favoriteStock ? "💔":"❤️"}</button>
        </div>
    </div>
    )
}