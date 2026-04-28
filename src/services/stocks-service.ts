import {type GetRequest } from '../types/generalTypes';
import type { GetStockById, Stock, upsertStockBody } from '../types/stocksTypes';
import { API_URL, fetchWithAuth } from './auth-service';

const peRatio = (pe:number) => (pe-10)/30;

const pbRatio = (pb:number) => (pb-1)/4;

const debtEquity = (de:number) => de/2;

const solvency = (sol:number) => 1 - (sol)/0.4;

const current = (curr:number) => 1 - curr/2;

const netProfitMargin = (npm:number) => 1 - (npm/0.2);

const freeCashFlow = (fcf:number) => 1 - (fcf/10);

const divYield = (dy:number) => 1 - (dy/0.05);

const divPayout = (dp:number) => (dp-0.3)/0.5;

const valuation = (pe:number, pb:number) => (peRatio(pe) + pbRatio(pb))/2;
const financial = (de:number, sol:number, curr:number) => (debtEquity(de) + solvency(sol) + current(curr))/3;
const cash = (fcf:number, dy:number, dp:number) => (freeCashFlow(fcf) +divYield(dy) + divPayout(dp))/3;

export const riskScore = (pe:number, pb:number, de:number, sol:number, curr:number, fcf:number, dy:number, dp:number, npm:number)=>
    0.25*valuation(pe, pb) + 0.35*financial(de,sol,curr) + 0.2*netProfitMargin(npm) + 0.2*cash(fcf,dy,dp);

export async function getAllStocks(pageNum:number, pageSize:number):Promise<GetRequest<Stock>>{

    try{
        const response = await fetch(API_URL+"/stocks?pageNum="+pageNum+"&pageSize="+pageSize, {
            method:"GET"
        });

        if(!response.ok){
            throw new Error("Se ha producido un error al obtener todas las acciones");
        }
        return await response.json();
    }catch(error){
        throw error;
    }
}

export async function getStockByIdService(id:string):Promise<GetStockById>{

    try{

        const response = await fetchWithAuth(API_URL+"/stock/"+id, {
            method:"GET"
        });

        if(!response.ok) throw new Error("Se ha producido un error al obtener la acción con id: " + id);
        return await response.json();
    }catch(error){
        throw error;
    }

} 

export async function createStock(infoStock:upsertStockBody): Promise<Stock>{

    try{

        const response = await fetchWithAuth(API_URL+"/stock/create",{
            method:"POST",
            body: JSON.stringify(infoStock)
        });

        if(response.status!==201){
            throw new Error("Se ha producido un error al crear una nueva acción");
        }

        return await response.json();
    }catch(error){
        throw error;
    }
}

export async function updateStock(id:string, infoStock:upsertStockBody):Promise<Stock>{
    try{

        const response = await fetchWithAuth(API_URL+"/stock/edit/"+id,{
            method:"PUT",
            body:JSON.stringify(infoStock)
        });

        if(!response.ok){
            throw new Error("Se ha producido un error al actualizar la acción");
        }

        return await response.json();
    }catch(error){
        throw error;
    }
}

export async function deleteStock(id:string): Promise<void>{
    try{

        const response = await fetchWithAuth(API_URL+"/stock/delete/"+id,{
            method:"DELETE"});

        if(!response.ok){
            throw new Error("Se ha producido un error al eliminar la acción");
        }
    }catch(error){
        throw error;
    }
}
