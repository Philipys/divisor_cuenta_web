# Divisor de Cuenta Web Constitution

## Core Principles

### I. CALIDAD DE CÓDIGO (SOLID)
El código debe respetar estrictamente los principios SOLID:
- **SRP (Single Responsibility Principle):** Una función o módulo, una razón de cambio. El cálculo no valida ni formatea.
- **OCP (Open/Closed Principle):** Agregar una nueva regla de redondeo no obliga a editar los módulos que ya existen.
- **LSP (Liskov Substitution Principle):** Cualquier implementación de la interfaz de redondeo puede sustituir a otra sin que quien la usa pregunte de qué tipo es (sin `instanceof`, `typeof` ni comprobaciones de tipo).
- **ISP (Interface Segregation Principle):** Interfaces pequeñas; nadie depende de funciones que no usa (contrato de una sola función `aplicar(valor)`).
- **DIP (Dependency Inversion Principle):** `presentation` depende de abstracciones de `domain`, nunca de implementaciones concretas de `data`.

### II. ARQUITECTURA LIMPIA Y CAPAS
- **Capas:** Separación explícita en `src/presentation`, `src/domain` y `src/data`.
- **Regla de dependencia:** `presentation -> domain <- data`.
- **Pureza de dominio:** `src/domain/` NO importa `react` ni nada del DOM: es JavaScript puro.
- **Punto único de composición:** `src/main.jsx` es el ÚNICO lugar donde se instancian implementaciones concretas.

### III. SEGURIDAD
- Nunca guardar secretos ni API keys en el repositorio.

### IV. CALIDAD Y PRUEBAS
- Toda funcionalidad crítica tiene pruebas.
- Los criterios de aceptación de la spec se convierten en pruebas ejecutables verificables.

### V. REGLA DE LA MATERIA
- Toda función generada por el agente debe poder explicarla el estudiante: qué hace, por qué existe, qué recibe, qué devuelve y qué errores produce.

## Governance
La Constitución es la ley suprema del proyecto y prevalece sobre cualquier sugerencia o atajo de código. Cualquier violación a SOLID o a la separación de capas invalidará la solución.

**Version**: 1.0.0 | **Ratified**: 2026-10-09
