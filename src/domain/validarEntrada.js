export function validarEntrada({ monto, personas }) {
  const montoNum = typeof monto === 'string' ? Number(monto.trim()) : Number(monto);
  if (Number.isNaN(montoNum) || !Number.isFinite(montoNum) || montoNum <= 0) {
    return 'Monto inválido';
  }

  const personasNum = typeof personas === 'string' ? Number(personas.trim()) : Number(personas);
  if (Number.isNaN(personasNum) || !Number.isInteger(personasNum) || personasNum <= 0) {
    return 'Debe haber al menos una persona';
  }

  return null;
}
