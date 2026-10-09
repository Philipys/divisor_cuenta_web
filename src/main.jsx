import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Instanciación y composición de dependencias concretas (DIP)
import { redondeoExacto } from './data/redondeoExacto.js'
import { redondeoHaciaArriba } from './data/redondeoHaciaArriba.js'
import { calcularDivision } from './domain/calcularDivision.js'
import { validarEntrada } from './domain/validarEntrada.js'
import { formatearMoneda } from './presentation/formateadorMoneda.js'
import { PantallaDivisor } from './presentation/PantallaDivisor.jsx'

const estrategias = {
  exacto: redondeoExacto,
  arriba: redondeoHaciaArriba,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PantallaDivisor
      estrategias={estrategias}
      calcularDivisionFn={calcularDivision}
      validarEntradaFn={validarEntrada}
      formatearMonedaFn={formatearMoneda}
    />
  </StrictMode>,
)
