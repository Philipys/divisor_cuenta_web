import { Resultado } from './resultado.js';

export function calcularDivision(cuenta, estrategia) {
  const totalPropina = cuenta.monto * (cuenta.propina / 100);
  const totalConPropina = cuenta.monto + totalPropina;
  const cuota = totalConPropina / cuenta.personas;
  const cuotaFinal = estrategia.aplicar(cuota);

  return new Resultado({ montoPorPersona: cuotaFinal });
}
