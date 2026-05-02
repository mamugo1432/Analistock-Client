import type { User } from "../types/usersTypes";
import type { GetRequest } from "../types/generalTypes";
import { API_URL, fetchWithAuth } from "./auth-service";

export async function getAllUsers(pageNum:number, pageSize:number):Promise<GetRequest<User>>{

    try{
        const response = await fetchWithAuth(API_URL+"/users?pageNum="+pageNum+"&pageSize="+pageSize, {
            method:"GET",
        });

        if(!response.ok){
            throw new Error("Se ha producido un error al obtener todos los usuarios");
        }
        return await response.json();
    }catch(error){
        throw error;
    }
}

export async function getUsersByIdService(id:string):Promise<User>{

    try{

        const response = await fetchWithAuth(API_URL+"/users/"+id, {
            method:"GET"
        });

        if(!response.ok) throw new Error("Se ha producido un error al obtener el usuario con id: " + id);
        return await response.json();
    }catch(error){
        throw error;
    }

}

export async function updateUser(id:string, infoUser:User):Promise<User>{
    try{

        const response = await fetchWithAuth(API_URL+"/users/edit/"+id,{
            method:"PUT",
            body:JSON.stringify(infoUser)
        });

        if(!response.ok){
            throw new Error("Se ha producido un error al actualizar el usuario");
        }

        return await response.json();
    }catch(error){
        throw error;
    }
}

export async function deleteUser(id:string): Promise<void>{
    try{

        const response = await fetchWithAuth(API_URL+"/users/delete/"+id,{
            method:"DELETE"});

        if(!response.ok){
            throw new Error("Se ha producido un error al eliminar el usuario");
        }
    }catch(error){
        throw error;
    }
}