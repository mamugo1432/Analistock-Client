import type { Advice, upsertAdviceBody } from "../types/advicesType";
import type { Author, upsertAuthorsBody } from "../types/authorsType";
import type { GetRequest } from "../types/authTypes";
import { API_URL, fetchWithAuth } from './auth-service';

export async function getAllAdvices(pageNum:number, pageSize:number):Promise<GetRequest<Advice>>{

    try{
        const response = await fetchWithAuth(API_URL+"/advices?pageNum="+pageNum+"&pageSize="+pageSize, {
            method:"GET",
        });

        if(!response.ok){
            throw new Error("Se ha producido un error al obtener todos los consejos");
        }
        return await response.json();
    }catch(error){
        throw error;
    }
}

export async function getAdviceByIdService(id:string):Promise<Advice>{

    try{

        const response = await fetchWithAuth(API_URL+"/advices/"+id, {
            method:"GET"
        });

        if(!response.ok) throw new Error("Se ha producido un error al obtener el consejo con id: " + id);
        return await response.json();
    }catch(error){
        throw error;
    }

}

export async function createAdvice(infoAdvice:upsertAdviceBody): Promise<Advice>{

    try{

        const response = await fetchWithAuth(API_URL+"/advices/create",{
            method:"POST",
            body: JSON.stringify(infoAdvice)
        });

        if(response.status!==201){
            throw new Error("Se ha producido un error al crear un nuevo author");
        }

        return await response.json();
    }catch(error){
        throw error;
    }
}

export async function updateAdvice(id:string, infoAdvice:upsertAdviceBody):Promise<Advice>{
    try{

        const response = await fetchWithAuth(API_URL+"/advices/edit/"+id,{
            method:"PUT",
            body:JSON.stringify(infoAdvice)
        });

        if(!response.ok){
            throw new Error("Se ha producido un error al actualizar el consejo");
        }

        return await response.json();
    }catch(error){
        throw error;
    }
}

export async function deleteAdvice(id:string): Promise<void>{
    try{

        const response = await fetchWithAuth(API_URL+"/advices/delete/"+id,{
            method:"DELETE"});

        if(!response.ok){
            throw new Error("Se ha producido un error al eliminar el consejo");
        }
    }catch(error){
        throw error;
    }
}

export function transformDate(date:string){
    const meses = ["Ene", "Feb", "Mar", "Abr", "May" , "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    const splitedDate = date.split("-");
    return splitedDate[2] + " " + meses[parseInt(splitedDate[1])-1] + " " + splitedDate[0];
}

export const checkPrhase = async (phrase:string) : Promise<{existsPrhase : boolean}> => {
    const response = await fetchWithAuth(`${API_URL}/advices/check-phrase?phraseParam=${encodeURIComponent(phrase)}`,{
        method : "GET"
    });
        if (!response.ok) {
        throw new Error("Se ha producido un error al validar la frase");
    }

        return response.json();
}

export async function getAuthorsSelectApi(){
     const response = await fetchWithAuth(`${API_URL}/authors/bulk`,{
        method : "GET"
    });
        if (!response.ok) {
        throw new Error("Se ha producido un error al obtener los autores del select");
    }

        return response.json();
}