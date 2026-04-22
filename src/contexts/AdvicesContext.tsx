import { createContext, useContext, type ReactNode } from 'react';
import type { Advice, AdvicesContextType } from '../types/advicesType';
import type { upsertAdviceBody } from '../types/advicesType';
import { createAdvice, updateAdvice, deleteAdvice } from '../services/advices-service';



const AdvicesContext = createContext<AdvicesContextType|undefined>(undefined);

export const AdvicesProvider = ({children} : {children: ReactNode}) => {

     async function postAdvice(infoAdvice:upsertAdviceBody): Promise<Advice>{
         let advice:Advice = {date:"", idAdvice:"", jobAuthor:"", nameAuthor:"", phrase:"", idAuthor:0};
         try{
             advice = await createAdvice(infoAdvice);
         }catch(error){
             console.error(error);
         }
         return advice;
     }

     async function putAdvice(id:string, infoAdvice:upsertAdviceBody): Promise<Advice>{
         let advice:Advice = {date:"", idAdvice:"", jobAuthor:"", nameAuthor:"", phrase:"", idAuthor:0};
         try{
             advice = await updateAdvice(id, infoAdvice);
         }catch(error){
             console.error(error);
         }
         return advice;
     }

         async function delAdvice(id:string){
             try{
                 await deleteAdvice(id);
             }catch(error){
                 console.error(error);
             }
         }

         const retournedValues:AdvicesContextType = {
            postAdvice,
            putAdvice,
            delAdvice
         }

         return (
            <AdvicesContext.Provider value={retournedValues}>
                {children}
            </AdvicesContext.Provider>
         )
}

export const useAdvice= () => {
    const context = useContext(AdvicesContext);
    if (!context) {
        throw new Error("useAdvice debe usarse dentro de un AdvicesProvider");
    }
    return context;
};