export function formatearMoneda(valor) {
  if (typeof valor !== 'number' || Number.isNaN(valor)) {
    return '';
  }
  return valor.toFixed(2);
}
