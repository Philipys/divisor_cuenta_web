import React from 'react';
import { useDivisor } from './useDivisor.js';

export function PantallaDivisor({
  divisor,
  estrategias,
  calcularDivisionFn,
  validarEntradaFn,
  formatearMonedaFn,
}) {
  const localDivisor = useDivisor({
    estrategias,
    calcularDivisionFn,
    validarEntradaFn,
    formatearMonedaFn,
  });

  const state = divisor || localDivisor;

  return (
    <div className="divisor-container">
      <header className="divisor-header">
        <h1>Divisor de Cuenta</h1>
        <p className="subtitulo">Calcula la cuota por persona de forma rápida y exacta</p>
      </header>

      <main className="divisor-card">
        <form
          className="divisor-form"
          onSubmit={(e) => {
            e.preventDefault();
            state.calcular();
          }}
        >
          <div className="form-group">
            <label htmlFor="monto">Monto ($)</label>
            <input
              id="monto"
              type="text"
              inputMode="decimal"
              placeholder="Ej. 100.00"
              value={state.monto}
              onChange={(e) => state.setMonto(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="personas">Número de personas</label>
            <input
              id="personas"
              type="text"
              inputMode="numeric"
              placeholder="Ej. 4"
              value={state.personas}
              onChange={(e) => state.setPersonas(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="propina">Propina (%)</label>
            <input
              id="propina"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={state.propina}
              onChange={(e) => state.setPropina(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Estrategia de redondeo</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="modoRedondeo"
                  value="exacto"
                  checked={state.modo === 'exacto'}
                  onChange={() => state.setModo('exacto')}
                />
                Exacto
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="modoRedondeo"
                  value="arriba"
                  checked={state.modo === 'arriba'}
                  onChange={() => state.setModo('arriba')}
                />
                Hacia arriba
              </label>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="btn-primary">
              Calcular
            </button>
            <button type="button" className="btn-secondary" onClick={state.limpiar}>
              Limpiar
            </button>
          </div>
        </form>

        {state.error && (
          <div className="mensaje-error" role="alert">
            {state.error}
          </div>
        )}

        {!state.error && state.resultado !== null && (
          <div className="resultado-card" aria-live="polite">
            <span className="resultado-label">Total a pagar por persona:</span>
            <span className="resultado-valor" data-testid="resultado-valor">
              ${state.resultado}
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
