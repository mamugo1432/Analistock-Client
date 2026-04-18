import { createContext, useContext, type ReactNode } from "react";
import type { AuthorsContextType, upsertAuthorsBody, Author } from "../types/authorsType";
import { createAuthor, deleteAuthor, getAuthorByIdService, updateAuthor } from "../services/authors-service";

const AuthorsContext = createContext<AuthorsContextType|undefined>(undefined);

export const AuthorsProvider = ({children} : { children: ReactNode})=>{

    async function postAuthor(infoAuthor:upsertAuthorsBody): Promise<Author>{
        let author:Author = {idAuthor:"", fullName:"", job:""};
        try{
            author = await createAuthor(infoAuthor);
        }catch(error){
            console.error(error);
        }
        return author;
    }

    async function putAuthor(id:string, infoAuthor:upsertAuthorsBody){
        let author:Author = {idAuthor:"", fullName:"", job:""};
        try{
            author = await updateAuthor(id,infoAuthor);
            return author;
        }catch(error){
            console.error(error);
        }
        return author;
    }


    async function delAuthor(id:string){
        try{
            await deleteAuthor(id);
        }catch(error){
            console.error(error);
        }
    }

    const retournedValues: AuthorsContextType = {
        postAuthor,
        putAuthor,
        delAuthor
    }

        return (
        <AuthorsContext.Provider value={{
        postAuthor,
        putAuthor,
        delAuthor
        }}>
            {children} </AuthorsContext.Provider>
    );
}

export const useAuthor= () => {
    const context = useContext(AuthorsContext);
    if (!context) {
        throw new Error("useAuthor debe usarse dentro de un AuthorsProvider");
    }
    return context;
};
