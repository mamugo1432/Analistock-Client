import type  {LoginCredentials, RegisterData, RegisterReturnedData} from "../types/authTypes";

export const API_URL = "http://localhost:8080";


/**
 * Esta función actúa como un interceptor en Angular cuya función es añadir el token en la cabecera de la petición.
 * Cuando quiera usar fetch para un endpoint que necesite de un token, utilizo esta función.
 * @param url 
 * @param options 
 * @returns 
 */
export const fetchWithAuth = async (url: string, options : RequestInit= {}) => {
  const token = localStorage.getItem("token");

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });
};

export const verifyToken = async () => {
    try{

        const response = await fetchWithAuth(`${API_URL}/verifyToken`, {
            method:"GET"
        })

        if(!response.ok) throw new Error("Se ha producido un error al verificar el token");

        return response.json();
    }catch(error){
        throw error;
    }
}

export const loginUser = async (credentials: LoginCredentials): Promise<{token : string}> => {
    try{
        const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
        });
        if (!response.ok) {
            throw new Error("Credenciales incorrectas");
        }
        return response.json(); 

    }catch(error){
        throw error;
    }
   
};
export const registerUser = async (data:RegisterData) : Promise<RegisterReturnedData> => {
    try{

        const response = await fetch(`${API_URL}/register`, {
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

        if(response.status != 201) throw new Error("Error al crear un nuevo usuario");
        return response.json();

    }catch(error){
        throw error;
    }
}
const checkUsername = async (username:string) : Promise<{existsUsername : boolean}> => {
    const response = await fetch(`${API_URL}/users/check-username?usernameParam=${username}`,{
        method : "GET"
    });
        if (!response.ok) {
        throw new Error("Se ha producido un error al validar el username");
    }

        return response.json();
}

export const checkEmail = async (email:string) : Promise<{existsEmail : boolean}> => {
    const response = await fetch(`${API_URL}/users/check-email?emailParam=${email}`,{
        method : "GET"
    });
        if (!response.ok) {
        throw new Error("Se ha producido un error al validar el email");
    }

        return response.json();
}

const removeAccents = (word:string) => 
  word.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //Transforma "á" en "a´", separando el acento de la vocal para posteriormente eliminar los acentos

const generateUsername = (fullName : string) : string =>{
    const nameSplited = fullName.split(" ");
    let username = "";

    username = nameSplited.map(word => word.substring(0,2)).join("").toLocaleLowerCase();
    username+= Math.round(Math.random() * 10000);
    return removeAccents(username);
}

export const obtainValidUsername = async (fullName : string) => {

    let isValidUsername=false;
    let username = "";

    while(!isValidUsername){
        try{
            username = generateUsername(fullName);
            const response = await checkUsername(username)
            isValidUsername = !response.existsUsername;
        } catch(error){
            throw new Error("Se ha producido un error al generar el username");
        }
    }

    return username;

}