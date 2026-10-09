# Implementation Tasks: Divisor de Cuenta Web (React + Vite)

**Feature**: `001-divisor-cuenta`  
**Status**: Ready for Implementation  

## Tareas de Implementación

- [ ] **T001**: Crear entidades de dominio en `src/domain/cuenta.js` y `src/domain/resultado.js`.
- [ ] **T002**: Definir contrato de interfaz de estrategia de redondeo en `src/domain/estrategiaRedondeo.js`.
- [ ] **T003**: Implementar función pura de validación en `src/domain/validarEntrada.js` (reglas: error "Debe haber al menos una persona", "Monto inválido", propina por defecto 0%).
- [ ] **T004**: Implementar función pura de cálculo en `src/domain/calcularDivision.js` (aplica monto + propina / personas, delega a estrategia.aplicar sin if ni type checks).
- [ ] **T005**: Implementar estrategias de redondeo en `src/data/redondeoExacto.js` y `src/data/redondeoHaciaArriba.js`.
- [ ] **T006**: Implementar formateador monetario en `src/presentation/formateadorMoneda.js` (estricto a 2 decimales).
- [ ] **T007**: Implementar hook `src/presentation/useDivisor.js` recibiendo dependencias inyectadas y administrando estado con `useState`.
- [ ] **T008**: Implementar vista en `src/presentation/PantallaDivisor.jsx` con formulario accesible y controles interactivos.
- [ ] **T009**: Configurar punto único de composición en `src/main.jsx` instanciando estrategias de redondeo e inyectándolas a la aplicación.
- [ ] **T010**: Configurar Vitest (`vite.config.js`, `test/setup.js`, `package.json`), traducir `test/casosDePrueba.js`, e implementar suites de pruebas `test/division.test.js` y `test/pantalla.test.jsx`.
