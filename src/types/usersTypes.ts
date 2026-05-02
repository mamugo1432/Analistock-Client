import type { UserLogged } from "./authTypes";

export interface User{
    idUser:number,
    username:string,
    fullName:string,
    age:number,
    email:string,
    sex:string,
}


export interface UsersContextType{
    putUser:(id:string, infoUser:User) => Promise<User>,
    delUser:(id:string)=>Promise<void>,
    isSubmittingDelete :boolean
}

