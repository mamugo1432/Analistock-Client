import type { Advice, upsertAdviceBody } from "../types/advicesType";
import type { Author, upsertAuthorsBody } from "../types/authorsType";
import type { FavoriteStock } from "../types/favoritesStocksTypes";
import type { GetRequest } from "../types/generalTypes";
import type { Stock } from "../types/stocksTypes";
import { API_URL, fetchWithAuth } from './auth-service';

export async function getAllStocksFavorites (idUser:string):Promise<Stock[]>{

    try{
        const response = await fetchWithAuth(API_URL+"/favorites-stocks?idUser="+idUser, {
            method:"GET",
        });

        if(!response.ok){
            throw new Error("Se ha producido un error al obtener todas las acciones favoritas del usuario");
        }
        return await response.json();
    }catch(error){
        throw error;
    }
}

export async function isThisStockFavorite({idUser, idStock}:FavoriteStock):Promise<{isFavoritesStock:boolean}>{

    try{

        const response = await fetchWithAuth(API_URL+"/favorites-stocks/"+idUser + "/" + idStock, {
            method:"GET"
        });

        if(!response.ok) throw new Error("Se ha producido un error al conocer si la acción es favorita");
        return await response.json();
    }catch(error){
        throw error;
    }

}

export async function saveStockFavorite({idUser, idStock}:FavoriteStock): Promise<FavoriteStock>{

    try{

        const response = await fetchWithAuth(API_URL+"/favorites-stocks/create/"+idUser + "/" + idStock,{
            method:"POST"
        });

        if(response.status!==201){
            throw new Error("Se ha producido un error al guardar la acción favorita");
        }

        return await response.json();
    }catch(error){
        throw error;
    }
}


export async function deleteStockFavorite({idUser, idStock}:FavoriteStock): Promise<void>{
    try{

        const response = await fetchWithAuth(API_URL+"/favorites-stocks/delete/"+idUser + "/" + idStock,{
            method:"DELETE"});

        if(!response.ok){
            throw new Error("Se ha producido un error al eliminar el la acción de favoritos");
        }
    }catch(error){
        throw error;
    }
}
