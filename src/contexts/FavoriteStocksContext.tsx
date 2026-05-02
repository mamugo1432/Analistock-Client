import { createContext, type ReactNode, useContext, useState } from 'react';
import type { FavoritesStocksContentType, FavoriteStock } from '../types/favoritesStocksTypes';
import { deleteStockFavorite, saveStockFavorite } from '../services/stocks-favorites-service';
import { useNavigate } from 'react-router-dom';



const FavoritesStocksContext = createContext<FavoritesStocksContentType|undefined>(undefined);

export const FavoritesStocksProvider = ({children} : {children: ReactNode}) => {
    
    const [loadingPostFavorite, isLoadingPostFavorite] = useState(false);
    const [loadingDeleteFavorite, isLoadingDeleteFavorite] = useState(false);
    const navigate = useNavigate();
    

     async function postStockFavorite(infoFavoriteStock:FavoriteStock): Promise<FavoriteStock>{
         let favoriteStock:FavoriteStock = {idStock:"", idUser:0};
         isLoadingPostFavorite(true);
         try{
             favoriteStock = await saveStockFavorite(infoFavoriteStock);
             isLoadingPostFavorite(false);
         }catch(error){
            isLoadingPostFavorite(false);
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
                isLoadingDeleteFavorite(true);
                 await deleteStockFavorite(infoFavoriteStock);
                 isLoadingDeleteFavorite(false);
             }catch(error){
                isLoadingDeleteFavorite(false);
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
           loadingPostFavorite,
           loadingDeleteFavorite
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