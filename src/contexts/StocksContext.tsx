import { createContext, type ReactNode, useContext } from 'react';
import type { GetStockById, Stock, StocksContentType, upsertStockBody } from "../types/stocksTypes";
import { createStock, deleteStock, getStockByIdService, updateStock } from "../services/stocks-service";


const StocksContext = createContext<StocksContentType|undefined>(undefined);

export const StocksProvider = ({children} : {children: ReactNode}) => {

     async function postStock(infoStock:upsertStockBody): Promise<Stock>{
         let stock:Stock = {idStock:0, companyName:"", riskScore:0, ticket:""};
         try{
             stock = await createStock(infoStock);
         }catch(error){
             throw error;
         }
         return stock;
     }

     async function putStock(id:string, infoStock:upsertStockBody): Promise<Stock>{
         let stock:Stock = {idStock:0, companyName:"", riskScore:0, ticket:""};
         try{
             stock = await updateStock(id, infoStock);
         }catch(error){
             throw error;
         }
         return stock;
     }

         async function delStock(id:string){
             try{
                 await deleteStock(id);
             }catch(error){
                 throw error;
             }
         }

         async function getStockId(id:string):Promise<GetStockById> {
            
            let stock:GetStockById = {
        peRatio:0, pbRatio:0, netProfitMargin:0, debtEquity:0, freeCashFlow:0, solvencyRatio:0,
        currentRatio:0, dividendYield:0, dividendPayoutRatio:0, date:"", financialYear:0, sector:"",
        companyName:"", ticket:"", riskScore:0, idStock:0
      };
            try{
                stock = await getStockByIdService(id);
            }catch(error){
                throw error;
            }
            return stock;
         }

         const retournedValues:StocksContentType = {
            postStock,
            putStock,
            delStock,
            getStockId
         }

         return (
            <StocksContext.Provider value={retournedValues}>
                {children}
            </StocksContext.Provider>
         )
}

export const useStock= () => {
    const context = useContext(StocksContext);
    if (!context) {
        throw new Error("useStock debe usarse dentro de un StocksProvider");
    }
    return context;
};