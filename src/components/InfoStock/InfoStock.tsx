import { useState } from "react";

export default function InfoWarning() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="alert alert-warning d-flex justify-content-between align-items-start">
      <span>
        El <strong>indicador de riesgo</strong> se calcula utilizando indicadores financieros correspondientes a una fecha específica. No incorpora datos históricos ni tendencias, por lo que representa únicamente la situación de la empresa en ese momento.
      </span>

      <button
        className="btn-close ms-3"
        onClick={() => setVisible(false)}
        aria-label="Cerrar"
      ></button>
    </div>
  );
}