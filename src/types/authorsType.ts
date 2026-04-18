export interface upsertAuthorsBody{
    fullName:string,
    job:string
}

export interface AuthorsContextType{
    postAuthor:(infoAuthor:upsertAuthorsBody)=>Promise<Author>,
    putAuthor:(id:string, infoAuthor:upsertAuthorsBody)=>Promise<Author>,
    delAuthor:(id:string)=>void
}

export interface Author extends upsertAuthorsBody{
    idAuthor:string
}

export interface CardAuthorProps{
    author:Author
}

