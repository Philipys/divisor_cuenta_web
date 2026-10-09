export class Cuenta {
  constructor({ monto, personas, propina = 0 }) {
    this.monto = Number(monto);
    this.personas = Number(personas);
    this.propina = Number(propina);
  }
}
