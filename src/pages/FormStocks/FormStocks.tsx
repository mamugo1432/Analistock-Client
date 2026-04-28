import { useForm } from "react-hook-form";
import type { GetStockById, Stock, upsertStockBody } from "../../types/stocksTypes";
import "./FormStocks.css"
import { useEffect, useState } from "react";
import { useStock } from "../../contexts/StocksContent";
import { useNavigate, useParams } from "react-router-dom";
import { getStockByIdService, riskScore } from "../../services/stocks-service";
export default function FormStocks({mode}:{mode:string}){
    const {register,handleSubmit, setError, reset, formState : {errors, isSubmitting }} = useForm<upsertStockBody>({mode:"onTouched"});
    const [stock, setStock] = useState<GetStockById>({
        peRatio:0, pbRatio:0, netProfitMargin:0, debtEquity:0, freeCashFlow:0, solvencyRatio:0,
        currentRatio:0, dividendYield:0, dividendPayoutRatio:0, date:"", financialYear:0, sector:"",
        companyName:"", ticket:"", idStock:0, riskScore:0
      });
    const [loading, setLoading] = useState<boolean>(mode!="create");
    const {postStock, putStock, delStock} = useStock();
    const {id} = useParams();
    const navigate = useNavigate(); 
      
    if (!id && mode!= "create"){
        alert("Se ha producido un error");
        navigate("/stocks");
    } 

    if(mode != "create"){
                useEffect(()=>{
                    geStockById(id!);
             });
            } else{
                useEffect(() =>{
                    setLoading(false);
                })
            }

        async function geStockById(id:string){
            try{
               const  stock = await getStockByIdService(id);
                if(stock) setStock(stock);
                setLoading(false);
            }catch(error){
                console.error(error);
            }
          }

            async function submit(info:upsertStockBody){
                    try{
            
                        if(mode=="create"){
                          
                          info.riskScore = riskScore(info.peRatio, info.pbRatio, info.debtEquity,
                            info.solvencyRatio, info.currentRatio, info.freeCashFlow, info.dividendYield, 
                            info.dividendPayoutRatio, info.netProfitMargin
                           );

                            postStock(info);
                            reset();
                            navigate("/stocks");
                        }
            
                        else if(mode == "edit"){
                          
                          info.riskScore = riskScore(info.peRatio, info.pbRatio, info.debtEquity,
                            info.solvencyRatio, info.currentRatio, info.freeCashFlow, info.dividendYield, 
                            info.dividendPayoutRatio, info.netProfitMargin
                           );
                           
                            putStock(id!, info);
                            reset();
                            navigate("/stocks");
                        }
            
                        else{
                            delStock(id!);
                            navigate("/stocks");
                        }
                    }catch(error){
                        console.error(error);
                    }
                  }


     if (loading) return <div className="loading-screen">Cargando...</div>
     return(
        <>

        <div className="d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-10 col-lg-8 d-flex justify-content-center align-items-center m-2">
            <div className="form-card">
                  <h2 id="subtitle" className="mb-4 text-center homenaje-regular">
      {mode == "create" ? "Crear acción" : mode=="edit" ? "Editar acción" : "Eliminar acción"}
    </h2>
              
              <form onSubmit={handleSubmit(submit)}>
                {/* Company Information */}
                <div className="section-header">Company Information</div>
                
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10">
                    <div className="mb-3">
                      <label><i><strong>Company Name</strong></i></label>
                      <input 
                        type="text"
                                  disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? stock.companyName : ""} 
                        className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
                        {...register("companyName",{
                          required: "El nombre de la compañía es obligatorio"
                        })}
                      />
                    {errors.companyName && (
          <div className="invalid-feedback">{errors.companyName.message}</div>
        )}
                    </div>
                  </div>
                </div>
 
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-6 col-lg-5">
                    <div className="mb-3">
                      <label><i><strong>Ticket Symbol</strong></i></label>
                     <input 
                        type="text"
                        disabled={mode=="delete"} 
                        defaultValue={mode=="edit" || mode=="delete" ? stock.ticket : ""} 
                        className={`form-control ${errors.ticket ? "is-invalid" : ""}`}
                        {...register("ticket", {
                          required: "El ticket de la empresa es obligatorio"
                        })}
                      />
                       {errors.ticket && (
          <div className="invalid-feedback">{errors.ticket.message}</div>
        )}
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-5">
                    <div className="mb-3">
                       <label><i><strong>Sector</strong></i></label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.sector ? "is-invalid" : ""}`}
                                  disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? stock.sector : ""}
                        {...register("sector", {
                          required: "El sector de la empresa es obligatorio"
                        })}
                      />
                       {errors.sector && (
          <div className="invalid-feedback">{errors.sector.message}</div>
        )}
                    </div>
                  </div>
                </div>
 
                {/* Financial Ratios */}
                <div className="section-header">Financial Ratios</div>
                
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-6 col-lg-5">
                    <div className="mb-3">
                      <label><i><strong>P/E Ratio</strong></i></label>
                      <input 
                        type="number" 
                        className={`form-control ${errors.peRatio ? "is-invalid" : ""}`}
                                  disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? stock.peRatio : ""}
                        step={0.0000000001}
                        {...register("peRatio", {
                          required:"El P/E Ratio es obligatorio",
                          valueAsNumber:true
                        })}
                      />
                      {errors.peRatio && (
          <div className="invalid-feedback">{errors.peRatio.message}</div>
        )}
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-5">
                    <div className="mb-3">
                      <label><i><strong>P/B Ratio</strong></i></label>
                      <input 
                        type="number" 
                        className={`form-control ${errors.pbRatio ? "is-invalid" : ""}`}
                                  disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? stock.pbRatio : ""}
                        step={0.0000000001}
                        {...register("pbRatio", {
                          required:"El P/B Ratio es obligatorio",
                          valueAsNumber:true
                        })}
                      />
                      {errors.pbRatio && (
          <div className="invalid-feedback">{errors.pbRatio.message}</div>
        )}
                    </div>
                  </div>
                </div>
 
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-6 col-lg-5">
                    <div className="mb-3">
                      <label><i><strong>Net Profit Margin</strong></i></label>
                      <input 
                        type="number" 
                        className={`form-control ${errors.netProfitMargin ? "is-invalid" : ""}`}
                                  disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? stock.netProfitMargin : ""}
                        step={0.0000000001}
                        {...register("netProfitMargin", {
                          required:"El Net Profit Margin es obligatorio",
                          valueAsNumber:true
                        })}
                      />
                      {errors.netProfitMargin && (
          <div className="invalid-feedback">{errors.netProfitMargin.message}</div>
        )}
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-5">
                    <div className="mb-3">
                      <label><i><strong>Debt To Equity</strong></i></label>
                      <input 
                        type="number" 
                        className={`form-control ${errors.debtEquity ? "is-invalid" : ""}`}
                                  disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? stock.debtEquity : ""}
                        step={0.0000000001}
                        {...register("debtEquity", {
                          required:"El Debt To Equity es obligatorio",
                          valueAsNumber:true
                        })}
                      />
                      {errors.debtEquity && (
          <div className="invalid-feedback">{errors.debtEquity.message}</div>
        )}
                    </div>
                  </div>
                </div>
 
                {/* Cash Flow & Liquidity */}
                <div className="section-header">Cash Flow & Liquidity</div>
                
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-6 col-lg-5">
                    <div className="mb-3">
                       <label><i><strong>Free Cash Flow Per Share</strong></i></label>
                      <input 
                        type="number" 
                        className={`form-control ${errors.freeCashFlow ? "is-invalid" : ""}`}
                                  disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? stock.freeCashFlow : ""}
                        step={0.0000000001}
                        {...register("freeCashFlow", {
                          required:"El Free Cash Flow Per Share es obligatorio",
                          valueAsNumber:true
                        })}
                      />
                        {errors.freeCashFlow && (
          <div className="invalid-feedback">{errors.freeCashFlow.message}</div>
        )}
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-5">
                    <div className="mb-3">
                      <label><i><strong>Solvency Ratio</strong></i></label>
                      <input 
                        type="number" 
                        className={`form-control ${errors.solvencyRatio ? "is-invalid" : ""}`}
                                  disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? stock.solvencyRatio : ""}
                        step={0.0000000001}
                        {...register("solvencyRatio", {
                          required:"El Solvency Ratio es obligatorio",
                          valueAsNumber:true
                        })}
                      />
                    {errors.solvencyRatio && (
          <div className="invalid-feedback">{errors.solvencyRatio.message}</div>
        )}
                    </div>
                  </div>
                </div>
 
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-6 col-lg-5">
                    <div className="mb-3">
                      <label><i><strong>Current Ratio</strong></i></label>
                      <input 
                        type="number" 
                        className={`form-control ${errors.currentRatio ? "is-invalid" : ""}`}
                                  disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? stock.currentRatio : ""}
                        step={0.0000000001}
                        {...register("currentRatio", {
                          required:"El Current Ratio es obligatorio",
                          valueAsNumber:true
                        })}
                      />
                                          {errors.currentRatio && (
          <div className="invalid-feedback">{errors.currentRatio.message}</div>
        )}
                    </div>
                  </div>
                </div>
 
                {/* Dividend Information */}
                <div className="section-header">Dividend Information</div>
                
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-6 col-lg-5">
                    <div className="mb-3">
                      <label><i><strong>Dividend Yield</strong></i></label>
                      <input 
                        type="number" 
                        className={`form-control ${errors.dividendYield ? "is-invalid" : ""}`}
                        step={0.0000000001}
                                  disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? stock.dividendYield : ""}
                        {...register("dividendYield", {
                          required:"El Dividend Yield es obligatorio",
                          valueAsNumber:true
                        })}
                      />
                       {errors.dividendYield && (
          <div className="invalid-feedback">{errors.dividendYield.message}</div>
        )}
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-5">
                    <div className="mb-3">
                      <label><i><strong>Dividend Payout Ratio</strong></i></label>
                      <input 
                        type="number" 
                        className={`form-control ${errors.dividendPayoutRatio ? "is-invalid" : ""}`}
                                  disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? stock.dividendPayoutRatio : ""}
                         step={0.0000000001}
                        {...register("dividendPayoutRatio", {
                          required:"El Dividend Payout Ratio es obligatorio",
                          valueAsNumber:true
                        })}
                      />
                      {errors.dividendPayoutRatio && (
          <div className="invalid-feedback">{errors.dividendPayoutRatio.message}</div>
        )}
                    </div>
                  </div>
                </div>
 
                {/* Period Information */}
                <div className="section-header">Period Information</div>
                
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-6 col-lg-5">
                    <div className="mb-3">
                      <label><i><strong>Date</strong></i></label>
                      <input 
                        type="date" 
                        className={`form-control ${errors.date ? "is-invalid" : ""}`}
          disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? stock.date : ""}
            {...register("date", {
            required:{ value : mode!="delete", message: "El fecha es obligatoria"},
    validate: (value) => {
      const today = new Date();
      const selectedDate = new Date(value);

      // quitar horas para comparar solo fechas
      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      return selectedDate <= today || "La fecha no puede ser futura";
    }
          })}  
                      />
                                     {errors.date && (
          <div className="invalid-feedback">{errors.date.message}</div>
        )}
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-5">
                    <div className="mb-3">
                    <label><i><strong>Financial Year</strong></i></label>
                      <input 
                        type="number" 
                        className={`form-control ${errors.financialYear ? "is-invalid" : ""}`}
                                  disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? stock.financialYear : ""}
                        {...register("financialYear", {
                          required:"El Financial Year es obligatorio",
                          valueAsNumber:true
                        })}
                      />
                    </div>
                  </div>
                </div>
 
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10">
                      <button disabled={isSubmitting} className={mode == "create" ? "btn btn-primary w-100" : mode=="edit" ? "btn btn-warning w-100" : "btn btn-danger w-100"}>
          {isSubmitting ? "Cargando..." : (mode == "create" ? "Crear" : mode=="edit" ? "Editar" : "Eliminar")}
        </button>
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        </>
    )
}