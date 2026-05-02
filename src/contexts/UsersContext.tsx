import { createContext, useContext, useState, type ReactNode } from "react";
import type {User, UsersContextType } from "../types/usersTypes";
import { deleteUser, updateUser } from "../services/users-service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const UsersContext = createContext<UsersContextType|undefined>(undefined);

export const UsersProvider = ({children} : { children: ReactNode})=>{

    const [isSubmittingDelete, setIsSubmittingDelete] = useState<boolean>(false);
    const navigate = useNavigate();
    const {user, setUser} = useAuth();
    
    async function putUser(id:string, infoUser:User){
        let modifiedUser:User = {username:"", fullName:"", age:0, email:"", sex:"", idUser:0};
        try{
            modifiedUser = await updateUser(id,infoUser);
            if(modifiedUser && id == user?.idUser.toString()){
            setUser({idUser:user.idUser, email:infoUser.email, role:user.role, sex:infoUser.sex, username:infoUser.username});
            }
        }catch(error){
            throw error;
        }
        return modifiedUser;
    }


    async function delUser(id:string){
        setIsSubmittingDelete(true);
        try{
            await deleteUser(id);
            setIsSubmittingDelete(false);

                if(user?.role=="ADMIN"){
                    navigate("/users");
                }else{
                    navigate("/login?logout");
                }
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

    const retournedValues: UsersContextType = {
        putUser,
        delUser, 
        isSubmittingDelete
    }

        return (
        <UsersContext.Provider value={retournedValues}>
            {children} </UsersContext.Provider>
    );
}

export const useUsers= () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("useUsers debe usarse dentro de un UsersProvider");
    }
    return context;
};
