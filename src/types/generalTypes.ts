export interface GetRequest<T>{
    pageSize:number;
    pageNum:number;
    totalElements:number;
    content : T[];
}