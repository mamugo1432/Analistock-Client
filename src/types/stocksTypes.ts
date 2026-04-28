export interface Stock{
    idStock:number,
    companyName:string,
    ticket:string,
    riskScore:number
}

export interface upsertStockBody{
    peRatio:number,
    pbRatio:number,
    netProfitMargin:number,
    debtEquity:number,
    freeCashFlow:number,
    solvencyRatio:number,
    currentRatio:number,
    dividendYield:number,
    dividendPayoutRatio:number,
    date:string,
    financialYear:number,
    sector:string,
    companyName:string,
    ticket:string,
    riskScore:number
} 

export interface GetStockById extends upsertStockBody{
idStock:number
}

export interface StocksContentType{
    postStock:(infoStock:upsertStockBody)=>Promise<Stock>,
    putStock:(id:string, infoStock:upsertStockBody)=>Promise<Stock>,
    delStock:(id:string)=> void,
    getStockId:(id:string)=> Promise<GetStockById>
}