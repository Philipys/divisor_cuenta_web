import { describe, it, expect } from 'vitest';
import { casos } from './casosDePrueba.js';
import { Cuenta } from '../src/domain/cuenta.js';
import { calcularDivision } from '../src/domain/calcularDivision.js';
import { validarEntrada } from '../src/domain/validarEntrada.js';
import { redondeoExacto } from '../src/data/redondeoExacto.js';
import { redondeoHaciaArriba } from '../src/data/redondeoHaciaArriba.js';

describe('Criterios de Aceptación de la Especificación', () => {
  const mapaEstrategias = {
    exacto: redondeoExacto,
    arriba: redondeoHaciaArriba,
  };

  casos.forEach((caso) => {
    it(caso.nombre, () => {
      const error = validarEntrada({
        monto: caso.monto,
        personas: caso.personas,
      });

      if (caso.errorEsperado) {
        expect(error).toBe(caso.errorEsperado);
      } else {
        expect(error).toBeNull();
        const cuenta = new Cuenta({
          monto: caso.monto,
          personas: caso.personas,
          propina: caso.propina,
        });
        const estrategia = mapaEstrategias[caso.modo];
        const resultado = calcularDivision(cuenta, estrategia);
        expect(resultado.montoPorPersona).toBeCloseTo(caso.esperado, 2);
      }
    });
  });

  it('Demostración de LSP: calcularDivision sustituye estrategias sin comprobaciones de tipo', () => {
    const cuenta = new Cuenta({ monto: 10.0, personas: 3, propina: 0 });

    const resultadoExacto = calcularDivision(cuenta, redondeoExacto);
    expect(resultadoExacto.montoPorPersona).toBeCloseTo(3.33, 2);

    const resultadoArriba = calcularDivision(cuenta, redondeoHaciaArriba);
    expect(resultadoArriba.montoPorPersona).toBeCloseTo(4.0, 2);
  });
});
