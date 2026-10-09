/**
 * Contrato de Estrategia de Redondeo (ISP).
 * Cualquier estrategia debe implementar la función:
 * aplicar(valor: number): number
 */
export const EstrategiaRedondeo = {
  aplicar(valor) {
    return valor;
  },
};
