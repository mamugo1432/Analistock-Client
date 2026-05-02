export interface LoginCredentials {
    username : string,
    password: string
}

export interface UserLogged {
    idUser:number,
    username : string,
    email : string,
    role:string,
    sex:string
}

export interface AuthContextType {
    user: UserLogged | null;
    token: string | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    login: (creds: LoginCredentials) => Promise<void>;
    logout: () => void;
    initializeAuth: ()=> void,
    setUser: React.Dispatch<React.SetStateAction<UserLogged | null>>
}

export interface RegisterInputs {
    fullName: string,
    email: string,
    age : number,
    sex : string,
    password : string,
    repeatPassword : string
}

export interface RegisterData extends RegisterInputs {
    username : string
}

export interface RegisterReturnedData {
    username: string,
    fullName: string,
    age: number,
    sex: string,
    role: string
}

export interface JWTPayload {
  sub: string,
  role: string,
  email: string,
  sex:string,
  idUser:number
  iat: number,
  exp: number

}
export interface RegisterModalProps{
    open:boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    username:string
}