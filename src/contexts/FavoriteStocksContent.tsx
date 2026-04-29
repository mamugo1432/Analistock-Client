import { createContext, type ReactNode, useContext } from 'react';
import type { FavoritesStocksContentType, FavoriteStock } from '../types/favoritesStocksTypes';
import { deleteStockFavorite, saveStockFavorite, isThisStockFavorite } from '../services/stocks-favorites-service';
import { useNavigate } from 'react-router-dom';



const FavoritesStocksContext = createContext<FavoritesStocksContentType|undefined>(undefined);

export const FavoritesStocksProvider = ({children} : {children: ReactNode}) => {
    
    const navigate = useNavigate();
    

     async function postStockFavorite(infoFavoriteStock:FavoriteStock): Promise<FavoriteStock>{
         let favoriteStock:FavoriteStock = {idStock:"", idUser:0};
         try{
             favoriteStock = await saveStockFavorite(infoFavoriteStock);
         }catch(error){

            if(error instanceof Error){
                navigate('/error', { 
                state: { 
                    message: error.message
                } 
            });
            }
              
         }
         return favoriteStock;
     }


         async function delStockFavorite(infoFavoriteStock:FavoriteStock){
             try{
                 await deleteStockFavorite(infoFavoriteStock);
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



         const retournedValues:FavoritesStocksContentType = {
           postStockFavorite,
           delStockFavorite,
         }

         return (
            <FavoritesStocksContext.Provider value={retournedValues}>
                {children}
            </FavoritesStocksContext.Provider>
         )
}

export const useFavoriteStock= () => {
    const context = useContext(FavoritesStocksContext);
    if (!context) {
        throw new Error("useFavoriteStock debe usarse dentro de un FavoriteStockProvider");
    }
    return context;
};