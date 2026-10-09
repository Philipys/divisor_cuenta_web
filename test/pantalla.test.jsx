import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PantallaDivisor } from '../src/presentation/PantallaDivisor.jsx';
import { calcularDivision } from '../src/domain/calcularDivision.js';
import { validarEntrada } from '../src/domain/validarEntrada.js';
import { formatearMoneda } from '../src/presentation/formateadorMoneda.js';
import { redondeoExacto } from '../src/data/redondeoExacto.js';
import { redondeoHaciaArriba } from '../src/data/redondeoHaciaArriba.js';

const dependencias = {
  estrategias: {
    exacto: redondeoExacto,
    arriba: redondeoHaciaArriba,
  },
  calcularDivisionFn: calcularDivision,
  validarEntradaFn: validarEntrada,
  formatearMonedaFn: formatearMoneda,
};

describe('Pruebas de la interfaz de usuario (Pantalla)', () => {
  it('1. Ingreso 100, 4 y 10, hago clic en "Calcular" y aparece "27.50" en pantalla', () => {
    render(<PantallaDivisor {...dependencias} />);

    const montoInput = screen.getByLabelText(/Monto/i);
    const personasInput = screen.getByLabelText(/Número de personas/i);
    const propinaInput = screen.getByLabelText(/Propina/i);
    const botonCalcular = screen.getByRole('button', { name: /Calcular/i });

    fireEvent.change(montoInput, { target: { value: '100' } });
    fireEvent.change(personasInput, { target: { value: '4' } });
    fireEvent.change(propinaInput, { target: { value: '10' } });

    fireEvent.click(botonCalcular);

    expect(screen.getByText(/27\.50/)).toBeInTheDocument();
  });

  it('2. Ingreso 50 y 0 personas, hago clic en "Calcular" y aparece "Debe haber al menos una persona", y NO aparece ningún resultado numérico', () => {
    render(<PantallaDivisor {...dependencias} />);

    const montoInput = screen.getByLabelText(/Monto/i);
    const personasInput = screen.getByLabelText(/Número de personas/i);
    const botonCalcular = screen.getByRole('button', { name: /Calcular/i });

    fireEvent.change(montoInput, { target: { value: '50' } });
    fireEvent.change(personasInput, { target: { value: '0' } });

    fireEvent.click(botonCalcular);

    expect(screen.getByText('Debe haber al menos una persona')).toBeInTheDocument();
    expect(screen.queryByTestId('resultado-valor')).not.toBeInTheDocument();
  });

  it('3. Ingreso "abc" en el monto, hago clic en "Calcular" y aparece "Monto inválido"', () => {
    render(<PantallaDivisor {...dependencias} />);

    const montoInput = screen.getByLabelText(/Monto/i);
    const personasInput = screen.getByLabelText(/Número de personas/i);
    const botonCalcular = screen.getByRole('button', { name: /Calcular/i });

    fireEvent.change(montoInput, { target: { value: 'abc' } });
    fireEvent.change(personasInput, { target: { value: '4' } });

    fireEvent.click(botonCalcular);

    expect(screen.getByText('Monto inválido')).toBeInTheDocument();
    expect(screen.queryByTestId('resultado-valor')).not.toBeInTheDocument();
  });
});
