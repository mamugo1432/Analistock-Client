
export interface upsertAdviceBody{
    phrase:string,
    date:string,
    idAuthor:number
}

export interface Advice extends upsertAdviceBody{
    idAdvice:string,
    nameAuthor:string,
    jobAuthor:string
}

export interface AdvicesContextType {
    postAdvice:(infoAdvice:upsertAdviceBody)=> Promise<Advice>,
    putAdvice:(id:string, infoAdvice:upsertAdviceBody) => Promise<Advice>,
    delAdvice:(id:string)=> void
}


