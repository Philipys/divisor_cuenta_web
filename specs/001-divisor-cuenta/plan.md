# Implementation Plan: Divisor de Cuenta Web (React + Vite)

**Feature Branch**: `001-divisor-cuenta`  
**Created**: 2026-10-09  
**Status**: Approved & Aligned with Constitution  

## Resumen Técnico y Arquitectura
Reimplementación completa del Divisor de Cuenta para la web utilizando React y Vite en JavaScript estándar, manteniendo 100% intacta la especificación funcional y las reglas de negocio. Se adopta una arquitectura limpia en 3 capas desacopladas, asegurando los 5 principios SOLID y pureza de dominio.

### Stack Tecnológico
- **Entorno / Bundler:** Vite con React (JavaScript ES Modules).
- **Manejo de Estado:** Estado local con el hook `useState` de React (pantalla única, sin dependencias externas como Redux o Zustand).
- **Pruebas:** Vitest con `@testing-library/react`, `@testing-library/jest-dom` y `jsdom`.

### Estructura de Capas y Responsabilidades
```text
src/
├── domain/                  (JavaScript puro, sin dependencias de React ni DOM)
│   ├── cuenta.js            (Entidad de datos de la cuenta)
│   ├── resultado.js         (Entidad/objeto de resultado del reparto)
│   ├── estrategiaRedondeo.js (Contrato de interfaz: función aplicar(valor))
│   ├── calcularDivision.js  (SRP: Cálculo matemático puro del reparto por persona)
│   └── validarEntrada.js    (SRP: Validación estricta de datos de entrada)
├── data/                    (Implementaciones concretas de estrategias de redondeo)
│   ├── redondeoExacto.js    (Estrategia concreta: redondeo exacto)
│   └── redondeoHaciaArriba.js (Estrategia concreta: redondeo hacia arriba al entero más cercano)
├── presentation/            (Interfaz de usuario y hooks desacoplados)
│   ├── useDivisor.js        (DIP: Custom hook que recibe sus dependencias por inyección)
│   ├── formateadorMoneda.js (SRP: Formateo estricto a 2 decimales para visualización)
│   └── PantallaDivisor.jsx  (Componente visual de React: renderizado de formulario y resultados)
└── main.jsx                 (DIP: Único punto de composición e inyección de dependencias)
```

## Cumplimiento de Principios SOLID
1. **SRP (Single Responsibility):**
   - `validarEntrada.js` únicamente valida las entradas y produce errores específicos.
   - `calcularDivision.js` únicamente realiza las operaciones aritméticas y aplica la estrategia recibida. No valida ni formatea cadenas.
   - `formateadorMoneda.js` únicamente da formato a dos decimales (`toFixed(2)`).
   - `PantallaDivisor.jsx` solo se encarga de la vista.
2. **OCP (Open/Closed):**
   - Nuevas estrategias de redondeo pueden agregarse en `src/data/` sin alterar el código existente en `calcularDivision.js`.
3. **LSP (Liskov Substitution):**
   - `calcularDivision` invoca `estrategia.aplicar(valor)` sin verificar tipos, nombres de clases ni operadores `instanceof`/`typeof`. Tanto `redondeoExacto` como `redondeoHaciaArriba` son sustituibles de forma transparente.
4. **ISP (Interface Segregation):**
   - La abstracción de estrategia expone una única función `aplicar(valor)`.
5. **DIP (Dependency Inversion):**
   - La capa `presentation` y el hook `useDivisor` interactúan con las abstracciones del dominio (`calcularDivision`, `validarEntrada`). Las instancias concretas de redondeo se inyectan exclusivamente desde `main.jsx`.
