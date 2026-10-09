import { useState } from 'react';
import { Cuenta } from '../domain/cuenta.js';

export function useDivisor({
  estrategias,
  calcularDivisionFn,
  validarEntradaFn,
  formatearMonedaFn,
}) {
  const [monto, setMonto] = useState('');
  const [personas, setPersonas] = useState('');
  const [propina, setPropina] = useState('0');
  const [modo, setModo] = useState('exacto');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const calcular = () => {
    const propinaValor = propina === '' ? 0 : Number(propina);
    const errorValidacion = validarEntradaFn({
      monto,
      personas,
    });

    if (errorValidacion) {
      setError(errorValidacion);
      setResultado(null);
      return;
    }

    const cuenta = new Cuenta({
      monto,
      personas,
      propina: propinaValor,
    });

    const estrategia = estrategias[modo];
    const res = calcularDivisionFn(cuenta, estrategia);

    setError(null);
    setResultado(formatearMonedaFn(res.montoPorPersona));
  };

  const limpiar = () => {
    setMonto('');
    setPersonas('');
    setPropina('0');
    setModo('exacto');
    setResultado(null);
    setError(null);
  };

  return {
    monto,
    setMonto,
    personas,
    setPersonas,
    propina,
    setPropina,
    modo,
    setModo,
    resultado,
    error,
    calcular,
    limpiar,
  };
}
