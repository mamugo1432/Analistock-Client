import type { Author, upsertAuthorsBody } from "../types/authorsType";
import type { GetRequest } from "../types/generalTypes";
import { API_URL, fetchWithAuth } from "./auth-service";

export async function getAllAuthors(pageNum:number, pageSize:number):Promise<GetRequest<Author>>{

    try{
        const response = await fetchWithAuth(API_URL+"/authors?pageNum="+pageNum+"&pageSize="+pageSize, {
            method:"GET",
        });

        if(!response.ok){
            throw new Error("Se ha producido un error al obtener todos los autores");
        }
        return await response.json();
    }catch(error){
        throw error;
    }
}

export async function getAuthorByIdService(id:string):Promise<Author>{

    try{

        const response = await fetchWithAuth(API_URL+"/authors/"+id, {
            method:"GET"
        });

        if(!response.ok) throw new Error("Se ha producido un error al obtener el autor con id: " + id);
        return await response.json();
    }catch(error){
        throw error;
    }

}

export async function createAuthor(infoAuthor:upsertAuthorsBody): Promise<Author>{

    try{

        const response = await fetchWithAuth(API_URL+"/authors",{
            method:"POST",
            body: JSON.stringify(infoAuthor)
        });

        if(response.status!==201){
            throw new Error("Se ha producido un error al crear un nuevo autor");
        }

        return await response.json();
    }catch(error){
        throw error;
    }
}

export async function updateAuthor(id:string, infoAuthor:upsertAuthorsBody):Promise<Author>{
    try{

        const response = await fetchWithAuth(API_URL+"/authors/"+id,{
            method:"PUT",
            body:JSON.stringify(infoAuthor)
        });

        if(!response.ok){
            throw new Error("Se ha producido un error al actualizar el autor");
        }

        return await response.json();
    }catch(error){
        throw error;
    }
}

export async function deleteAuthor(id:string): Promise<void>{
    try{

        const response = await fetchWithAuth(API_URL+"/authors/"+id,{
            method:"DELETE"});

        if(!response.ok){
            throw new Error("Se ha producido un error al eliminar el autor");
        }
    }catch(error){
        throw error;
    }
}